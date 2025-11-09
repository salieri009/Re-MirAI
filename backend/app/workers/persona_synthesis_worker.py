"""Persona Synthesis Worker - Step 1 of Saga Pattern.

This Lambda function is triggered by SQS messages from the persona generation queue.
It performs persona synthesis by aggregating survey responses and generating a prompt via LLM.
"""
import json
from uuid import UUID
from app.core.database import SessionLocal
from app.core.repositories import PersonaRepository, SurveyResponseRepository
from app.utils.llm_client import LLMClient
from app.utils.queue_manager import QueueManager
from app.config import get_settings

settings = get_settings()


def lambda_handler(event, context):
    """
    Lambda handler for processing persona synthesis messages.

    Expected SQS message format:
    {
        "persona_id": "uuid",
        "user_id": "uuid",
        "survey_id": "uuid"
    }
    """
    db = SessionLocal()
    queue_manager = QueueManager()

    try:
        for record in event.get("Records", []):
            message_body = json.loads(record["body"])
            persona_id = UUID(message_body["persona_id"])
            survey_id = UUID(message_body["survey_id"])
            receipt_handle = record["receiptHandle"]

            # Get repositories
            persona_repo = PersonaRepository(db)
            response_repo = SurveyResponseRepository(db)

            # Update persona status to 'synthesizing'
            persona_repo.update_status(persona_id, "synthesizing")

            # Fetch and aggregate survey responses
            responses = response_repo.get_by_survey_id(survey_id)
            aggregated_answers = [json.loads(r.answers) for r in responses]

            # Generate persona prompt using LLM
            llm_client = LLMClient()
            persona_prompt = llm_client.generate_persona_prompt(aggregated_answers)

            # Update persona with generated prompt and move to next step
            persona_repo.update_status(persona_id, "generating_image")

            # Trigger next step in saga (image generation)
            queue_manager.send_message(
                settings.image_generation_queue_name,
                {
                    "persona_id": str(persona_id),
                    "persona_prompt": persona_prompt,
                },
            )

            # Delete message from queue only after successful processing
            queue_manager.delete_message(
                settings.persona_generation_queue_name,
                receipt_handle,
            )

            return {
                "statusCode": 200,
                "body": json.dumps("Persona synthesis completed"),
            }

    except Exception as e:
        print(f"Error in persona synthesis: {e}")
        return {
            "statusCode": 500,
            "body": json.dumps(f"Error: {str(e)}"),
        }
    finally:
        db.close()
