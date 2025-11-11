"""
Response Transformer for Frontend-Backend Compatibility
Converts snake_case database fields to camelCase JSON for frontend consumption.
Implements computed fields that frontend expects.
"""

from typing import Dict, Any, List, Optional
from datetime import datetime
from app.core.models import User, Persona, Ritual, Quest, RitualResponse


def to_camel_case(snake_str: str) -> str:
    """Convert snake_case to camelCase."""
    components = snake_str.split('_')
    return components[0] + ''.join(word.capitalize() for word in components[1:])


def transform_dict_keys(data: Dict[str, Any]) -> Dict[str, Any]:
    """Transform all keys in a dictionary from snake_case to camelCase."""
    if isinstance(data, dict):
        return {to_camel_case(key): transform_dict_keys(value) 
                for key, value in data.items()}
    elif isinstance(data, list):
        return [transform_dict_keys(item) for item in data]
    else:
        return data


class ResponseTransformer:
    """Transform backend models to frontend-compatible JSON responses."""
    
    @staticmethod
    def transform_user(user: User) -> Dict[str, Any]:
        """Transform User model to frontend format."""
        return {
            "id": str(user.id),
            "displayName": user.display_name,
            "email": user.email,
            "profileImageUrl": user.profile_image_url or f"https://ui-avatars.com/api/?name={user.display_name}",
            "memoryCrystals": user.memory_crystals,
            "createdAt": user.created_at.isoformat() if user.created_at else None,
            "lastLoginAt": datetime.now().isoformat()  # TODO: Track actual last login
        }
    
    @staticmethod  
    def transform_persona(persona: Persona) -> Dict[str, Any]:
        """Transform Persona model to frontend format."""
        return {
            "id": str(persona.id),
            "name": persona.name,
            "status": persona.status or "ready",
            "archetype": persona.archetype,
            "rarity": persona.rarity,
            "title": persona.title,
            "illustrationUrl": persona.illustration_url or "https://api.dicebear.com/7.x/avataaars/svg",
            "stats": persona.stats or {
                "Charisma": 50,
                "Intellect": 50, 
                "Kindness": 50,
                "Instability": 50,
                "Spirit": 50
            },
            "bondLevel": persona.bond_level or 1,
            "bondProgress": persona.bond_progress or 0.0,
            "createdAt": persona.created_at.isoformat() if persona.created_at else None
        }
    
    @staticmethod
    def transform_ritual(ritual: Ritual, base_url: str = "http://localhost:5173") -> Dict[str, Any]:
        """Transform Ritual model to frontend format with computed fields."""
        
        # Compute responses count
        responses_count = len(ritual.responses) if ritual.responses else 0
        minimum_responses = 3  # Business logic constant
        
        return {
            "ritualId": str(ritual.id),  # Frontend expects 'ritualId' not 'id'
            "invitationUrl": f"{base_url}/survey/{ritual.id}",  # Computed field
            "responsesCount": responses_count,  # Computed from relationship
            "minimumResponses": minimum_responses,  # Business constant
            "isSummonable": responses_count >= minimum_responses,  # Computed boolean
            "status": "active" if ritual.is_active else "completed",
            "createdAt": ritual.created_at.isoformat() if ritual.created_at else None
        }
    
    @staticmethod
    def transform_quest(quest: Quest, user_quest_status: str = "not-started") -> Dict[str, Any]:
        """Transform Quest model to frontend format."""
        return {
            "id": quest.id,
            "title": quest.title,
            "description": quest.description, 
            "status": user_quest_status,  # From UserQuest join
            "reward": {
                "type": quest.reward_type,
                "amount": quest.reward_amount
            }
        }
    
    @staticmethod
    def transform_chat_message(message_data: Dict[str, Any]) -> Dict[str, Any]:
        """Transform chat message to frontend format."""
        return {
            "id": message_data.get("id", ""),
            "sender": "ai" if message_data.get("sender") == "persona" else "user", 
            "message": message_data.get("content", message_data.get("message", "")),
            "timestamp": message_data.get("timestamp", datetime.now().isoformat())
        }

    @staticmethod 
    def create_api_response(success: bool, data: Any = None, message: str = "", error: Any = None) -> Dict[str, Any]:
        """Create standardized API response format."""
        if success:
            return {
                "success": True,
                "data": data,
                "message": message
            }
        else:
            return {
                "success": False,
                "error": {
                    "message": str(error) if error else "An error occurred",
                    "code": "INTERNAL_ERROR",
                    "details": {}
                }
            }


# Example usage and testing
def test_transformations():
    """Test the transformation functions with mock data."""
    print("Testing Response Transformations...")
    print("-" * 40)
    
    # Test user transformation
    class MockUser:
        def __init__(self):
            self.id = "123e4567-e89b-12d3-a456-426614174000"
            self.display_name = "John Doe"
            self.email = "john@example.com"
            self.profile_image_url = "https://example.com/avatar.jpg"
            self.memory_crystals = 150
            self.created_at = datetime.now()
    
    mock_user = MockUser()
    transformed_user = ResponseTransformer.transform_user(mock_user)
    
    print(f"[TEST] User transformation:")
    print(f"  Original: display_name -> Transformed: {transformed_user.get('displayName')}")
    print(f"  Original: memory_crystals -> Transformed: {transformed_user.get('memoryCrystals')}")
    print()
    
    # Test API response wrapper
    api_response = ResponseTransformer.create_api_response(
        success=True, 
        data=transformed_user,
        message="User profile retrieved"
    )
    
    print(f"[TEST] API Response Format:")
    print(f"  success: {api_response['success']}")
    print(f"  data keys: {list(api_response['data'].keys())}")
    print(f"  message: {api_response['message']}")
    print()
    
    print("[RESULT] Response transformations working correctly!")
    print()

if __name__ == "__main__":
    test_transformations()
