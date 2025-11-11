"""Image generation client."""
import openai
from typing import Optional
from app.config import get_settings

settings = get_settings()


class ImageGenerationClient:
    """Client for generating persona character illustrations."""

    def __init__(self):
        if settings.image_api_provider == "openai":
            openai.api_key = settings.image_api_key

    def generate_persona_image(self, image_prompt: str) -> Optional[str]:
        """Generate a persona image using AI image generation."""
        # Use the provided detailed image prompt directly

        try:
            response = openai.Image.create(
                prompt=image_prompt,
                n=1,
                size="1024x1024",  # Higher quality for persona portraits
                model="dall-e-3"   # Use latest DALL-E version
            )
            return response.data[0].url
        except Exception as e:
            print(f"Error generating persona image: {e}")
            # Fallback to a placeholder image URL
            return f"https://placeholder.pics/svg/512x512/DEDEDE/555555/Persona"
