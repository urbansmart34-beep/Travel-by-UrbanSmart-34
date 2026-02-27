import os
import requests
import logging
from dotenv import load_dotenv

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load env if not already loaded
env_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "config", ".env.development")
load_dotenv(env_path)

MINIMAX_API_KEY = os.getenv("MINIMAX_API_KEY")
MINIMAX_GROUP_ID = os.getenv("MINIMAX_GROUP_ID")
MINIMAX_API_URL = os.getenv("MINIMAX_API_URL", "https://api.minimax.chat/v1")

def get_smart_mock_response(messages):
    """
    Generates a context-aware mock response based on the LAST user message and SYSTEM context.
    """
    import random
    
    # Check for system context (trip data)
    system_content = ""
    user_content = ""
    
    for msg in messages:
        if msg.get("role") == "system":
            system_content = msg.get("content", "")
        if msg.get("role") == "user":
            user_content = msg.get("content", "").lower() # Get the last user message
            
    # Simple keyword matching against the injected system context or user query
    
    reply = ""
    
    if "durban" in user_content:
        if "Durban" in system_content:
            # Try to extract specific trip details from system content if possible, or just give a generic "yes"
            # Since parsing natural language is hard without AI, we'll give a positive generic answer referencing the data
            reply = "Yes, I see a trip to Durban available! It's departing tomorrow morning. Check the details above or in the search results."
        else:
            reply = "I checked the schedule, but I don't see any trips to Durban right now. Please try searching for another destination like Cape Town."
            
    elif "cape town" in user_content:
        if "Cape Town" in system_content:
             reply = "We have a trip to Cape Town! It's a great route. You can book it directly through the app."
        else:
             reply = "No trips to Cape Town listed at the moment, but check back later!"
             
    elif "price" in user_content or "cost" in user_content:
        reply = "Our trips are very affordable. You can see the exact price listed on the trip card. Usually it's around R1.50 per km."
        
    elif "hello" in user_content or "hi" in user_content:
        reply = "Hello! I'm your Travel Assistant. I can help you find trips. ask me 'Are there trips to Durban?'"
        
    else:
        # Fallback to a generic response
        if "Available Trips" in system_content:
             reply = "I can see the available trips listed in my system. Which one are you interested in? (I'm in Demo Mode, but I can see the real data!)"
        else:
             reply = "I'm currently running in Offline Demo Mode. Please ask about trip destinations to see how I can help."

    return {
        "reply": reply,
        "choices": [{"message": {"content": reply}}]
    }

def chat_completion(messages, model="abab6.5-chat", temperature=0.7, tokens_to_generate=None):
    """
    Sends a chat completion request to the Minimax API.
    FALLBACK to smart mock if API fails.
    """
    # 1. Check Credentials
    if not MINIMAX_API_KEY or not MINIMAX_GROUP_ID or "your_minimax" in MINIMAX_API_KEY:
        logger.warning("Minimax API Key missing/invalid. Using Smart Mock.")
        return get_smart_mock_response(messages)

    url = f"{MINIMAX_API_URL}/text/chatcompletion_v2"
    
    headers = {
        "Authorization": f"Bearer {MINIMAX_API_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "model": model,
        "messages": messages,
        "temperature": temperature,
        "group_id": MINIMAX_GROUP_ID
    }
    
    if tokens_to_generate:
        payload["tokens_to_generate"] = tokens_to_generate

    try:
        response = requests.post(url, headers=headers, json=payload, timeout=30)
        response.raise_for_status()
        response_json = response.json()
        
        # 2. Check for API-level errors (e.g., invalid key returned as success HTTP code but error body)
        if "base_resp" in response_json and response_json["base_resp"].get("status_code", 0) != 0:
             error_msg = response_json["base_resp"].get("status_msg", "Unknown API Error")
             logger.error(f"Minimax API Error: {error_msg}. Falling back to Smart Mock.")
             return get_smart_mock_response(messages)
        
        return response_json
        
    except Exception as e:
        logger.error(f"Minimax Connection Error: {e}. Falling back to Smart Mock.")
        return get_smart_mock_response(messages)
