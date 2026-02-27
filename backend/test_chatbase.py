import requests
import json

url = "http://localhost:8000/chatbase/token"
headers = {"Content-Type": "application/json"}
data = {
    "user_id": "test_user_123",
    "email": "test@example.com",
    "name": "Test User"
}

try:
    response = requests.post(url, headers=headers, json=data)
    print(f"Status Code: {response.status_code}")
    print("Response JSON:")
    print(json.dumps(response.json(), indent=2))
except Exception as e:
    print(f"Error: {e}")
