"""Persona route handlers."""
from chalice import Chalice, Response
from uuid import UUID
import json
from app.config import get_settings
from app.core.database import SessionLocal
from app.core.services import PersonaService
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


@app.route("/api/v1/personas/me", methods=["GET"])
def get_persona():
    """Retrieve user's persona. If not ready, check and possibly trigger synthesis. (Query/Command - CQRS)"""
    try:
        user_id = get_current_user_id()
    except:
        return {"error": "Unauthorized"}, 401

    db = SessionLocal()
    try:
        persona_service = PersonaService(db)
        result = persona_service.get_or_create_persona(user_id)
        return result, 200
    except Exception as e:
        return {"error": str(e)}, 500
    finally:
        db.close()


@app.route("/api/v1/personas/me/chat", methods=["POST"])
def chat_with_persona():
    """Send a message to persona and get a response. (Command - CQRS)"""
    try:
        user_id = get_current_user_id()
    except:
        return {"error": "Unauthorized"}, 401

    body = app.current_request.json_body
    if not body or "message" not in body:
        return {"error": "Missing message"}, 400

    message = body["message"]

    db = SessionLocal()
    try:
        persona_service = PersonaService(db)
        response = persona_service.chat(user_id, message)

        if response is None:
            return {"error": "Persona not ready"}, 400

        return {"response": response}, 200
    except Exception as e:
        return {"error": str(e)}, 500
    finally:
        db.close()
