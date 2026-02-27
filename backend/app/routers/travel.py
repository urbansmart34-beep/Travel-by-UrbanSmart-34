from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel, Field
from typing import List, Optional
import random
from app.services.supabase_client import supabase, supabase_admin


router = APIRouter(
    prefix="/travel",
    tags=["travel"],
)

# --- Models ---
class Trip(BaseModel):
    id: str
    user_id: Optional[str] = None
    origin: str
    destination: str
    date: str
    time: str
    price: float
    seats_available: int
    vehicle: str
    driver_name: str
    driver_rating: float
    driver_image: str
    
    # Optional fields for compatibility with frontend expectations if they differ
    title: Optional[str] = None

class BookingRequest(BaseModel):
    trip_id: str
    user_id: str

class BookingResponse(BaseModel):
    id: str
    status: str
    message: str

# --- Endpoints ---

@router.get("/trips", response_model=List[Trip])
def search_trips(
    from_loc: Optional[str] = None, 
    to_loc: Optional[str] = None, 
    date: Optional[str] = None,
    driver_id: Optional[str] = None
):
    """
    Search for trips in Supabase.
    """
    if not supabase:
        raise HTTPException(status_code=503, detail="Database connection unavailable")

    try:
        # Start building the query
        query = supabase.table("trips").select("*")
        
        # Apply filters if provided
        # Note: 'ilike' is case-insensitive matching
        if from_loc:
            query = query.ilike("origin", f"%{from_loc}%")
        if to_loc:
            query = query.ilike("destination", f"%{to_loc}%")
        if date:
            query = query.eq("date", date)
        if driver_id:
            query = query.eq("driver_id", driver_id)
            
        # Execute query
        response = query.execute()
        
        # Transform data to match Pydantic model if necessary
        # Assuming table columns match model fields 1:1 for now
        trips_data = response.data
        
        # Fallback/Mock for required fields if missing in DB (temporary)
        for trip in trips_data:
            if "driver_name" not in trip: trip["driver_name"] = "Urban Driver"
            if "driver_rating" not in trip: trip["driver_rating"] = 4.8
            if "vehicle" not in trip: trip["vehicle"] = "Sedan"
            if "price" not in trip: trip["price"] = 0.0
            if "seats_available" not in trip: trip["seats_available"] = 4
            if "driver_image" not in trip or not trip["driver_image"]: 
                trip["driver_image"] = f"https://i.pravatar.cc/150?u={trip.get('driver_name', 'driver')}"
            
        return trips_data

    except Exception as e:
        print(f"Error fetching trips: {e}")
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/trips/{trip_id}", response_model=Trip)
def get_trip(trip_id: str):
    """
    Get a single trip by ID.
    """
    if not supabase:
        raise HTTPException(status_code=503, detail="Database connection unavailable")

    try:
        response = supabase.table("trips").select("*").eq("id", trip_id).execute()
        
        if not response.data:
            raise HTTPException(status_code=404, detail="Trip not found")
            
        trip = response.data[0]
        
        # Fallback/Mock for required fields (same as search)
        if "driver_name" not in trip: trip["driver_name"] = "Urban Driver"
        if "driver_rating" not in trip: trip["driver_rating"] = 4.8
        if "vehicle" not in trip: trip["vehicle"] = "Sedan"
        if "price" not in trip: trip["price"] = 0.0
        if "seats_available" not in trip: trip["seats_available"] = 4
        if "driver_image" not in trip or not trip["driver_image"]: 
            trip["driver_image"] = f"https://i.pravatar.cc/150?u={trip.get('driver_name', 'driver')}"
        
        return trip

    except Exception as e:
        print(f"Error fetching trip {trip_id}: {e}")
        # If it's already an HTTP exception, re-raise it
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(status_code=500, detail=str(e))

class TripStatusUpdate(BaseModel):
    status: str = Field(..., pattern="^(scheduled|in_progress|completed|cancelled)$")

@router.patch("/trips/{trip_id}/status")
def update_trip_status(trip_id: str, update: TripStatusUpdate):
    """
    Update the status of a trip (e.g., scheduled -> in_progress -> completed).
    """
    if not supabase:
        raise HTTPException(status_code=503, detail="Database connection unavailable")

    try:
        # Use ADMIN client to allow updates if RLS blocks standard users
        client = supabase_admin if supabase_admin else supabase
        response = client.table("trips").update({"status": update.status}).eq("id", trip_id).execute()
        
        if not response.data:
             raise HTTPException(status_code=404, detail="Trip not found or update failed")
             
        return {"message": "Trip status updated", "trip": response.data[0]}

    except Exception as e:
        print(f"Error updating trip status: {e}")
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/trips/{trip_id}/passengers")
def get_trip_passengers(trip_id: str):
    """
    Get the passenger manifest for a trip.
    """
    if not supabase:
        raise HTTPException(status_code=503, detail="Database connection unavailable")

    try:
        # Fetch bookings for this trip
        # Ideally we join with 'profiles' to get names, 
        # but standard RLS might block profiles view. 
        # For now, we return bookings and hope frontend can handle user_id display,
        # or we assume 'bookings' table has some passenger info if we added it.
        # Actually, let's try to join but fallback safely.
        client = supabase_admin if supabase_admin else supabase
        response = client.table("bookings").select("*").eq("trip_id", trip_id).execute()
        
        return response.data

    except Exception as e:
        print(f"Error fetching passengers: {e}")
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/bookings", response_model=BookingResponse)
def create_booking(booking: BookingRequest):
    """
    Create a new booking in Supabase.
    """
    if not supabase:
        raise HTTPException(status_code=503, detail="Database connection unavailable")

    try:
        # 1. Verify trip availability (optional enhancement: check seats)
        
        # 2. Insert booking using ADMIN client to bypass RLS (if acting on behalf of user)
        # OR if we trust the user_id sent in request matching auth.uid() we could use 'supabase' 
        # but 'supabase' here is static server-side client with anon key usually. 
        # Server-side 'anon' client cannot INSERT for a user unless we pass their JWT.
        # Since we are not forwarding the user's JWT in this specific REST wrapper setup easily,
        # we use Service Role to write 'as' the system, trusting the endpoint logic.
        
        data = {
            "trip_id": booking.trip_id,
            "user_id": booking.user_id,
            "status": "confirmed"
        }
        
        result = supabase_admin.table("bookings").insert(data).execute()
        
        if not result.data:
             print(f"Supabase Insert Error: {result}") # result object might contain error info depending on wrapper
             raise HTTPException(status_code=400, detail="Failed to create booking")

        return {
            "id": result.data[0]["id"],
            "status": "confirmed",
            "message": "Booking successful!"
        }

    except Exception as e:
        print(f"Error creating booking: {e}")
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/bookings", response_model=List[dict])
def get_my_bookings(user_id: str):
    """
    Get all bookings for a user, including trip details.
    """
    if not supabase:
        raise HTTPException(status_code=503, detail="Database connection unavailable")

    try:
        # Fetch bookings and join with trips table
        # PostgREST syntax for joining: select=*,trips(*)
        # Use ADMIN to assume backend trust (since we lack user JWT forwarding in this prototype)
        client = supabase_admin if supabase_admin else supabase
        response = client.table("bookings").select("*,trips(*)").eq("user_id", user_id).execute()
        
        data = response.data
        if data is None:
            return []
        return data

    except Exception as e:
        print(f"Error fetching bookings: {e}")
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/flights")
def search_flights():
    return [] # Placeholder

@router.get("/hotels")
def search_hotels():
    return [] # Placeholder
