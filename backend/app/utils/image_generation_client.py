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

    def generate_illustration(self, persona_name: str, persona_prompt: str) -> Optional[str]:
        """Generate an AI illustration for a persona based on its description."""
        image_prompt = f"""
        Create a unique, appealing character portrait based on this persona:
        Name: {persona_name}
        Description: {persona_prompt[:200]}

        The character should be visually distinctive and suitable for social media sharing.
        Style: Modern, anime-inspired illustration.
        """

        try:
            response = openai.Image.create(
                prompt=image_prompt,
                n=1,
                size="512x512",
            )
            return response.data[0].url
        except Exception as e:
            print(f"Error generating image: {e}")
            return None
