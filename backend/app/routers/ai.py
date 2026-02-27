from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.gemini import chat_completion
from app.services.supabase_client import supabase  # Import the shared client

router = APIRouter(
    prefix="/ai",
    tags=["ai"],
    responses={404: {"description": "Not found"}},
)

class ChatRequest(BaseModel):
    messages: list
    model: str = "gemini-1.5-flash"
    temperature: float = 0.7

@router.post("/chat")
async def chat(request: ChatRequest):
    """
    Proxy chat requests to Gemini API, injecting real trip data context.
    """
    
    # 1. Fetch available trips from Supabase
    trips_context = "No trips currently available."
    try:
        if supabase:
            response = supabase.table("trips").select("*").execute()
            trips = response.data
            
            if trips:
                trip_list = []
                for t in trips:
                    # Provide key details for the AI
                    trip_str = f"- From {t.get('origin')} to {t.get('destination')} on {t.get('date')} at {t.get('time')}. Price: R{t.get('price')}. Vehicle: {t.get('vehicle')}. Driver: {t.get('driver_name')}."
                    trip_list.append(trip_str)
                trips_context = "Available Trips:\n" + "\n".join(trip_list)
    except Exception as e:
        print(f"Error fetching trips for AI context: {e}")
        # Continue without context if DB fails
        pass

    # 2. Construct System Message
    system_prompt = f"""
You are an expert Travel Assistant for 'Travel by UrbanSmart-34'.
Your goal is to help users find and book trips based on the REAL data provided below.

{trips_context}

RULES:
1. ONLY recommend trips listed above. from the 'Available Trips' list.
2. If a user asks for a route not listed, politely say you don't have drivers for that route yet.
3. Be friendly, concise, and helpful.
4. Prices are in ZAR (R).
5. If asked to book, guide them to click the 'book' button on the trip details page (you cannot book directly).
"""

    # 3. Handle System Roles for Gemini (handled internally in our wrapper)
    context_messages = [{"role": "system", "content": system_prompt}] + request.messages

    # 4. Call Gemini
    response = chat_completion(
        messages=context_messages,
        model=request.model,
        temperature=request.temperature
    )
    
    if "error" in response:
        raise HTTPException(status_code=500, detail=response["error"])
        
    return response
