"""Repository layer for database operations (Data Access Layer)."""
from uuid import UUID
from typing import Optional, List
from sqlalchemy.orm import Session
from app.core.models import User, Ritual, Persona, RitualResponse, ChatHistory, Quest, UserQuest


class UserRepository:
    """Repository for User entity operations."""

    def __init__(self, db: Session):
        self.db = db

    def get_by_google_id(self, google_id: str) -> Optional[User]:
        """Retrieve a user by their Google ID."""
        return self.db.query(User).filter(User.google_id == google_id).first()

    def get_by_id(self, user_id: UUID) -> Optional[User]:
        """Retrieve a user by their ID."""
        return self.db.query(User).filter(User.id == user_id).first()

    def create(self, google_id: str, email: str, display_name: str = None, profile_image_url: str = None) -> User:
        """Create a new user."""
        user = User(
            google_id=google_id,
            email=email,
            display_name=display_name,
            profile_image_url=profile_image_url,
        )
        self.db.add(user)
        self.db.commit()
        self.db.refresh(user)
        return user


class RitualRepository:
    """Repository for Ritual entity operations."""

    def __init__(self, db: Session):
        self.db = db

    def create(self, user_id: UUID) -> Ritual:
        """Create a new ritual for a user."""
        ritual = Ritual(user_id=user_id, is_active=True)
        self.db.add(ritual)
        self.db.commit()
        self.db.refresh(ritual)
        return ritual

    def get_by_id(self, ritual_id: UUID) -> Optional[Ritual]:
        """Retrieve a ritual by ID."""
        return self.db.query(Ritual).filter(Ritual.id == ritual_id).first()

    def get_by_user_id(self, user_id: UUID) -> Optional[Ritual]:
        """Retrieve the most recent active ritual for a user."""
        return (
            self.db.query(Ritual)
            .filter(Ritual.user_id == user_id, Ritual.is_active == True)
            .order_by(Ritual.created_at.desc())
            .first()
        )


class RitualResponseRepository:
    """Repository for RitualResponse entity operations."""

    def __init__(self, db: Session):
        self.db = db

    def create(self, ritual_id: UUID, responder_id: str, answers: dict) -> RitualResponse:
        """Create a new ritual response."""
        response = RitualResponse(ritual_id=ritual_id, responder_id=responder_id, answers=answers)
        self.db.add(response)
        self.db.commit()
        self.db.refresh(response)
        return response

    def get_by_ritual_id(self, ritual_id: UUID) -> List[RitualResponse]:
        """Retrieve all responses for a ritual."""
        return self.db.query(RitualResponse).filter(RitualResponse.ritual_id == ritual_id).all()

    def count_by_ritual_id(self, ritual_id: UUID) -> int:
        """Count responses for a ritual."""
        return self.db.query(RitualResponse).filter(RitualResponse.ritual_id == ritual_id).count()


class PersonaRepository:
    """Repository for Persona entity operations."""

    def __init__(self, db: Session):
        self.db = db

    def get_by_user_id(self, user_id: UUID) -> Optional[Persona]:
        """Retrieve a persona by user ID."""
        return self.db.query(Persona).filter(Persona.user_id == user_id).first()

    def create(self, user_id: UUID) -> Persona:
        """Create a new persona for a user."""
        persona = Persona(user_id=user_id, status="pending")
        self.db.add(persona)
        self.db.commit()
        self.db.refresh(persona)
        return persona

    def update_status(self, persona_id: UUID, status: str) -> Persona:
        """Update persona status."""
        persona = self.db.query(Persona).filter(Persona.id == persona_id).first()
        if persona:
            persona.status = status
            self.db.commit()
            self.db.refresh(persona)
        return persona

    def update_with_prompt_and_image(self, persona_id: UUID, prompt: str, illustration_url: str, status: str = "ready") -> Persona:
        """Update persona with generated prompt and illustration."""
        persona = self.db.query(Persona).filter(Persona.id == persona_id).first()
        if persona:
            persona.persona_prompt = prompt
            persona.illustration_url = illustration_url
            persona.status = status
            self.db.commit()
            self.db.refresh(persona)
        return persona

    def update_persona_details(self, persona_id: UUID, name: str, archetype: str, rarity: str, title: str, stats: dict) -> Persona:
        """Update persona with detailed information."""
        persona = self.db.query(Persona).filter(Persona.id == persona_id).first()
        if persona:
            persona.name = name
            persona.archetype = archetype
            persona.rarity = rarity
            persona.title = title
            persona.stats = stats
            self.db.commit()
            self.db.refresh(persona)
        return persona


class ChatHistoryRepository:
    """Repository for ChatHistory entity operations."""

    def __init__(self, db: Session):
        self.db = db

    def add_message(self, persona_id: UUID, sender: str, message: str) -> ChatHistory:
        """Add a message to chat history."""
        chat = ChatHistory(persona_id=persona_id, sender=sender, message=message)
        self.db.add(chat)
        self.db.commit()
        self.db.refresh(chat)
        return chat

    def get_recent_history(self, persona_id: UUID, limit: int = 10) -> List[ChatHistory]:
        """Retrieve recent chat history for a persona."""
        return (
            self.db.query(ChatHistory)
            .filter(ChatHistory.persona_id == persona_id)
            .order_by(ChatHistory.timestamp.desc())
            .limit(limit)
            .all()[::-1]  # Reverse to get chronological order
        )


class QuestRepository:
    """Repository for Quest entity operations."""

    def __init__(self, db: Session):
        self.db = db

    def get_all_active(self) -> List[Quest]:
        """Retrieve all active quests."""
        return self.db.query(Quest).filter(Quest.is_active == True).all()

    def get_by_id(self, quest_id: str) -> Optional[Quest]:
        """Retrieve a quest by ID."""
        return self.db.query(Quest).filter(Quest.id == quest_id).first()


class UserQuestRepository:
    """Repository for UserQuest entity operations."""

    def __init__(self, db: Session):
        self.db = db

    def get_user_quests(self, user_id: UUID) -> List[UserQuest]:
        """Retrieve all quests for a user."""
        return self.db.query(UserQuest).filter(UserQuest.user_id == user_id).all()

    def get_user_quest(self, user_id: UUID, quest_id: str) -> Optional[UserQuest]:
        """Retrieve a specific user quest."""
        return self.db.query(UserQuest).filter(
            UserQuest.user_id == user_id, 
            UserQuest.quest_id == quest_id
        ).first()

    def create_or_update(self, user_id: UUID, quest_id: str, status: str) -> UserQuest:
        """Create or update a user quest."""
        user_quest = self.get_user_quest(user_id, quest_id)
        if not user_quest:
            user_quest = UserQuest(user_id=user_id, quest_id=quest_id, status=status)
            self.db.add(user_quest)
        else:
            user_quest.status = status
            if status == "completed":
                from datetime import datetime
                user_quest.completed_at = datetime.utcnow()
        
        self.db.commit()
        self.db.refresh(user_quest)
        return user_quest
