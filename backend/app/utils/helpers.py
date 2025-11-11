"""Helper utility module."""
import hashlib
from typing import Dict, Any


def get_client_fingerprint(request) -> str:
    """Generate a unique fingerprint for a client based on request headers."""
    # Combine multiple headers for better fingerprinting
    user_agent = request.headers.get("User-Agent", "")
    accept_language = request.headers.get("Accept-Language", "")
    ip_address = request.headers.get("X-Forwarded-For", "unknown")
    
    # Create a hash of the combination for privacy
    fingerprint_data = f"{ip_address}:{user_agent}:{accept_language}"
    fingerprint_hash = hashlib.sha256(fingerprint_data.encode()).hexdigest()[:16]
    
    return fingerprint_hash


def validate_uuid(uuid_string: str) -> bool:
    """Validate if a string is a valid UUID."""
    try:
        from uuid import UUID
        UUID(uuid_string)
        return True
    except ValueError:
        return False
