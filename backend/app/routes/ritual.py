"""Ritual route handlers."""
from chalice import Chalice
from uuid import UUID
from app.config import get_settings
from app.core.database import SessionLocal
from app.core.services import RitualService
from app.utils.auth import extract_token_from_header, decode_token
from app.utils.helpers import get_client_fingerprint

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


@app.route("/api/v1/ritual", methods=["POST"])
def create_ritual():
    """Create a new ritual for the authenticated user. (Command - CQRS)"""
    try:
        user_id = get_current_user_id()
    except:
        return {"error": "Unauthorized"}, 401

    db = SessionLocal()
    try:
        ritual_service = RitualService(db)
        result = ritual_service.create_ritual(user_id)
        return result, 201
    except Exception as e:
        return {"error": str(e)}, 500
    finally:
        db.close()


@app.route("/api/v1/ritual/practice", methods=["POST"])
def practice_ritual():
    """Initiate a practice summon based on user's self-perception."""
    try:
        user_id = get_current_user_id()
    except:
        return {"error": "Unauthorized"}, 401

    body = app.current_request.json_body
    if not body or "answers" not in body:
        return {"error": "Missing answers"}, 400

    db = SessionLocal()
    try:
        ritual_service = RitualService(db)
        result = ritual_service.practice_summon(user_id, body["answers"])
        return result, 200
    except Exception as e:
        return {"error": str(e)}, 500
    finally:
        db.close()


@app.route("/api/v1/ritual/me", methods=["GET"])
def get_my_ritual():
    """Get the status of the user's current active ritual."""
    try:
        user_id = get_current_user_id()
    except:
        return {"error": "Unauthorized"}, 401

    db = SessionLocal()
    try:
        ritual_service = RitualService(db)
        result = ritual_service.get_ritual_status(user_id)
        
        if not result:
            return {"error": "No active ritual found"}, 404
        
        return result, 200
    except Exception as e:
        return {"error": str(e)}, 500
    finally:
        db.close()


@app.route("/api/v1/ritual/{ritual_id}", methods=["GET"])
def get_ritual(ritual_id):
    """Fetch the questions for a specific ritual. (Public endpoint)"""
    db = SessionLocal()
    try:
        ritual_service = RitualService(db)
        result = ritual_service.get_ritual_questions(UUID(ritual_id))

        if not result:
            return {"error": "Ritual not found"}, 404

        return result, 200
    except ValueError:
        return {"error": "Invalid ritual ID"}, 400
    except Exception as e:
        return {"error": str(e)}, 500
    finally:
        db.close()


@app.route("/api/v1/ritual/{ritual_id}/responses", methods=["POST"])
def submit_ritual_response(ritual_id):
    """Submit a ritual response. (Public endpoint - Command - CQRS)"""
    body = app.current_request.json_body

    if not body or "answers" not in body:
        return {"error": "Missing answers"}, 400

    responder_id = get_client_fingerprint(app.current_request)

    db = SessionLocal()
    try:
        ritual_service = RitualService(db)
        result = ritual_service.submit_response(UUID(ritual_id), responder_id, body["answers"])
        return result, 201
    except ValueError:
        return {"error": "Invalid ritual ID"}, 400
    except Exception as e:
        return {"error": str(e)}, 500
    finally:
        db.close()
