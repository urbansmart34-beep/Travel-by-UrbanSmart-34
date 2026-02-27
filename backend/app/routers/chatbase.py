import jwt
import time
import os
from dotenv import load_dotenv
from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel

# Explicitly load .env to ensure keys are available even if main.py hasn't run yet or logic differs
# __file__ = backend/app/routers/chatbase.py
# dirname -> backend/app/routers
# dirname -> backend/app
# dirname -> backend
# dirname -> Travel 2.0 (ROOT)
env_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(__file__)))), "config", ".env.development")
print(f"DEBUG: Loading env from {env_path}")
load_dotenv(env_path)
print(f"DEBUG: CHATBASE_SECRET_KEY is: {os.getenv('CHATBASE_SECRET_KEY')}")

from app.services.supabase_client import supabase  # or use standard Depends user auth

router = APIRouter(
    prefix="/chatbase",
    tags=["chatbase"],
)

class IdentityRequest(BaseModel):
    user_id: str
    email: str = None
    name: str = None

@router.post("/token")
def generate_identity_token(request: IdentityRequest):
    """
    Generate JWT for Chatbase Identity Verification.
    """
    secret_key = os.getenv("CHATBASE_SECRET_KEY")
    
    if not secret_key:
        print("ERROR: Chatbase Secret Key not configured")
        raise HTTPException(status_code=500, detail="Chatbase Secret Key not configured")
        
    if not request.user_id:
         raise HTTPException(status_code=400, detail="User ID is required")

    # Construct Payload
    payload = {
        "user_id": request.user_id,
        "email": request.email,
        "name": request.name,
        "exp": int(time.time()) + 3600  # Token expires in 1 hour
    }

    try:
        # Encode JWT
        token = jwt.encode(payload, secret_key, algorithm="HS256")
        return {"token": token}
    except Exception as e:
        print(f"JWT Generation Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))
