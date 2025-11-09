"""Authentication route handlers."""
from chalice import Chalice, Response
from uuid import UUID
import json
import jwt
from app.config import get_settings
from app.core.database import SessionLocal
from app.core.services import AuthService
from app.utils.auth import create_access_token

app = Chalice(app_name="re-mirai-backend")
settings = get_settings()


def verify_google_token(token: str) -> dict:
    """Verify and decode Google ID token."""
    try:
        # In production, use google.auth.transport.requests and google.oauth2.id_token
        from google.auth.transport import requests
        from google.oauth2 import id_token

        request = requests.Request()
        id_info = id_token.verify_oauth2_token(token, request, settings.google_client_id)
        return id_info
    except Exception as e:
        print(f"Token verification failed: {e}")
        return None


@app.route("/api/v1/auth/google", methods=["POST"])
def google_auth():
    """Authenticate user with Google ID token."""
    body = app.current_request.json_body

    if not body or "token" not in body:
        return {"error": "Missing token"}, 400

    google_token = body["token"]
    id_info = verify_google_token(google_token)

    if not id_info:
        return {"error": "Invalid token"}, 401

    db = SessionLocal()
    try:
        auth_service = AuthService(db)
        user = auth_service.get_or_create_user(
            google_id=id_info.get("sub"),
            email=id_info.get("email"),
            display_name=id_info.get("name"),
            profile_image_url=id_info.get("picture"),
        )

        access_token = create_access_token(str(user.id))

        return {
            "user_id": str(user.id),
            "email": user.email,
            "display_name": user.display_name,
            "token": access_token,
        }
    finally:
        db.close()
