"""Business logic layer (Service Layer) - implements CQRS pattern."""
import json
from uuid import UUID
from typing import Optional, List, Dict
from sqlalchemy.orm import Session
from app.core.repositories import (
    UserRepository,
    RitualRepository,
    RitualResponseRepository,
    PersonaRepository,
    ChatHistoryRepository,
    QuestRepository,
    UserQuestRepository,
)
from app.utils.queue_manager import QueueManager
from app.config import get_settings

settings = get_settings()


class AuthService:
    """Service for authentication operations."""

    def __init__(self, db: Session):
        self.user_repo = UserRepository(db)

    def get_or_create_user(self, google_id: str, email: str, display_name: str = None, profile_image_url: str = None):
        """Get existing user or create new one (idempotent)."""
        user = self.user_repo.get_by_google_id(google_id)
        if not user:
            user = self.user_repo.create(google_id, email, display_name, profile_image_url)
        return user


class RitualService:
    """Service for ritual (survey) operations."""

    def __init__(self, db: Session):
        self.ritual_repo = RitualRepository(db)
        self.response_repo = RitualResponseRepository(db)

    def create_ritual(self, user_id: UUID) -> dict:
        """Create a new ritual for a user. (Command - CQRS)"""
        ritual = self.ritual_repo.create(user_id)
        return {
            "ritualId": str(ritual.id),
            "invitationUrl": f"https://remirai.app/ritual/{ritual.id}",
        }

    def get_ritual_status(self, user_id: UUID) -> Optional[dict]:
        """Get the status of user's current ritual. (Query - CQRS)"""
        ritual = self.ritual_repo.get_by_user_id(user_id)
        if not ritual:
            return None
        
        responses_count = self.response_repo.count_by_ritual_id(ritual.id)
        minimum_responses = 3
        
        return {
            "ritualId": str(ritual.id),
            "invitationUrl": f"https://remirai.app/ritual/{ritual.id}",
            "responsesCount": responses_count,
            "minimumResponses": minimum_responses,
            "isSummonable": responses_count >= minimum_responses,
        }

    def get_ritual_questions(self, ritual_id: UUID) -> Optional[dict]:
        """Retrieve ritual questions. (Query - CQRS)"""
        ritual = self.ritual_repo.get_by_id(ritual_id)
        if not ritual:
            return None

        questions = [
            {
                "id": "q1", 
                "text": "What's the first thing that comes to mind when you think of them?", 
                "type": "pick-a-card", 
                "options": [
                    {"id": "card1", "text": "Warmth and comfort", "imageUrl": "/cards/warmth.jpg"},
                    {"id": "card2", "text": "Energy and excitement", "imageUrl": "/cards/energy.jpg"},
                    {"id": "card3", "text": "Mystery and depth", "imageUrl": "/cards/mystery.jpg"},
                ]
            },
            {
                "id": "q2", 
                "text": "How do they show they care?", 
                "type": "pick-a-card", 
                "options": [
                    {"id": "card1", "text": "Acts of service", "imageUrl": "/cards/service.jpg"},
                    {"id": "card2", "text": "Quality time", "imageUrl": "/cards/time.jpg"},
                    {"id": "card3", "text": "Words of affirmation", "imageUrl": "/cards/words.jpg"},
                ]
            },
            {
                "id": "q3", 
                "text": "What's their hidden strength?", 
                "type": "pick-a-card", 
                "options": [
                    {"id": "card1", "text": "Unshakeable loyalty", "imageUrl": "/cards/loyalty.jpg"},
                    {"id": "card2", "text": "Creative problem-solving", "imageUrl": "/cards/creativity.jpg"},
                    {"id": "card3", "text": "Emotional intelligence", "imageUrl": "/cards/empathy.jpg"},
                ]
            },
        ]

        return {
            "ritualId": str(ritual.id),
            "creatorName": ritual.user.display_name or "Anonymous",
            "questions": questions,
        }

    def submit_response(self, ritual_id: UUID, responder_id: str, answers: dict) -> dict:
        """Submit a ritual response. (Command - CQRS)"""
        response = self.response_repo.create(ritual_id, responder_id, answers)
        return {
            "message": "Your perception has been sent to the vessel.",
            "resultUrl": f"https://remirai.app/ritual/{ritual_id}/result"
        }

    def practice_summon(self, user_id: UUID, answers: dict) -> dict:
        """Create a practice persona based on self-perception. (Command - CQRS)"""
        # This creates a low-rarity "proto-persona" for practice
        from app.utils.persona_generator import PersonaGenerator
        
        generator = PersonaGenerator()
        practice_persona = generator.generate_practice_persona(answers)
        
        return {
            "id": "practice",
            "name": practice_persona["name"],
            "status": "practice", 
            "archetype": practice_persona["archetype"],
            "rarity": "N",
            "title": practice_persona["title"],
            "illustrationUrl": practice_persona["illustration_url"],
            "stats": practice_persona["stats"],
            "bondLevel": 1,
            "bondProgress": 0.0
        }

    def get_response_count(self, ritual_id: UUID) -> int:
        """Get the number of responses for a ritual. (Query - CQRS)"""
        return self.response_repo.count_by_ritual_id(ritual_id)


class PersonaService:
    """Service for persona operations - implements asynchronous processing via Saga pattern."""

    def __init__(self, db: Session):
        self.persona_repo = PersonaRepository(db)
        self.ritual_repo = RitualRepository(db)
        self.response_repo = RitualResponseRepository(db)
        self.chat_repo = ChatHistoryRepository(db)
        self.queue_manager = QueueManager()

    def summon_persona(self, user_id: UUID, mode: str, archetype_filter: Optional[str] = None) -> dict:
        """Begin persona summoning process. (Command - CQRS)"""
        persona = self.persona_repo.get_by_user_id(user_id)
        
        if not persona:
            persona = self.persona_repo.create(user_id)
        
        # Check if there are enough ritual responses
        ritual = self.ritual_repo.get_by_user_id(user_id)
        if not ritual:
            raise Exception("No ritual found for user")
            
        response_count = self.response_repo.count_by_ritual_id(ritual.id)
        if response_count < 3:
            raise Exception("Not enough responses to summon persona")
        
        # Trigger persona synthesis (Saga Pattern - Step 1)
        self.queue_manager.send_message(
            settings.persona_generation_queue_name,
            {
                "persona_id": str(persona.id), 
                "user_id": str(user_id), 
                "ritual_id": str(ritual.id),
                "mode": mode,
                "archetype_filter": archetype_filter
            },
        )
        
        persona.status = "summoning"
        self.persona_repo.db.commit()
        
        return {
            "status": "summoning_initiated",
            "message": "The summoning has begun. Check status periodically."
        }

    def get_persona(self, user_id: UUID) -> dict:
        """Get existing persona status. (Query - CQRS)"""
        persona = self.persona_repo.get_by_user_id(user_id)
        
        if not persona:
            return {"status": "not_found"}
            
        if persona.status == "summoning":
            return {"status": "summoning"}
            
        if persona.status == "ready":
            return {
                "id": str(persona.id),
                "name": persona.name,
                "status": "ready",
                "archetype": persona.archetype,
                "rarity": persona.rarity,
                "title": persona.title,
                "illustrationUrl": persona.illustration_url,
                "stats": persona.stats,
                "bondLevel": persona.bond_level,
                "bondProgress": persona.bond_progress
            }
            
        return {"status": persona.status}

    def chat(self, user_id: UUID, message: str) -> Optional[str]:
        """Send a message to persona and get a response. (Command - CQRS)"""
        persona = self.persona_repo.get_by_user_id(user_id)
        if not persona or persona.status != "ready":
            return None

        # Add user message to history
        self.chat_repo.add_message(persona.id, "user", message)

        # Get recent chat history for context
        history = self.chat_repo.get_recent_history(persona.id, limit=5)
        history_text = "\n".join([f"{h.sender}: {h.message}" for h in history])

        # Call LLM (this is simplified; in production, use async calls)
        from app.utils.llm_client import LLMClient

        llm_client = LLMClient()
        ai_response = llm_client.generate_response(persona.persona_prompt, history_text)

        # Add AI response to history
        self.chat_repo.add_message(persona.id, "ai", ai_response)
        
        # Update bond progress (simple implementation)
        persona.bond_progress = min(1.0, persona.bond_progress + 0.1)
        if persona.bond_progress >= 1.0:
            persona.bond_level += 1
            persona.bond_progress = 0.0
        self.persona_repo.db.commit()

        return ai_response
    
    def get_chat_history(self, user_id: UUID, limit: int = 20, offset: int = 0) -> Optional[dict]:
        """Get chat history for user's persona. (Query - CQRS)"""
        persona = self.persona_repo.get_by_user_id(user_id)
        if not persona or persona.status != "ready":
            return None
        
        # Simple implementation - just get recent messages
        history = self.chat_repo.get_recent_history(persona.id, limit=limit)
        
        return {
            "history": [
                {
                    "sender": h.sender,
                    "message": h.message,
                    "timestamp": h.timestamp.isoformat()
                } for h in history
            ]
        }


class QuestService:
    """Service for quest operations."""
    
    def __init__(self, db: Session):
        self.quest_repo = QuestRepository(db)
        self.user_quest_repo = UserQuestRepository(db)
        self.user_repo = UserRepository(db)
        
    def get_user_quests(self, user_id: UUID) -> dict:
        """Get all quests for a user. (Query - CQRS)"""
        all_quests = self.quest_repo.get_all_active()
        user_quests = self.user_quest_repo.get_user_quests(user_id)
        
        # Create a map of user quest statuses
        user_quest_map = {uq.quest_id: uq.status for uq in user_quests}
        
        quests_data = []
        for quest in all_quests:
            status = user_quest_map.get(quest.id, "not_started")
            quests_data.append({
                "id": quest.id,
                "title": quest.title,
                "description": quest.description,
                "status": status,
                "reward": {
                    "type": quest.reward_type,
                    "amount": quest.reward_amount
                }
            })
        
        return {"quests": quests_data}
    
    def complete_quest(self, user_id: UUID, quest_id: str) -> dict:
        """Mark a quest as complete and give rewards. (Command - CQRS)"""
        quest = self.quest_repo.get_by_id(quest_id)
        if not quest:
            raise Exception("Quest not found")
        
        user_quest = self.user_quest_repo.get_user_quest(user_id, quest_id)
        if user_quest and user_quest.status == "completed":
            raise Exception("Quest already completed")
        
        # Mark quest as completed
        self.user_quest_repo.create_or_update(user_id, quest_id, "completed")
        
        # Give reward
        if quest.reward_type == "memory_crystals":
            user = self.user_repo.get_by_id(user_id)
            if user:
                user.memory_crystals += quest.reward_amount
                self.user_quest_repo.db.commit()
        
        return {
            "message": "Quest completed!",
            "reward": {
                "type": quest.reward_type,
                "amount": quest.reward_amount
            }
        }


class SocialService:
    """Service for social features."""
    
    def __init__(self, db: Session):
        self.persona_repo = PersonaRepository(db)
        self.user_repo = UserRepository(db)
        
    def get_public_profile(self, user_id: UUID) -> Optional[dict]:
        """Get public persona profile. (Query - CQRS)"""
        persona = self.persona_repo.get_by_user_id(user_id)
        if not persona or persona.status != "ready":
            return None
        
        return {
            "name": persona.name,
            "archetype": persona.archetype,
            "rarity": persona.rarity,
            "illustrationUrl": persona.illustration_url,
            "stats": persona.stats
        }
    
    def get_compatibility(self, user_id: UUID, other_user_id: UUID) -> Optional[dict]:
        """Generate compatibility report between two personas. (Query - CQRS)"""
        user_persona = self.persona_repo.get_by_user_id(user_id)
        other_persona = self.persona_repo.get_by_user_id(other_user_id)
        
        if not user_persona or not other_persona or \
           user_persona.status != "ready" or other_persona.status != "ready":
            return None
        
        # Simple compatibility calculation based on stats
        user_stats = user_persona.stats or {}
        other_stats = other_persona.stats or {}
        
        # Calculate chemistry score (simplified)
        chemistry_score = 85  # Base score
        
        # Adjust based on archetype compatibility
        archetype_bonus = self._calculate_archetype_compatibility(user_persona.archetype, other_persona.archetype)
        chemistry_score += archetype_bonus
        
        chemistry_score = max(0, min(100, chemistry_score))
        
        analysis = self._generate_compatibility_analysis(user_persona.archetype, other_persona.archetype, chemistry_score)
        
        return {
            "chemistryScore": chemistry_score,
            "analysis": analysis
        }
    
    def _calculate_archetype_compatibility(self, arch1: str, arch2: str) -> int:
        """Calculate compatibility bonus based on archetypes."""
        # Simplified compatibility matrix
        compatibility_matrix = {
            "Yandere": {"Tsundere": 15, "Kuudere": 10, "Dandere": 5},
            "Tsundere": {"Yandere": 15, "Kuudere": 8, "Dandere": 12},
            "Kuudere": {"Yandere": 10, "Tsundere": 8, "Dandere": 15},
            "Dandere": {"Yandere": 5, "Tsundere": 12, "Kuudere": 15}
        }
        
        return compatibility_matrix.get(arch1, {}).get(arch2, 0)
    
    def _generate_compatibility_analysis(self, arch1: str, arch2: str, score: int) -> str:
        """Generate compatibility analysis text."""
        if score >= 90:
            return f"A perfect match! {arch1} and {arch2} complement each other beautifully."
        elif score >= 80:
            return f"Great chemistry! {arch1} and {arch2} have natural harmony."
        elif score >= 70:
            return f"Good compatibility. {arch1} and {arch2} can learn from each other."
        else:
            return f"Different personalities that could create interesting dynamics."
