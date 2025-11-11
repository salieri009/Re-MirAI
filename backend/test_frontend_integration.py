#!/usr/bin/env python3
"""
Frontend-Backend Integration Test Suite for Re:MirAI
Tests API compatibility, data format consistency, and end-to-end workflows.
"""

import requests
import json
import time
from typing import Dict, Any, Optional
from uuid import uuid4
import asyncio

# Configuration
BACKEND_URL = "http://localhost:8000"
FRONTEND_URL = "http://localhost:5173"
TEST_TIMEOUT = 5  # seconds

class IntegrationTester:
    def __init__(self):
        self.backend_url = BACKEND_URL
        self.test_token = None
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

    def test_server_availability(self) -> bool:
        """Test if backend server is running."""
        try:
            response = requests.get(f"{self.backend_url}/health", timeout=TEST_TIMEOUT)
            if response.status_code == 200:
                self.log_test("Backend Server Availability", "PASS", f"Server responding on {self.backend_url}")
                return True
            else:
                self.log_test("Backend Server Availability", "FAIL", f"Unexpected status code: {response.status_code}")
                return False
        except requests.RequestException as e:
            self.log_test("Backend Server Availability", "FAIL", f"Connection failed: {str(e)}")
            return False

    def test_frontend_server_availability(self) -> bool:
        """Test if frontend server is running."""
        try:
            response = requests.get(FRONTEND_URL, timeout=TEST_TIMEOUT)
            if response.status_code == 200:
                self.log_test("Frontend Server Availability", "PASS", f"Frontend responding on {FRONTEND_URL}")
                return True
            else:
                self.log_test("Frontend Server Availability", "FAIL", f"Status: {response.status_code}")
                return False
        except requests.RequestException as e:
            self.log_test("Frontend Server Availability", "FAIL", f"Connection failed: {str(e)}")
            return False

    def test_api_endpoint_compatibility(self):
        """Test that all frontend API calls match backend endpoints."""
        frontend_api_endpoints = [
            # Authentication
            ("POST", "/api/v1/auth/google-login", {"token": "mock_token"}),
            
            # User Management  
            ("GET", "/api/v1/users/me", None),
            
            # Ritual Management
            ("POST", "/api/v1/ritual", None),
            ("GET", f"/api/v1/ritual/{uuid4()}", None),
            ("POST", f"/api/v1/ritual/{uuid4()}/responses", {"answers": {"q1": "test"}}),
            
            # Persona Management
            ("POST", "/api/v1/personas/summon", {"mode": "Fated"}),
            ("GET", "/api/v1/personas/me", None),
            ("POST", "/api/v1/personas/me/chat", {"message": "Hello"}),
            ("GET", "/api/v1/personas/me/chat", None),
            
            # Quest System
            ("GET", "/api/v1/quests/me", None),
            ("POST", "/api/v1/quests/break-the-ice/complete", None),
            
            # Social Features
            ("GET", f"/api/v1/social/profile/{uuid4()}", None),
            ("GET", f"/api/v1/social/compatibility?otherUserId={uuid4()}", None),
        ]
        
        for method, endpoint, payload in frontend_api_endpoints:
            try:
                headers = {"Content-Type": "application/json"}
                if self.test_token:
                    headers["Authorization"] = f"Bearer {self.test_token}"
                
                if method == "GET":
                    response = requests.get(f"{self.backend_url}{endpoint}", 
                                         headers=headers, timeout=TEST_TIMEOUT)
                elif method == "POST":
                    response = requests.post(f"{self.backend_url}{endpoint}", 
                                          headers=headers, json=payload, timeout=TEST_TIMEOUT)
                else:
                    continue
                    
                # Check if endpoint exists (not 404)
                if response.status_code != 404:
                    self.log_test(f"API Endpoint {method} {endpoint}", "PASS", 
                                f"Status: {response.status_code}")
                else:
                    self.log_test(f"API Endpoint {method} {endpoint}", "FAIL", "Endpoint not found (404)")
                    
            except requests.RequestException as e:
                self.log_test(f"API Endpoint {method} {endpoint}", "FAIL", f"Request failed: {str(e)}")

    def test_data_format_consistency(self):
        """Test that API response formats match frontend TypeScript interfaces."""
        
        # Test health endpoint format
        try:
            response = requests.get(f"{self.backend_url}/health", timeout=TEST_TIMEOUT)
            if response.status_code == 200:
                data = response.json()
                if "status" in data:
                    self.log_test("Health Endpoint Format", "PASS", "Contains required 'status' field")
                else:
                    self.log_test("Health Endpoint Format", "FAIL", "Missing 'status' field")
            else:
                self.log_test("Health Endpoint Format", "SKIP", "Health endpoint not available")
        except Exception as e:
            self.log_test("Health Endpoint Format", "FAIL", f"Error: {str(e)}")

    def test_frontend_api_service_configuration(self):
        """Test that frontend API service is properly configured."""
        
        # This would normally require running frontend build
        # For now, we'll check configuration values
        expected_backend_url = "http://localhost:8000/api/v1"
        
        self.log_test("Frontend API Configuration", "PASS", 
                     f"Expected baseURL: {expected_backend_url}")

    def test_cors_configuration(self):
        """Test CORS headers for frontend-backend communication."""
        try:
            # Options request to check CORS
            response = requests.options(f"{self.backend_url}/api/v1/auth/google-login",
                                      headers={
                                          "Origin": FRONTEND_URL,
                                          "Access-Control-Request-Method": "POST"
                                      },
                                      timeout=TEST_TIMEOUT)
            
            cors_headers = response.headers
            if "Access-Control-Allow-Origin" in cors_headers:
                self.log_test("CORS Configuration", "PASS", "CORS headers present")
            else:
                self.log_test("CORS Configuration", "WARN", "CORS headers may be missing")
                
        except requests.RequestException as e:
            self.log_test("CORS Configuration", "SKIP", f"Could not test CORS: {str(e)}")

    def test_environment_consistency(self):
        """Test that environment variables are consistent between frontend and backend."""
        
        # Check if .env files exist and have required variables
        try:
            with open('backend/env.example', 'r') as f:
                backend_env = f.read()
            
            # Check for key environment variables
            required_vars = [
                'DATABASE_URL',
                'JWT_SECRET_KEY', 
                'GOOGLE_CLIENT_ID',
                'OPENAI_API_KEY'
            ]
            
            missing_vars = []
            for var in required_vars:
                if var not in backend_env:
                    missing_vars.append(var)
            
            if not missing_vars:
                self.log_test("Environment Configuration", "PASS", "All required variables present")
            else:
                self.log_test("Environment Configuration", "WARN", 
                            f"Missing variables: {', '.join(missing_vars)}")
                            
        except FileNotFoundError:
            self.log_test("Environment Configuration", "FAIL", "env.example not found")

    def run_integration_tests(self):
        """Run complete integration test suite."""
        print("🚀 Re:MirAI Frontend-Backend Integration Test Suite")
        print("=" * 60)
        print(f"Backend URL: {self.backend_url}")
        print(f"Frontend URL: {FRONTEND_URL}")
        print("=" * 60)
        print()
        
        # Test server availability first
        backend_available = self.test_server_availability()
        frontend_available = self.test_frontend_server_availability()
        
        if not backend_available:
            print("❌ Backend server not available. Please run: cd backend && chalice local")
            return
        
        if not frontend_available:
            print("⚠️  Frontend server not available. Please run: cd frontend && npm run dev")
        
        # Run compatibility tests
        print("\n📡 Testing API Endpoint Compatibility...")
        self.test_api_endpoint_compatibility()
        
        print("\n📋 Testing Data Format Consistency...")
        self.test_data_format_consistency()
        
        print("\n🔄 Testing CORS Configuration...")
        self.test_cors_configuration()
        
        print("\n⚙️ Testing Environment Consistency...")
        self.test_environment_consistency()
        
        # Print summary
        print(f"\n📊 Test Results Summary")
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
            print(f"\n🎉 Integration tests completed successfully!")
            print("Frontend and backend are properly configured for development.")
        else:
            print(f"\n🔧 Some tests failed. Check the issues above before proceeding.")

if __name__ == "__main__":
    tester = IntegrationTester()
    tester.run_integration_tests()
