import sys
import os

# Add user site-packages to sys.path to fix ModuleNotFoundError
# Using hardcoded path to ensure reliability across reloads
user_site_packages = r"C:\Users\makhu\AppData\Roaming\Python\Python314\site-packages"
if user_site_packages not in sys.path:
    sys.path.append(user_site_packages)

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

# Load environment variables from config
# app/main.py -> backend/app/main.py
# Env is in backend/config/.env.development
base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__))) # backend/
env_path = os.path.join(base_dir, "config", ".env.development")
print(f"Loading env from: {env_path}")
load_dotenv(dotenv_path=env_path)

from app.routers import travel, ai, payments, chatbase, admin, wallet

app = FastAPI(title="UrbanSmart-34 Travel API")

app.include_router(travel.router)
app.include_router(ai.router)
app.include_router(payments.router)
app.include_router(chatbase.router)
app.include_router(admin.router)
app.include_router(wallet.router)
# Configure CORS
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "UrbanSmart-34 Travel API is running"}

@app.get("/health")
def health_check():
    return {"status": "ok", "minimax_configured": bool(os.getenv("MINIMAX_API_KEY"))}
