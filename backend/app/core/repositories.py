"""Repository layer for database operations (Data Access Layer)."""
from uuid import UUID
from typing import Optional
from sqlalchemy.orm import Session
from app.core.models import User, Survey, Persona, SurveyResponse, ChatHistory


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


class SurveyRepository:
    """Repository for Survey entity operations."""

    def __init__(self, db: Session):
        self.db = db

    def create(self, user_id: UUID) -> Survey:
        """Create a new survey for a user."""
        survey = Survey(user_id=user_id, is_active=True)
        self.db.add(survey)
        self.db.commit()
        self.db.refresh(survey)
        return survey

    def get_by_id(self, survey_id: UUID) -> Optional[Survey]:
        """Retrieve a survey by ID."""
        return self.db.query(Survey).filter(Survey.id == survey_id).first()

    def get_by_user_id(self, user_id: UUID) -> Optional[Survey]:
        """Retrieve the most recent active survey for a user."""
        return (
            self.db.query(Survey)
            .filter(Survey.user_id == user_id, Survey.is_active == True)
            .order_by(Survey.created_at.desc())
            .first()
        )


class SurveyResponseRepository:
    """Repository for SurveyResponse entity operations."""

    def __init__(self, db: Session):
        self.db = db

    def create(self, survey_id: UUID, responder_id: str, answers: str) -> SurveyResponse:
        """Create a new survey response."""
        response = SurveyResponse(survey_id=survey_id, responder_id=responder_id, answers=answers)
        self.db.add(response)
        self.db.commit()
        self.db.refresh(response)
        return response

    def get_by_survey_id(self, survey_id: UUID) -> list:
        """Retrieve all responses for a survey."""
        return self.db.query(SurveyResponse).filter(SurveyResponse.survey_id == survey_id).all()

    def count_by_survey_id(self, survey_id: UUID) -> int:
        """Count responses for a survey."""
        return self.db.query(SurveyResponse).filter(SurveyResponse.survey_id == survey_id).count()


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

    def get_recent_history(self, persona_id: UUID, limit: int = 10) -> list:
        """Retrieve recent chat history for a persona."""
        return (
            self.db.query(ChatHistory)
            .filter(ChatHistory.persona_id == persona_id)
            .order_by(ChatHistory.timestamp.desc())
            .limit(limit)
            .all()[::-1]  # Reverse to get chronological order
        )
