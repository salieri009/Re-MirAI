#!/usr/bin/env python3
"""
Test script to verify backend-frontend connection.
Run this after starting both backend (chalice local) and frontend (npm run dev).
"""

import requests
import json
import time

# Test configuration
BACKEND_URL = "http://localhost:8000"
FRONTEND_URL = "http://localhost:5173"

def test_backend_health():
    """Test if backend is running."""
    try:
        response = requests.get(f"{BACKEND_URL}/health", timeout=5)
        if response.status_code == 200:
            print("✅ Backend health check passed!")
            return True
        else:
            print(f"❌ Backend health check failed: {response.status_code}")
            return False
    except requests.exceptions.RequestException as e:
        print(f"❌ Backend not accessible: {e}")
        return False

def test_frontend_health():
    """Test if frontend is running."""
    try:
        response = requests.get(FRONTEND_URL, timeout=5)
        if response.status_code == 200:
            print("✅ Frontend is accessible!")
            return True
        else:
            print(f"❌ Frontend not accessible: {response.status_code}")
            return False
    except requests.exceptions.RequestException as e:
        print(f"❌ Frontend not accessible: {e}")
        return False

def test_cors():
    """Test CORS configuration."""
    try:
        # Test preflight request
        headers = {
            'Origin': FRONTEND_URL,
            'Access-Control-Request-Method': 'POST',
            'Access-Control-Request-Headers': 'Content-Type,Authorization'
        }
        response = requests.options(f"{BACKEND_URL}/api/v1/ritual", headers=headers, timeout=5)
        
        if 'Access-Control-Allow-Origin' in response.headers:
            print("✅ CORS headers present!")
            return True
        else:
            print("⚠️  CORS headers not found - may cause issues")
            return False
    except Exception as e:
        print(f"❌ CORS test failed: {e}")
        return False

def test_api_endpoints():
    """Test key API endpoints."""
    endpoints_to_test = [
        ("/health", "GET"),
        ("/api/v1/ritual", "POST"),  # This will fail auth but should return 401, not 404
        ("/api/v1/personas/me", "GET"),  # This will fail auth but should return 401, not 404
        ("/api/v1/quests/me", "GET"),  # This will fail auth but should return 401, not 404
    ]
    
    for endpoint, method in endpoints_to_test:
        try:
            if method == "GET":
                response = requests.get(f"{BACKEND_URL}{endpoint}", timeout=5)
            elif method == "POST":
                response = requests.post(f"{BACKEND_URL}{endpoint}", json={}, timeout=5)
            
            # 401 (Unauthorized) is expected for protected endpoints
            if response.status_code in [200, 401]:
                print(f"✅ {method} {endpoint} - endpoint accessible ({response.status_code})")
            elif response.status_code == 404:
                print(f"❌ {method} {endpoint} - endpoint not found (404)")
            else:
                print(f"⚠️  {method} {endpoint} - unexpected status ({response.status_code})")
                
        except Exception as e:
            print(f"❌ {method} {endpoint} - request failed: {e}")

def main():
    """Run all connection tests."""
    print("🔍 Testing Re:MirAI Backend-Frontend Connection")
    print("=" * 60)
    
    # Test backend
    print("\n📡 Testing Backend...")
    backend_ok = test_backend_health()
    
    if backend_ok:
        test_cors()
        test_api_endpoints()
    
    # Test frontend
    print("\n🌐 Testing Frontend...")
    frontend_ok = test_frontend_health()
    
    # Summary
    print("\n📋 Connection Test Summary")
    print("=" * 60)
    
    if backend_ok and frontend_ok:
        print("🎉 Both backend and frontend are running!")
        print("\nNext steps:")
        print("1. Set VITE_USE_MOCK_DATA=false in frontend/.env to use real API")
        print("2. Test the full application flow")
        print("3. Check browser console for any CORS or API errors")
    elif backend_ok:
        print("⚠️  Backend is running, but frontend is not accessible")
        print("Start frontend with: cd frontend && npm run dev")
    elif frontend_ok:
        print("⚠️  Frontend is running, but backend is not accessible")
        print("Start backend with: cd backend && chalice local")
    else:
        print("❌ Neither backend nor frontend are accessible")
        print("Start both services:")
        print("  Backend: cd backend && chalice local")
        print("  Frontend: cd frontend && npm run dev")

if __name__ == "__main__":
    main()
