"""Business logic layer (Service Layer) - implements CQRS pattern."""
import json
from uuid import UUID
from typing import Optional
from sqlalchemy.orm import Session
from app.core.repositories import (
    UserRepository,
    SurveyRepository,
    SurveyResponseRepository,
    PersonaRepository,
    ChatHistoryRepository,
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


class SurveyService:
    """Service for survey operations."""

    def __init__(self, db: Session):
        self.survey_repo = SurveyRepository(db)
        self.response_repo = SurveyResponseRepository(db)

    def create_survey(self, user_id: UUID) -> dict:
        """Create a new survey for a user. (Command - CQRS)"""
        survey = self.survey_repo.create(user_id)
        return {
            "survey_id": str(survey.id),
            "survey_url": f"https://remirai.app/survey/{survey.id}",
        }

    def get_survey_questions(self, survey_id: UUID) -> dict:
        """Retrieve survey questions. (Query - CQRS)"""
        survey = self.survey_repo.get_by_id(survey_id)
        if not survey:
            return None

        questions = [
            {"id": "q1", "text": "How would you describe their sense of humor?", "type": "text"},
            {"id": "q2", "text": "How do they handle stress?", "type": "multiple-choice", "options": ["Calm", "Anxious", "Energetic", "Withdrawn"]},
            {"id": "q3", "text": "What's their social energy level?", "type": "multiple-choice", "options": ["Very Introverted", "Introverted", "Extroverted", "Very Extroverted"]},
            {"id": "q4", "text": "What's the most striking thing about them?", "type": "text"},
        ]

        return {
            "survey_id": str(survey.id),
            "questions": questions,
        }

    def submit_response(self, survey_id: UUID, responder_id: str, answers: dict) -> dict:
        """Submit a survey response. (Command - CQRS)"""
        response = self.response_repo.create(survey_id, responder_id, json.dumps(answers))
        return {"status": "success", "message": "Response submitted successfully."}

    def get_response_count(self, survey_id: UUID) -> int:
        """Get the number of responses for a survey. (Query - CQRS)"""
        return self.response_repo.count_by_survey_id(survey_id)


class PersonaService:
    """Service for persona operations - implements asynchronous processing via Saga pattern."""

    def __init__(self, db: Session):
        self.persona_repo = PersonaRepository(db)
        self.survey_repo = SurveyRepository(db)
        self.response_repo = SurveyResponseRepository(db)
        self.chat_repo = ChatHistoryRepository(db)
        self.queue_manager = QueueManager()

    def get_or_create_persona(self, user_id: UUID) -> dict:
        """Get existing persona or initiate generation. (Query/Command - CQRS)"""
        persona = self.persona_repo.get_by_user_id(user_id)

        if not persona:
            # Create persona record with 'pending' status
            persona = self.persona_repo.create(user_id)

        # If persona is pending, check if there are enough responses to trigger synthesis
        if persona.status == "pending":
            survey = self.survey_repo.get_by_user_id(user_id)
            response_count = self.response_repo.count_by_survey_id(survey.id) if survey else 0

            if response_count >= 3:
                # Trigger persona synthesis (Saga Pattern - Step 1)
                self.queue_manager.send_message(
                    settings.persona_generation_queue_name,
                    {"persona_id": str(persona.id), "user_id": str(user_id), "survey_id": str(survey.id)},
                )
                persona.status = "synthesizing"
                import sqlalchemy
                self.persona_repo.db.commit()

        return {
            "persona_id": str(persona.id),
            "status": persona.status,
            "persona_prompt": persona.persona_prompt,
            "illustration_url": persona.illustration_url,
        }

    def chat(self, user_id: UUID, message: str) -> str:
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

        return ai_response
