"""Survey route handlers."""
from chalice import Chalice, Response
from uuid import UUID
import json
from app.config import get_settings
from app.core.database import SessionLocal
from app.core.services import SurveyService
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


@app.route("/api/v1/surveys", methods=["POST"])
def create_survey():
    """Create a new survey for the authenticated user. (Command - CQRS)"""
    try:
        user_id = get_current_user_id()
    except:
        return {"error": "Unauthorized"}, 401

    db = SessionLocal()
    try:
        survey_service = SurveyService(db)
        result = survey_service.create_survey(user_id)
        return result, 201
    except Exception as e:
        return {"error": str(e)}, 500
    finally:
        db.close()


@app.route("/api/v1/surveys/{survey_id}", methods=["GET"])
def get_survey(survey_id):
    """Retrieve survey questions. (Query - CQRS)"""
    db = SessionLocal()
    try:
        survey_service = SurveyService(db)
        result = survey_service.get_survey_questions(UUID(survey_id))

        if not result:
            return {"error": "Survey not found"}, 404

        return result, 200
    except Exception as e:
        return {"error": str(e)}, 500
    finally:
        db.close()


@app.route("/api/v1/surveys/{survey_id}/responses", methods=["POST"])
def submit_survey_response(survey_id):
    """Submit a survey response. (Command - CQRS)"""
    body = app.current_request.json_body

    if not body or "answers" not in body:
        return {"error": "Missing answers"}, 400

    responder_id = get_client_fingerprint(app.current_request)

    db = SessionLocal()
    try:
        survey_service = SurveyService(db)
        result = survey_service.submit_response(UUID(survey_id), responder_id, body["answers"])
        return result, 201
    except Exception as e:
        return {"error": str(e)}, 500
    finally:
        db.close()
