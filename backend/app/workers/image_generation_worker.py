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
        "user_id": "uuid",
        "persona_prompt": "string",
        "archetype": "string",
        "rarity": "string", 
        "name": "string"
    }
    """
    db = SessionLocal()
    queue_manager = QueueManager()

    try:
        for record in event.get("Records", []):
            message_body = json.loads(record["body"])
            persona_id = UUID(message_body["persona_id"])
            user_id = UUID(message_body["user_id"])
            persona_prompt = message_body["persona_prompt"]
            archetype = message_body["archetype"]
            rarity = message_body["rarity"]
            name = message_body["name"]
            receipt_handle = record["receiptHandle"]

            # Get repositories
            persona_repo = PersonaRepository(db)

            # Generate detailed image prompt
            image_prompt = generate_image_prompt(name, archetype, rarity)

            # Generate illustration using AI
            image_client = ImageGenerationClient()
            illustration_url = image_client.generate_persona_image(image_prompt)

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


def generate_image_prompt(name: str, archetype: str, rarity: str) -> str:
    """Generate a detailed image prompt for persona illustration."""
    
    # Base style and quality based on rarity
    rarity_styles = {
        "N": "simple anime style, soft colors",
        "R": "detailed anime art, vibrant colors, high quality",
        "SR": "premium anime illustration, dynamic lighting, professional art",
        "SSR": "masterpiece anime artwork, cinematic lighting, ultra detailed", 
        "UR": "legendary anime art, ethereal effects, museum quality, divine aura"
    }
    
    # Archetype-specific characteristics
    archetype_traits = {
        "Yandere": "intense gaze, possessive expression, dark undertones, hidden knife or rose",
        "Tsundere": "defensive pose, blushed cheeks, crossed arms, conflicted expression",
        "Kuudere": "cool and composed, stoic expression, elegant posture, cold beauty",
        "Dandere": "shy demeanor, gentle smile, soft expression, modest clothing"
    }
    
    base_style = rarity_styles.get(rarity, rarity_styles["R"])
    character_traits = archetype_traits.get(archetype, "mysterious personality")
    
    prompt = f"""
Beautiful anime character portrait of {name}, a {archetype} personality type.
Character traits: {character_traits}
Art style: {base_style}
Setting: mystical background with subtle magical effects
Composition: portrait shot, detailed face and upper body
Lighting: soft ambient lighting with mystical glow
Quality: high resolution, anime illustration, detailed artwork
""".strip()
    
    return prompt
