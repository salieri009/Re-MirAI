"""SQLAlchemy ORM models for the Re:MirAI application."""
from sqlalchemy import Column, String, UUID, DateTime, Boolean, Text, ForeignKey, BigInteger
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base
import uuid


class User(Base):
    """User model - stores user account information authenticated via Google OAuth."""

    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    google_id = Column(String(255), nullable=False, unique=True)
    email = Column(String(255), nullable=False, unique=True)
    display_name = Column(String(100), nullable=True)
    profile_image_url = Column(String(512), nullable=True)
    created_at = Column(DateTime(timezone=True), nullable=False, default=func.now())

    # Relationships
    surveys = relationship("Survey", back_populates="user", cascade="all, delete-orphan")
    personas = relationship("Persona", back_populates="user", cascade="all, delete-orphan")


class Survey(Base):
    """Survey model - represents a survey instance created by a user."""

    __tablename__ = "surveys"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    is_active = Column(Boolean, nullable=False, default=True)
    created_at = Column(DateTime(timezone=True), nullable=False, default=func.now())

    # Relationships
    user = relationship("User", back_populates="surveys")
    responses = relationship("SurveyResponse", back_populates="survey", cascade="all, delete-orphan")


class SurveyResponse(Base):
    """SurveyResponse model - stores anonymous responses to surveys."""

    __tablename__ = "survey_responses"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    survey_id = Column(UUID(as_uuid=True), ForeignKey("surveys.id", ondelete="CASCADE"), nullable=False)
    responder_id = Column(String(255), nullable=False)  # Anonymous fingerprint/session ID
    answers = Column(String(5000), nullable=False)  # JSON-serialized answers
    submitted_at = Column(DateTime(timezone=True), nullable=False, default=func.now())

    # Relationships
    survey = relationship("Survey", back_populates="responses")


class Persona(Base):
    """Persona model - stores the generated AI persona for a user."""

    __tablename__ = "personas"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, unique=True)
    persona_prompt = Column(Text, nullable=True)
    illustration_url = Column(String(512), nullable=True)
    status = Column(String(20), nullable=False, default="pending")  # pending, synthesizing, generating_image, ready, failed
    created_at = Column(DateTime(timezone=True), nullable=False, default=func.now())
    updated_at = Column(DateTime(timezone=True), nullable=False, default=func.now(), onupdate=func.now())

    # Relationships
    user = relationship("User", back_populates="personas")
    chat_history = relationship("ChatHistory", back_populates="persona", cascade="all, delete-orphan")


class ChatHistory(Base):
    """ChatHistory model - stores conversation history between a user and their persona."""

    __tablename__ = "chat_history"

    id = Column(BigInteger, primary_key=True, autoincrement=True)
    persona_id = Column(UUID(as_uuid=True), ForeignKey("personas.id", ondelete="CASCADE"), nullable=False)
    sender = Column(String(10), nullable=False)  # 'user' or 'ai'
    message = Column(Text, nullable=False)
    timestamp = Column(DateTime(timezone=True), nullable=False, default=func.now())

    # Relationships
    persona = relationship("Persona", back_populates="chat_history")
