import requests
import sys

BASE_URL = "http://localhost:8000"

def test_endpoint(name, url, method="GET", payload=None):
    try:
        if method == "GET":
            response = requests.get(url)
        else:
            response = requests.post(url, json=payload)
        
        if response.status_code == 200:
            print(f"[PASS] {name}: {response.status_code}")
            return True
        else:
            print(f"[FAIL] {name}: {response.status_code} - {response.text}")
            return False
    except Exception as e:
        print(f"[ERROR] {name}: {str(e)}")
        return False

def main():
    print("Starting Backend Verification...")
    
    # 1. Health Check
    test_endpoint("Root Health", f"{BASE_URL}/")
    test_endpoint("Detailed Health", f"{BASE_URL}/health")

    # 2. Travel Endpoints
    # Assuming prefix is /travel based on previous work, but verifying
    test_endpoint("Search Flights", f"{BASE_URL}/travel/flights?origin=JNB&destination=CPT&date=2026-02-15")
    test_endpoint("Search Trips", f"{BASE_URL}/travel/trips?from_loc=JNB&to_loc=PTA&date=2026-02-15")
    
    # 3. AI Endpoints (Mock Chat)
    # Payload matching Minimax message structure
    chat_payload = {
        "messages": [
            {"role": "user", "content": "Hello, are there any rides to Durban?"}
        ]
    }
    test_endpoint("AI Chat", f"{BASE_URL}/ai/chat", method="POST", payload=chat_payload)

if __name__ == "__main__":
    main()
