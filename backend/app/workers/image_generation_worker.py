"""Image Generation Worker - Step 2 of Saga Pattern.

This Lambda function is triggered by SQS messages from the image generation queue.
It generates an AI illustration for the persona and completes the saga.
"""
import json
from uuid import UUID
from app.core.database import SessionLocal
from app.core.repositories import PersonaRepository
from app.utils.image_generation_client import ImageGenerationClient
from app.utils.queue_manager import QueueManager
from app.config import get_settings

settings = get_settings()


def lambda_handler(event, context):
    """
    Lambda handler for processing image generation messages.

    Expected SQS message format:
    {
        "persona_id": "uuid",
        "persona_prompt": "string"
    }
    """
    db = SessionLocal()
    queue_manager = QueueManager()

    try:
        for record in event.get("Records", []):
            message_body = json.loads(record["body"])
            persona_id = UUID(message_body["persona_id"])
            persona_prompt = message_body["persona_prompt"]
            receipt_handle = record["receiptHandle"]

            # Get repositories
            persona_repo = PersonaRepository(db)

            # Generate illustration using AI
            image_client = ImageGenerationClient()
            illustration_url = image_client.generate_illustration(
                persona_name=f"Persona {persona_id.hex[:8]}",
                persona_prompt=persona_prompt,
            )

            if illustration_url:
                # Update persona with illustration and mark as ready
                persona_repo.update_with_prompt_and_image(
                    persona_id,
                    persona_prompt,
                    illustration_url,
                    status="ready",
                )
            else:
                # If image generation fails, mark as ready anyway but without image
                persona_repo.update_with_prompt_and_image(
                    persona_id,
                    persona_prompt,
                    None,
                    status="ready",
                )

            # Delete message from queue only after successful processing
            queue_manager.delete_message(
                settings.image_generation_queue_name,
                receipt_handle,
            )

            return {
                "statusCode": 200,
                "body": json.dumps("Image generation completed"),
            }

    except Exception as e:
        print(f"Error in image generation: {e}")
        return {
            "statusCode": 500,
            "body": json.dumps(f"Error: {str(e)}"),
        }
    finally:
        db.close()
