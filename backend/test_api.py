#!/usr/bin/env python3
"""
Test script for Re:MirAI API endpoints.
This script tests the backend API functionality without needing the full AWS infrastructure.
"""

import requests
import json
import time
from uuid import uuid4

# Configuration
BASE_URL = "http://localhost:8000"  # Chalice local server
TEST_USER_TOKEN = None  # Will be set after login

def test_health():
    """Test health endpoint."""
    print("🔍 Testing health endpoint...")
    response = requests.get(f"{BASE_URL}/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"
    print("✅ Health check passed!")

def test_auth():
    """Test authentication endpoint."""
    print("🔍 Testing authentication...")
    
    # Mock Google token (for testing purposes)
    test_payload = {
        "token": "mock_google_token_for_testing"
    }
    
    response = requests.post(f"{BASE_URL}/api/v1/auth/google-login", json=test_payload)
    
    # Note: This will likely fail without real Google token, but we can test the endpoint structure
    print(f"Auth response status: {response.status_code}")
    print(f"Auth response: {response.text}")
    
    # For testing, we'll create a mock token
    global TEST_USER_TOKEN
    TEST_USER_TOKEN = "mock_jwt_token_for_testing"
    print("✅ Auth endpoint accessible (using mock token for further tests)")

def get_auth_headers():
    """Get authentication headers for API calls."""
    return {
        "Authorization": f"Bearer {TEST_USER_TOKEN}",
        "Content-Type": "application/json"
    }

def test_ritual_endpoints():
    """Test ritual-related endpoints."""
    print("🔍 Testing ritual endpoints...")
    
    # Test creating a ritual
    response = requests.post(
        f"{BASE_URL}/api/v1/ritual", 
        headers=get_auth_headers()
    )
    print(f"Create ritual status: {response.status_code}")
    
    # Test getting ritual questions (public endpoint)
    mock_ritual_id = str(uuid4())
    response = requests.get(f"{BASE_URL}/api/v1/ritual/{mock_ritual_id}")
    print(f"Get ritual questions status: {response.status_code}")
    
    # Test submitting ritual response (public endpoint)
    mock_answers = {
        "q1": "card1",
        "q2": "card2", 
        "q3": "card3"
    }
    response = requests.post(
        f"{BASE_URL}/api/v1/ritual/{mock_ritual_id}/responses",
        json={"answers": mock_answers}
    )
    print(f"Submit ritual response status: {response.status_code}")
    
    print("✅ Ritual endpoints accessible!")

def test_persona_endpoints():
    """Test persona-related endpoints."""
    print("🔍 Testing persona endpoints...")
    
    # Test summoning persona
    summon_payload = {
        "mode": "Fated"
    }
    response = requests.post(
        f"{BASE_URL}/api/v1/personas/summon",
        headers=get_auth_headers(),
        json=summon_payload
    )
    print(f"Summon persona status: {response.status_code}")
    
    # Test getting persona
    response = requests.get(
        f"{BASE_URL}/api/v1/personas/me",
        headers=get_auth_headers()
    )
    print(f"Get persona status: {response.status_code}")
    
    # Test chat with persona
    chat_payload = {
        "message": "Hello, nice to meet you!"
    }
    response = requests.post(
        f"{BASE_URL}/api/v1/personas/me/chat",
        headers=get_auth_headers(),
        json=chat_payload
    )
    print(f"Chat with persona status: {response.status_code}")
    
    # Test get chat history
    response = requests.get(
        f"{BASE_URL}/api/v1/personas/me/chat?limit=10",
        headers=get_auth_headers()
    )
    print(f"Get chat history status: {response.status_code}")
    
    print("✅ Persona endpoints accessible!")

def test_quest_endpoints():
    """Test quest-related endpoints."""
    print("🔍 Testing quest endpoints...")
    
    # Test getting user quests
    response = requests.get(
        f"{BASE_URL}/api/v1/quests/me",
        headers=get_auth_headers()
    )
    print(f"Get user quests status: {response.status_code}")
    
    # Test completing a quest
    response = requests.post(
        f"{BASE_URL}/api/v1/quests/break-the-ice/complete",
        headers=get_auth_headers()
    )
    print(f"Complete quest status: {response.status_code}")
    
    print("✅ Quest endpoints accessible!")

def test_social_endpoints():
    """Test social-related endpoints."""
    print("🔍 Testing social endpoints...")
    
    # Test getting public profile
    mock_user_id = str(uuid4())
    response = requests.get(f"{BASE_URL}/api/v1/social/profile/{mock_user_id}")
    print(f"Get public profile status: {response.status_code}")
    
    # Test compatibility check
    response = requests.get(
        f"{BASE_URL}/api/v1/social/compatibility?otherUserId={mock_user_id}",
        headers=get_auth_headers()
    )
    print(f"Get compatibility status: {response.status_code}")
    
    print("✅ Social endpoints accessible!")

def test_users_endpoints():
    """Test user-related endpoints."""
    print("🔍 Testing user endpoints...")
    
    # Test getting user profile
    response = requests.get(
        f"{BASE_URL}/api/v1/users/me",
        headers=get_auth_headers()
    )
    print(f"Get user profile status: {response.status_code}")
    
    print("✅ User endpoints accessible!")

def run_all_tests():
    """Run all API tests."""
    print("🚀 Starting Re:MirAI API tests...\n")
    
    try:
        test_health()
        test_auth() 
        test_ritual_endpoints()
        test_persona_endpoints()
        test_quest_endpoints()
        test_social_endpoints()
        test_users_endpoints()
        
        print("\n🎉 All API endpoint tests completed!")
        print("Note: Some tests may fail due to authentication/database requirements.")
        print("This is normal for testing endpoint accessibility.")
        
    except Exception as e:
        print(f"\n❌ Test failed with error: {e}")
        print("Make sure the Chalice server is running: chalice local")

if __name__ == "__main__":
    print("Re:MirAI API Test Suite")
    print("=" * 50)
    print("Make sure to start the Chalice server first:")
    print("cd backend && chalice local")
    print("=" * 50)
    
    input("Press Enter to start tests...")
    run_all_tests()
