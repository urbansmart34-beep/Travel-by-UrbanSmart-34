import os
from dotenv import load_dotenv

# Use our custom REST wrapper to avoid dependency hell
from app.services.supabase_rest import create_client, Client

# Load environment variables (if not already loaded)
# load_dotenv() 

url: str = os.getenv("SUPABASE_URL")
key: str = os.getenv("SUPABASE_KEY")
service_role_key: str = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

supabase = None
supabase_admin = None

if url and key:
    supabase = create_client(url, key)
    print("Supabase REST Client initialized.")

if url and service_role_key:
    supabase_admin = create_client(url, service_role_key)
    print("Supabase Admin Client initialized (Service Role).")
else:
    print("Warning: Service Role Key missing. Admin features (bookings) may fail.")
