"""SQLAlchemy ORM models for the Re:MirAI application."""
from sqlalchemy import Column, String, UUID, DateTime, Boolean, Text, ForeignKey, BigInteger, Integer, Float, JSON
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
    memory_crystals = Column(Integer, nullable=False, default=100)
    created_at = Column(DateTime(timezone=True), nullable=False, default=func.now())

    # Relationships
    rituals = relationship("Ritual", back_populates="user", cascade="all, delete-orphan")
    personas = relationship("Persona", back_populates="user", cascade="all, delete-orphan")
    quests = relationship("UserQuest", back_populates="user", cascade="all, delete-orphan")


class Ritual(Base):
    """Ritual model - represents a summoning ritual (survey) instance created by a user."""

    __tablename__ = "rituals"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    is_active = Column(Boolean, nullable=False, default=True)
    created_at = Column(DateTime(timezone=True), nullable=False, default=func.now())

    # Relationships
    user = relationship("User", back_populates="rituals")
    responses = relationship("RitualResponse", back_populates="ritual", cascade="all, delete-orphan")


class RitualResponse(Base):
    """RitualResponse model - stores anonymous responses to rituals."""

    __tablename__ = "ritual_responses"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    ritual_id = Column(UUID(as_uuid=True), ForeignKey("rituals.id", ondelete="CASCADE"), nullable=False)
    responder_id = Column(String(255), nullable=False)  # Anonymous fingerprint/session ID
    answers = Column(JSON, nullable=False)  # JSON answers
    submitted_at = Column(DateTime(timezone=True), nullable=False, default=func.now())

    # Relationships
    ritual = relationship("Ritual", back_populates="responses")


class Persona(Base):
    """Persona model - stores the generated AI persona for a user."""

    __tablename__ = "personas"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, unique=True)
    name = Column(String(100), nullable=True)
    archetype = Column(String(50), nullable=True)  # e.g., 'Yandere', 'Tsundere'
    rarity = Column(String(10), nullable=True)  # 'N', 'R', 'SR', 'SSR', 'UR'
    title = Column(String(200), nullable=True)  # e.g., "Yandere hiding her kindness"
    stats = Column(JSON, nullable=True)  # {"Charisma": 80, "Intellect": 75, ...}
    bond_level = Column(Integer, nullable=False, default=1)
    bond_progress = Column(Float, nullable=False, default=0.0)
    persona_prompt = Column(Text, nullable=True)
    illustration_url = Column(String(512), nullable=True)
    status = Column(String(20), nullable=False, default="pending")  # pending, summoning, ready, failed, practice
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


class Quest(Base):
    """Quest model - defines available quests."""

    __tablename__ = "quests"

    id = Column(String(50), primary_key=True)  # e.g., 'break-the-ice'
    title = Column(String(100), nullable=False)
    description = Column(Text, nullable=False)
    reward_type = Column(String(50), nullable=False, default="memory_crystals")
    reward_amount = Column(Integer, nullable=False, default=10)
    is_active = Column(Boolean, nullable=False, default=True)
    created_at = Column(DateTime(timezone=True), nullable=False, default=func.now())

    # Relationships
    user_quests = relationship("UserQuest", back_populates="quest", cascade="all, delete-orphan")


class UserQuest(Base):
    """UserQuest model - tracks user quest progress."""

    __tablename__ = "user_quests"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    quest_id = Column(String(50), ForeignKey("quests.id", ondelete="CASCADE"), nullable=False)
    status = Column(String(20), nullable=False, default="not_started")  # not_started, completed
    completed_at = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), nullable=False, default=func.now())

    # Relationships
    user = relationship("User", back_populates="quests")
    quest = relationship("Quest", back_populates="user_quests")
