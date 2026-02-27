import requests
import json

try:
    response = requests.get('http://localhost:8000/travel/trips')
    if response.status_code == 200:
        trips = response.json()
        print(f"Total Trips: {len(trips)}")
        print("-" * 50)
        for t in trips:
            print(f"ID: {t['id']}")
            print(f"Status: '{t.get('status')}'")
            print(f"Driver ID: {t.get('driver_id')}")
            print(f"Date: {t.get('date')}")
            print("-" * 20)
    else:
        print(f"Error: {response.status_code}")
except Exception as e:
    print(f"Exception: {e}")
