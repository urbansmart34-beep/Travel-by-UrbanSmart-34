import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv("config/.env.development")

url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_KEY")

if not url or not key:
    print("Supabase credentials missing.")
    exit(1)

supabase: Client = create_client(url, key)

print("Since we can't reliably run raw DDL via the supabase-py client (it uses PostgREST which doesn't support raw SQL),")
print("and psql is not installed, you will need to run the following SQL script directly in the Supabase SQL Editor.")
print("\n--- COPY THE SQL BELOW THIS LINE ---")
with open('add_admin_tables.sql', 'r') as f:
    print(f.read())
print("--- END OF SQL ---")
