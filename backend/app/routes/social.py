"""Social route handlers."""
from chalice import Chalice
from uuid import UUID
from app.config import get_settings
from app.core.database import SessionLocal
from app.core.services import SocialService
from app.utils.auth import extract_token_from_header, decode_token

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


@app.route("/api/v1/social/profile/{user_id}", methods=["GET"])
def get_public_profile(user_id):
    """Get the public-facing profile card data for a specific user's Persona."""
    db = SessionLocal()
    try:
        social_service = SocialService(db)
        result = social_service.get_public_profile(UUID(user_id))
        
        if not result:
            return {"error": "Profile not found"}, 404
            
        return result, 200
    except ValueError:
        return {"error": "Invalid user ID"}, 400
    except Exception as e:
        return {"error": str(e)}, 500
    finally:
        db.close()


@app.route("/api/v1/social/compatibility", methods=["GET"])
def get_compatibility():
    """Generate a compatibility report between the user's Persona and another user's Persona."""
    try:
        user_id = get_current_user_id()
    except:
        return {"error": "Unauthorized"}, 401

    query_params = app.current_request.query_params or {}
    other_user_id = query_params.get("otherUserId")
    
    if not other_user_id:
        return {"error": "Missing otherUserId parameter"}, 400

    db = SessionLocal()
    try:
        social_service = SocialService(db)
        result = social_service.get_compatibility(user_id, UUID(other_user_id))
        
        if not result:
            return {"error": "Compatibility cannot be calculated"}, 400
            
        return result, 200
    except ValueError:
        return {"error": "Invalid user ID"}, 400
    except Exception as e:
        return {"error": str(e)}, 500
    finally:
        db.close()
