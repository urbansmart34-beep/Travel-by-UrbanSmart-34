import os
import sys
from dotenv import load_dotenv

# Add user site-packages to sys.path to fix ModuleNotFoundError
# pip installed packages here: C:\Users\makhu\AppData\Roaming\Python\Python314\site-packages
user_site_packages = r"C:\Users\makhu\AppData\Roaming\Python\Python314\site-packages"
if user_site_packages not in sys.path:
    sys.path.append(user_site_packages)

# Add current directory to sys.path to allow 'app' imports
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Use local Supabase REST client to avoid 'pyiceberg' dependency issues
from app.services.supabase_rest import create_client, Client

# Load env
base_dir = os.path.dirname(os.path.abspath(__file__)) # backend
env_path = os.path.join(base_dir, "config", ".env.development")
print(f"Loading env from: {env_path}")
load_dotenv(dotenv_path=env_path)

url = os.environ.get("SUPABASE_URL")
key = os.environ.get("SUPABASE_KEY")

if not url or not key:
    print("Error: Missing credentials")
    exit(1)

client = create_client(url, key)

print("Seeding test trips...")

try:
    # 1. Get a user ID (any user) to assign trips to, or create a dummy one if allowable by RLS
    # For now, we try to insert with a hardcoded or fetched user_id. 
    # If RLS requires auth.uid() == user_id, we might fail unless we use a SERVICE ROLE key (which we don't have in .env, typically)
    # OR if we have a user in the table.
    
    # Try to fetch a user? (Usually constrained).
    # Plan B: Insert with a specific UUID and hope RLS on 'insert' allows it or is disabled for this test.
    # We previously set RLS to: create policy "Users can insert own bookings." 
    # BUT for trips? 
    # "Public can view trips" is set. 
    # We didn't set an INSERT policy for trips in the latest scripts. 
    # If no INSERT policy exists on enabled RLS table, NO ONE can insert.
    # Unless we run the SQL to add a policy.
    
    # Let's try to insert.
    user_id = "00000000-0000-0000-0000-000000000000" # Dummy
    
    trips = [
        {
            "user_id": user_id,
            "origin": "Johannesburg",
            "destination": "Durban",
            "date": "2026-02-15",
            "time": "08:00",
            "price": 450.00,
            "seats_available": 3,
            "vehicle": "Toyota Fortuner",
            "driver_name": "Thabo Mbeki",
            "driver_rating": 4.9,
            "status": "planned",
            "title": "Jozi to Durbs Weekend"
        },
        {
            "user_id": user_id,
            "origin": "Cape Town",
            "destination": "Stellenbosch",
            "date": "2026-02-16",
            "time": "09:30",
            "price": 150.00,
            "seats_available": 2,
            "vehicle": "VW Polo",
            "driver_name": "Sarah Johnson",
            "driver_rating": 4.8,
            "status": "planned",
            "title": "Winelands Tour"
        }
    ]
    
    for trip in trips:
        result = client.table("trips").insert(trip).execute()
        if result.data:
            print(f"Inserted: {trip['origin']} -> {trip['destination']}")
        else:
            print(f"FAILED to insert: {trip['origin']} -> {trip['destination']}")

except Exception as e:
    print(f"Error seeding data: {e}")
    print("If error is about RLS or permissions, please run the SQL script in Supabase Dashboard.")
