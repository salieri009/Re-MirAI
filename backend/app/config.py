"""Configuration module for the Re:MirAI backend."""
from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    """Application settings, loaded from environment variables."""

    # Database
    database_url: str

    # AWS
    aws_region: str = "us-east-1"
    aws_access_key_id: str = ""
    aws_secret_access_key: str = ""

    # SQS Queues
    persona_generation_queue_name: str = "persona-generation-queue"
    image_generation_queue_name: str = "image-generation-queue"

    # JWT
    jwt_secret: str
    jwt_algorithm: str = "HS256"

    # Google OAuth
    google_client_id: str
    google_client_secret: str

    # LLM API
    llm_api_key: str
    llm_api_provider: str = "openai"

    # Image Generation API
    image_api_key: str
    image_api_provider: str = "openai"

    # Environment
    environment: str = "development"
    debug: bool = False

    class Config:
        env_file = ".env"
        case_sensitive = False


@lru_cache()
def get_settings():
    """Get cached settings instance."""
    return Settings()
