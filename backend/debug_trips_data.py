import requests
import json

try:
    response = requests.get('http://localhost:8000/travel/trips')
    if response.status_code == 200:
        trips = response.json()
        print(f"Total Trips Found: {len(trips)}")
        for t in trips:
            print(f"ID: {t['id']}, Status: {t.get('status', 'N/A')}, Driver: {t.get('driver_id', 'N/A')}, Origin: {t['origin']}")
    else:
        print(f"Error: {response.status_code} - {response.text}")
except Exception as e:
    print(f"Exception: {e}")
