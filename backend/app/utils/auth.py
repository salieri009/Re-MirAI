"""JWT authentication utilities."""
import jwt
from datetime import datetime, timedelta
from typing import Optional
from app.config import get_settings

settings = get_settings()


def create_access_token(user_id: str, expires_in_hours: int = 24) -> str:
    """Create a JWT access token."""
    expires_at = datetime.utcnow() + timedelta(hours=expires_in_hours)
    payload = {
        "user_id": user_id,
        "exp": expires_at,
        "iat": datetime.utcnow(),
    }
    token = jwt.encode(payload, settings.jwt_secret, algorithm=settings.jwt_algorithm)
    return token


def decode_token(token: str) -> Optional[dict]:
    """Decode and validate a JWT token."""
    try:
        payload = jwt.decode(token, settings.jwt_secret, algorithms=[settings.jwt_algorithm])
        return payload
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None


def extract_token_from_header(auth_header: str) -> Optional[str]:
    """Extract JWT token from Authorization header."""
    if not auth_header:
        return None
    parts = auth_header.split()
    if len(parts) != 2 or parts[0].lower() != "bearer":
        return None
    return parts[1]
