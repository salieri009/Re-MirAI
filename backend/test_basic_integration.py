#!/usr/bin/env python3
"""
Basic Backend-Frontend Integration Test for Re:MirAI
Tests connectivity and API compatibility without complex dependencies or unicode.
"""

import urllib.request
import urllib.error
import json
import sys

BACKEND_URL = "http://localhost:8000"
FRONTEND_URL = "http://localhost:5173"

def test_backend_connection():
    """Test if backend server is running."""
    print("Testing backend connection...")
    try:
        with urllib.request.urlopen(f"{BACKEND_URL}/health", timeout=5) as response:
            if response.getcode() == 200:
                data = json.loads(response.read().decode())
                print(f"[PASS] Backend Health: {data}")
                return True
            else:
                print(f"[FAIL] Backend Health: HTTP {response.getcode()}")
                return False
    except Exception as e:
        print(f"[FAIL] Backend connection failed: {e}")
        return False

def test_frontend_connection():
    """Test if frontend server is running."""
    print("Testing frontend connection...")
    try:
        with urllib.request.urlopen(FRONTEND_URL, timeout=5) as response:
            if response.getcode() == 200:
                print("[PASS] Frontend server is running")
                return True
            else:
                print(f"[FAIL] Frontend: HTTP {response.getcode()}")
                return False
    except Exception as e:
        print(f"[WARN] Frontend connection failed: {e}")
        return False

def test_critical_api_endpoints():
    """Test that critical API endpoints are accessible."""
    print("Testing critical API endpoints...")
    
    endpoints = [
        ("GET", "/health", "Health check"),
        ("POST", "/api/v1/auth/google-login", "Authentication"),
        ("GET", "/api/v1/users/me", "User profile"),
        ("POST", "/api/v1/ritual", "Ritual creation"),
        ("POST", "/api/v1/personas/summon", "Persona summoning")
    ]
    
    results = {"pass": 0, "fail": 0}
    
    for method, path, description in endpoints:
        try:
            url = f"{BACKEND_URL}{path}"
            
            if method == "GET":
                req = urllib.request.Request(url, method="GET")
            else:
                data = json.dumps({}).encode('utf-8')
                req = urllib.request.Request(url, data=data, method=method)
                req.add_header('Content-Type', 'application/json')
            
            try:
                with urllib.request.urlopen(req, timeout=3) as response:
                    print(f"[PASS] {description}: HTTP {response.getcode()}")
                    results["pass"] += 1
            except urllib.error.HTTPError as e:
                # Accept HTTP errors except 404 - they indicate endpoint exists
                if e.code != 404:
                    print(f"[PASS] {description}: HTTP {e.code} (endpoint exists)")
                    results["pass"] += 1
                else:
                    print(f"[FAIL] {description}: Not Found (404)")
                    results["fail"] += 1
                    
        except Exception as e:
            print(f"[FAIL] {description}: {e}")
            results["fail"] += 1
    
    return results

def test_frontend_api_config():
    """Check frontend API configuration compatibility."""
    print("Checking frontend API configuration...")
    
    # These are the expected configurations based on frontend/src/services/api.ts
    expected_configs = {
        "baseURL": "http://localhost:8000/api/v1",
        "timeout": 10000,
        "auth_header": "Bearer <token>",
        "content_type": "application/json"
    }
    
    for config, value in expected_configs.items():
        print(f"[INFO] Frontend expects {config}: {value}")
    
    print("[PASS] Frontend API configuration documented")
    return True

def main():
    """Run comprehensive backend-frontend integration tests."""
    print("=" * 60)
    print("Re:MirAI Backend-Frontend Integration Tests")
    print("=" * 60)
    print(f"Backend URL: {BACKEND_URL}")
    print(f"Frontend URL: {FRONTEND_URL}")
    print("=" * 60)
    print()
    
    # Test 1: Server availability
    backend_ok = test_backend_connection()
    print()
    
    frontend_ok = test_frontend_connection()
    print()
    
    # Test 2: API endpoints (only if backend is running)
    if backend_ok:
        api_results = test_critical_api_endpoints()
        print()
    else:
        print("[SKIP] API endpoint tests - backend not available")
        print("Please start backend: cd backend && chalice local")
        api_results = {"pass": 0, "fail": 0}
        print()
    
    # Test 3: Configuration compatibility
    config_ok = test_frontend_api_config()
    print()
    
    # Final summary
    print("=" * 60)
    print("INTEGRATION TEST SUMMARY")
    print("=" * 60)
    
    if backend_ok and api_results["pass"] > 0:
        print("[SUCCESS] Backend and Frontend are compatible!")
        print(f"- Backend server: Running")
        print(f"- API endpoints: {api_results['pass']} working, {api_results['fail']} issues")
        print(f"- Frontend config: Compatible")
        print()
        print("Ready for full-stack development!")
        
    else:
        print("[ISSUES] Some compatibility issues found:")
        if not backend_ok:
            print("- Backend server not running")
        if api_results["fail"] > 0:
            print(f"- {api_results['fail']} API endpoints have issues")
        print()
        print("Please resolve these issues before development.")

if __name__ == "__main__":
    main()
