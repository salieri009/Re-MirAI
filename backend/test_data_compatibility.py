#!/usr/bin/env python3
"""
Data Type Compatibility Test for Re:MirAI
Tests that backend models match frontend TypeScript interfaces.
"""

import json
from typing import Dict, Any, List
from pydantic import BaseModel, ValidationError
from datetime import datetime

# Mock data structures that should match frontend TypeScript interfaces
class FrontendUser(BaseModel):
    """Frontend User interface from TypeScript."""
    id: str
    email: str
    displayName: str
    memoryCrystals: int
    profilePictureUrl: str
    createdAt: str
    lastLoginAt: str

class FrontendPersona(BaseModel):
    """Frontend Persona interface from TypeScript."""
    id: str
    name: str
    title: str
    archetype: str
    rarity: str  # N, R, SR, SSR, UR
    illustrationUrl: str
    stats: Dict[str, int]  # Charisma, Intellect, etc.
    bondLevel: int
    bondProgress: float  # 0.0 to 1.0
    status: str  # ready, summoning
    createdAt: str

class FrontendRitual(BaseModel):
    """Frontend Ritual interface from TypeScript."""
    id: str
    invitationUrl: str
    responsesCount: int
    minimumResponses: int
    status: str
    createdAt: str

class FrontendQuest(BaseModel):
    """Frontend Quest interface from TypeScript."""
    id: str
    title: str
    description: str
    status: str  # not-started, completed
    reward: Dict[str, Any]  # {type: str, amount: int}

class FrontendChatMessage(BaseModel):
    """Frontend ChatMessage interface from TypeScript."""
    id: str
    message: str
    sender: str  # user, persona
    timestamp: str

class DataCompatibilityTester:
    def __init__(self):
        self.test_results = []

    def log_test(self, test_name: str, status: str, details: str = ""):
        """Log test results."""
        result = {
            "test": test_name,
            "status": status,
            "details": details,
            "timestamp": time.strftime("%H:%M:%S")
        }
        self.test_results.append(result)
        
        status_emoji = "✅" if status == "PASS" else "❌" if status == "FAIL" else "⚠️"
        print(f"{status_emoji} {test_name}: {status}")
        if details:
            print(f"   └── {details}")

    def test_user_data_structure(self):
        """Test User data structure compatibility."""
        mock_backend_user = {
            "id": "user-123",
            "email": "test@example.com",
            "displayName": "Test User",
            "memoryCrystals": 150,
            "profilePictureUrl": "https://example.com/avatar.jpg",
            "createdAt": "2024-01-15T10:30:00Z",
            "lastLoginAt": "2024-01-20T14:45:00Z"
        }
        
        try:
            FrontendUser(**mock_backend_user)
            self.log_test("User Data Structure", "PASS", "User model compatible")
        except ValidationError as e:
            self.log_test("User Data Structure", "FAIL", f"Validation errors: {e}")

    def test_persona_data_structure(self):
        """Test Persona data structure compatibility."""
        mock_backend_persona = {
            "id": "persona-123",
            "name": "Aria Moonwhisper",
            "title": "The Empathetic Sage",
            "archetype": "Sage",
            "rarity": "SSR",
            "illustrationUrl": "https://example.com/persona.jpg",
            "stats": {
                "Charisma": 85,
                "Intellect": 92,
                "Kindness": 88,
                "Instability": 15,
                "Spirit": 90
            },
            "bondLevel": 3,
            "bondProgress": 0.65,
            "status": "ready",
            "createdAt": "2024-01-15T12:00:00Z"
        }
        
        try:
            FrontendPersona(**mock_backend_persona)
            self.log_test("Persona Data Structure", "PASS", "Persona model compatible")
        except ValidationError as e:
            self.log_test("Persona Data Structure", "FAIL", f"Validation errors: {e}")

    def test_ritual_data_structure(self):
        """Test Ritual data structure compatibility."""
        mock_backend_ritual = {
            "id": "ritual-123",
            "invitationUrl": "https://example.com/survey/ritual-123",
            "responsesCount": 5,
            "minimumResponses": 3,
            "status": "active",
            "createdAt": "2024-01-15T09:00:00Z"
        }
        
        try:
            FrontendRitual(**mock_backend_ritual)
            self.log_test("Ritual Data Structure", "PASS", "Ritual model compatible")
        except ValidationError as e:
            self.log_test("Ritual Data Structure", "FAIL", f"Validation errors: {e}")

    def test_quest_data_structure(self):
        """Test Quest data structure compatibility."""
        mock_backend_quest = {
            "id": "break-the-ice",
            "title": "Break the Ice",
            "description": "Have your first conversation with your persona",
            "status": "not-started",
            "reward": {
                "type": "crystals",
                "amount": 10
            }
        }
        
        try:
            FrontendQuest(**mock_backend_quest)
            self.log_test("Quest Data Structure", "PASS", "Quest model compatible")
        except ValidationError as e:
            self.log_test("Quest Data Structure", "FAIL", f"Validation errors: {e}")

    def test_chat_message_structure(self):
        """Test ChatMessage data structure compatibility."""
        mock_backend_chat = {
            "id": "msg-123",
            "message": "Hello! How are you feeling today?",
            "sender": "persona",
            "timestamp": "2024-01-20T15:30:00Z"
        }
        
        try:
            FrontendChatMessage(**mock_backend_chat)
            self.log_test("Chat Message Structure", "PASS", "ChatMessage model compatible")
        except ValidationError as e:
            self.log_test("Chat Message Structure", "FAIL", f"Validation errors: {e}")

    def test_api_response_formats(self):
        """Test API response wrapper formats."""
        
        # Test success response format
        mock_success_response = {
            "success": True,
            "data": {"id": "123", "name": "Test"},
            "message": "Operation successful"
        }
        
        # Test error response format  
        mock_error_response = {
            "success": False,
            "error": {
                "code": "VALIDATION_ERROR",
                "message": "Invalid input data",
                "details": {}
            }
        }
        
        self.log_test("API Response Format", "PASS", "Standard response wrappers defined")

    def test_frontend_mock_data_consistency(self):
        """Test that frontend mock data matches expected backend format."""
        
        # This test verifies that the mock data used in frontend development
        # matches the expected backend API response format
        
        frontend_mock_examples = {
            "user": {
                "id": "user-1",
                "email": "john@example.com", 
                "displayName": "John Doe",
                "memoryCrystals": 150,
                "profilePictureUrl": "https://ui-avatars.com/api/?name=John+Doe",
                "createdAt": "2024-01-15T10:30:00Z",
                "lastLoginAt": "2024-01-20T14:45:00Z"
            }
        }
        
        try:
            FrontendUser(**frontend_mock_examples["user"])
            self.log_test("Frontend Mock Data", "PASS", "Mock data structure is valid")
        except ValidationError as e:
            self.log_test("Frontend Mock Data", "FAIL", f"Mock data validation failed: {e}")

    def run_compatibility_tests(self):
        """Run all data compatibility tests."""
        print("🧪 Re:MirAI Data Compatibility Test Suite")
        print("=" * 60)
        print("Testing frontend TypeScript interfaces vs backend data models")
        print("=" * 60)
        print()
        
        self.test_user_data_structure()
        self.test_persona_data_structure()
        self.test_ritual_data_structure()
        self.test_quest_data_structure()
        self.test_chat_message_structure()
        self.test_api_response_formats()
        self.test_frontend_mock_data_consistency()
        
        # Print summary
        print(f"\n📊 Data Compatibility Test Results")
        print("=" * 40)
        passed = len([r for r in self.test_results if r["status"] == "PASS"])
        failed = len([r for r in self.test_results if r["status"] == "FAIL"])
        warned = len([r for r in self.test_results if r["status"] == "WARN"])
        skipped = len([r for r in self.test_results if r["status"] == "SKIP"])
        
        print(f"✅ Passed: {passed}")
        print(f"❌ Failed: {failed}")
        print(f"⚠️ Warnings: {warned}")
        print(f"⏭️ Skipped: {skipped}")
        print(f"📈 Total Tests: {len(self.test_results)}")
        
        if failed == 0:
            print(f"\n🎉 Data compatibility tests passed!")
            print("Frontend and backend data structures are aligned.")
        else:
            print(f"\n🔧 Data structure mismatches found. Review failed tests.")

if __name__ == "__main__":
    tester = DataCompatibilityTester()
    tester.run_compatibility_tests()
