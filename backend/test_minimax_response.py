import requests
import json

url = "http://localhost:8000/ai/chat"
payload = {
    "messages": [{"role": "user", "content": "Hello, plan a trip to Durban."}],
    "model": "abab6.5-chat",
    "temperature": 0.7
}

try:
    response = requests.post(url, json=payload)
    print(f"Status Code: {response.status_code}")
    try:
        data = response.json()
        print("Response JSON:")
        print(json.dumps(data, indent=2))
        
        # simulated frontend check
        if "choices" in data and len(data["choices"]) > 0:
            print("\nFrontend would succeed reading choices[0]")
        elif "reply" in data:
            print("\nFrontend would succeed reading reply")
        else:
            print("\nFrontend would FAIL (missing choices[0] and reply)")
            
    except Exception as e:
        print(f"Failed to parse JSON: {e}")
        print(f"Raw text: {response.text}")
except Exception as e:
    print(f"Request failed: {e}")
