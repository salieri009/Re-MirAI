"""Helper utility module."""


def get_client_fingerprint(request) -> str:
    """Generate a unique fingerprint for a client based on request headers."""
    # In production, use a more sophisticated fingerprinting library like fingerprint-js
    user_agent = request.headers.get("User-Agent", "")
    accept_language = request.headers.get("Accept-Language", "")
    return f"{user_agent}:{accept_language}"
