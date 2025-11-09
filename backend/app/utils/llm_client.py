"""LLM client for generating persona prompts and chat responses."""
import openai
from app.config import get_settings

settings = get_settings()


class LLMClient:
    """Client for interacting with LLM APIs."""

    def __init__(self):
        if settings.llm_api_provider == "openai":
            openai.api_key = settings.llm_api_key

    def generate_persona_prompt(self, survey_responses: list) -> str:
        """Generate a persona prompt from aggregated survey responses."""
        # Aggregate responses
        aggregated_text = self._aggregate_responses(survey_responses)

        # Generate persona description using LLM
        prompt = f"""
        Based on the following feedback from a person's friends, generate a detailed AI persona prompt.
        The prompt should be written as if speaking to the AI persona itself.

        Feedback:
        {aggregated_text}

        Generate a structured persona prompt that includes:
        1. Core personality traits
        2. Behavioral patterns
        3. Dialogue style and tone
        4. Strengths and quirks

        Start the response with: "You are an AI persona..."
        """

        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.7,
            max_tokens=500,
        )

        return response.choices[0].message.content

    def generate_response(self, persona_prompt: str, chat_history: str) -> str:
        """Generate an AI response given persona prompt and chat history."""
        messages = [
            {"role": "system", "content": persona_prompt},
            {"role": "user", "content": chat_history},
        ]

        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=messages,
            temperature=0.8,
            max_tokens=300,
        )

        return response.choices[0].message.content

    @staticmethod
    def _aggregate_responses(responses: list) -> str:
        """Aggregate survey responses into a text summary."""
        aggregated = []
        for response in responses:
            aggregated.append(str(response))
        return "\n".join(aggregated)
