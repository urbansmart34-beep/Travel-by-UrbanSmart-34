import requests
import json
import time

BASE_URL = "http://localhost:8000"
EMAIL = "test_user_system@example.com"
PASSWORD = "password123"

def print_step(params):
    print(f"\n{'='*50}")
    print(f"STEP: {params}")
    print(f"{'='*50}")

def test_system():
    session = requests.Session()
    
    # 1. Sign Up / Login
    print_step("1. Authentication")
    signup_url = f"{BASE_URL}/auth/signup"
    login_url = f"{BASE_URL}/auth/login"
    
    payload = {"email": EMAIL, "password": PASSWORD, "full_name": "System Tester"}
    
    # Try login first
    print(f"Attempting login for {EMAIL}...")
    try:
        # Note: In a real app we'd use the Supabase JS client or proper auth endpoint. 
        # Since we are using Supabase directly in frontend, we might not have a backend auth endpoint exposed 
        # exactly the same way unless we built one.
        # Checking implementation... backend/app/routers/auth.py or similar?
        # A quick check of main.py showed we didn't explicitly build /auth/login in FastAPI, 
        # we rely on frontend Supabase. 
        # HOWEVER, we do have a /chatbase/token that requires a user_id.
        # Let's mock the user_id for the rest of the backend tests if we can't login via REST.
        user_id = "test_user_system_id_123" 
        print(f"Skipping direct Auth API test (handled on client). Using mock User ID: {user_id}")
    except Exception as e:
        print(f"Auth failed: {e}")
        return

    # 2. Get Trips
    print_step("2. Discovery (Get Trips)")
    res = session.get(f"{BASE_URL}/travel/trips")
    if res.status_code == 200:
        trips = res.json()
        print(f"SUCCESS: Found {len(trips)} trips.")
        if len(trips) > 0:
            trip = trips[0]
            trip_id = trip['id']
            price = trip['price']
            print(f"Selected Trip: {trip['origin']} -> {trip['destination']} (ID: {trip_id}, Price: R{price})")
        else:
            print("FAILURE: No trips found!")
            return
    else:
        print(f"FAILURE: Could not fetch trips. Status: {res.status_code}")
        print(res.text)
        return

    # 3. Chatbase Identity
    print_step("3. Chatbase Identity")
    cb_payload = {"user_id": user_id, "email": EMAIL, "name": "System Tester"}
    res = session.post(f"{BASE_URL}/chatbase/token", json=cb_payload)
    if res.status_code == 200:
        token = res.json().get("token")
        if token:
            print(f"SUCCESS: Generated Chatbase JWT: {token[:20]}...")
        else:
            print("FAILURE: No token in response.")
    else:
        print(f"FAILURE: Chatbase endpoint failed. Status: {res.status_code}")
        print(res.text)

    # 4. Process Payment
    print_step("4. Payment Processing")
    pay_payload = {
        "amount": price,
        "currency": "ZAR",
        "user_id": user_id,
        "trip_id": trip_id,
        "payment_method_id": "tok_test_123"
    }
    res = session.post(f"{BASE_URL}/payments/process", json=pay_payload)
    if res.status_code == 200:
        pay_data = res.json()
        if pay_data.get("success"):
            print(f"SUCCESS: Payment processed. Txn ID: {pay_data['transaction_id']}")
        else:
            print("FAILURE: Payment returned success=False")
    else:
        print(f"FAILURE: Payment endpoint failed. Status: {res.status_code}")
        print(res.text)

    # 5. Create Booking
    print_step("5. Create Booking")
    booking_payload = {
        "user_id": user_id,
        "trip_id": trip_id,
        "seats": 1,
        "status": "confirmed"
    }
    res = session.post(f"{BASE_URL}/travel/bookings", json=booking_payload)
    if res.status_code == 200:
        booking = res.json()
        print(f"SUCCESS: Booking created. ID: {booking.get('id')}")
        print("System Test COMPLETED SUCCESSFULLY.")
    else:
        print(f"FAILURE: Booking endpoint failed. Status: {res.status_code}")
        print(res.text)

if __name__ == "__main__":
    test_system()
