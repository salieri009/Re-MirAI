"""Persona Synthesis Worker - Step 1 of Saga Pattern.

This Lambda function is triggered by SQS messages from the persona generation queue.
It performs persona synthesis by aggregating survey responses and generating a prompt via LLM.
"""
import json
from uuid import UUID
from app.core.database import SessionLocal
from app.core.repositories import PersonaRepository, RitualResponseRepository
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
        "ritual_id": "uuid",
        "mode": "Fated" | "Alchemic",
        "archetype_filter": "optional_string"
    }
    """
    db = SessionLocal()
    queue_manager = QueueManager()

    try:
        for record in event.get("Records", []):
            message_body = json.loads(record["body"])
            persona_id = UUID(message_body["persona_id"])
            user_id = UUID(message_body["user_id"])
            ritual_id = UUID(message_body["ritual_id"])
            mode = message_body.get("mode", "Fated")
            archetype_filter = message_body.get("archetype_filter")
            receipt_handle = record["receiptHandle"]

            # Get repositories
            persona_repo = PersonaRepository(db)
            response_repo = RitualResponseRepository(db)

            # Update persona status to 'synthesizing'
            persona_repo.update_status(persona_id, "synthesizing")

            # Fetch ritual responses
            responses = response_repo.get_by_ritual_id(ritual_id)
            if len(responses) < 3:
                raise Exception("Not enough responses for synthesis")
            
            # Convert responses to format expected by PersonaGenerator
            from app.utils.persona_generator import PersonaGenerator
            
            response_data = []
            for response in responses:
                response_data.append({
                    "answers": response.answers,
                    "responder_id": response.responder_id
                })
            
            # Generate persona characteristics
            generator = PersonaGenerator()
            persona_data = generator.generate_persona_from_responses(
                response_data, mode, archetype_filter
            )
            
            # Generate LLM master prompt
            master_prompt = generator.generate_master_prompt(persona_data)
            
            # Update persona with all generated data
            persona_repo.update_persona_details(
                persona_id,
                persona_data["name"],
                persona_data["archetype"], 
                persona_data["rarity"],
                persona_data["title"],
                persona_data["stats"]
            )

            # Update persona status to generating image
            persona_repo.update_status(persona_id, "generating_image")

            # Trigger next step in saga (image generation)
            queue_manager.send_message(
                settings.image_generation_queue_name,
                {
                    "persona_id": str(persona_id),
                    "user_id": str(user_id),
                    "persona_prompt": master_prompt,
                    "archetype": persona_data["archetype"],
                    "rarity": persona_data["rarity"],
                    "name": persona_data["name"]
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
