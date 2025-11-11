"""User route handlers."""
from chalice import Chalice
from app.config import get_settings
from app.core.database import SessionLocal
from app.core.services import AuthService
from app.utils.auth import extract_token_from_header, decode_token
from uuid import UUID

app = Chalice(app_name="re-mirai-backend")
settings = get_settings()


def get_current_user_id():
    """Extract current user ID from JWT token."""
    auth_header = app.current_request.headers.get("Authorization", "")
    token = extract_token_from_header(auth_header)

    if not token:
        raise Exception("Unauthorized")

    payload = decode_token(token)
    if not payload:
        raise Exception("Unauthorized")

    return UUID(payload["user_id"])


@app.route("/api/v1/users/me", methods=["GET"])
def get_user_profile():
    """Retrieve the profile of the currently authenticated user."""
    try:
        user_id = get_current_user_id()
    except:
        return {"error": "Unauthorized"}, 401

    db = SessionLocal()
    try:
        auth_service = AuthService(db)
        user = auth_service.user_repo.get_by_id(user_id)
        
        if not user:
            return {"error": "User not found"}, 404
            
        return {
            "id": str(user.id),
            "displayName": user.display_name,
            "email": user.email,
            "profileImageUrl": user.profile_image_url,
            "memoryCrystals": user.memory_crystals
        }
    except Exception as e:
        return {"error": str(e)}, 500
    finally:
        db.close()
