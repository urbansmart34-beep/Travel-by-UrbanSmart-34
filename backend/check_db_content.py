import os
import sys

# Add current directory to sys.path to allow 'app' imports
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from dotenv import load_dotenv
from app.services.supabase_rest import create_client, Client

# Load env
base_dir = os.path.dirname(os.path.abspath(__file__)) # backend
env_path = os.path.join(base_dir, "config", ".env.development")
print(f"Loading env from: {env_path}")
load_dotenv(dotenv_path=env_path)

url = os.environ.get("SUPABASE_URL")
key = os.environ.get("SUPABASE_KEY")

print(f"URL: {url}")
# Mask key for log safety
print(f"Key: {key[:5]}...{key[-5:] if key else 'None'}")

if not url or not key:
    print("Error: Missing credentials")
    exit(1)

client = create_client(url, key)

print("\n--- Checking Users ---")
try:
    # note: service_role key is needed to list users usually, but let's see what we can see
    # or just try to insert a trip with a dummy ID if RLS allows or we have anonymous policies
    print("Skipping user list (requires admin key usually)")
except Exception as e:
    print(f"Error: {e}")

print("\n--- Checking Trips ---")
try:
    response = client.table("trips").select("*").execute()
    trips = response.data
    print(f"Found {len(trips)} trips.")
    for t in trips:
        print(f"- {t.get('origin')} -> {t.get('destination')} ({t.get('date')})")
        
    if len(trips) == 0:
        print("\nAttempting to INSERT a test trip...")
        # We need a user_id. If RLS is loose or we have a test user... 
        # Actually, we can't insert easily without a valid user session if RLS is 'auth.uid() = user_id'
        # UNLESS we turned off RLS or have a policy allowing anon inserts (unlikely/bad).
        # However, earlier I asked the user to run SQL.
        
        # Let's try to query profiles to get a valid user ID to try and spoof/use?
        # Or just tell the user specific SQL to run again if it's empty.
        pass

except Exception as e:
    print(f"Error fetching trips: {e}")
