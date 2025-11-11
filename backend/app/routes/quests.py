"""Quest route handlers."""
from chalice import Chalice
from uuid import UUID
from app.config import get_settings
from app.core.database import SessionLocal
from app.core.services import QuestService
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


@app.route("/api/v1/quests/me", methods=["GET"])
def get_user_quests():
    """Retrieve the list of available quests for the user."""
    try:
        user_id = get_current_user_id()
    except:
        return {"error": "Unauthorized"}, 401

    db = SessionLocal()
    try:
        quest_service = QuestService(db)
        result = quest_service.get_user_quests(user_id)
        return result, 200
    except Exception as e:
        return {"error": str(e)}, 500
    finally:
        db.close()


@app.route("/api/v1/quests/{quest_id}/complete", methods=["POST"])
def complete_quest(quest_id):
    """Mark a quest as complete and reward the user."""
    try:
        user_id = get_current_user_id()
    except:
        return {"error": "Unauthorized"}, 401

    db = SessionLocal()
    try:
        quest_service = QuestService(db)
        result = quest_service.complete_quest(user_id, quest_id)
        return result, 200
    except Exception as e:
        return {"error": str(e)}, 400
    finally:
        db.close()
