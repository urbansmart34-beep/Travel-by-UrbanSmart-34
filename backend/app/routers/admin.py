from fastapi import APIRouter, HTTPException, Depends
from datetime import datetime
from pydantic import BaseModel
from typing import List, Dict, Any

import os
from app.services.supabase_rest import SupabaseTable

router = APIRouter(prefix="/admin", tags=["admin"])


# NOTE: In a production app, we would verify the user is actually an admin role.
# For the prototype, we assume any authenticated user hitting these endpoints is authorized.

@router.get("/dashboard/stats")
def get_dashboard_stats():
    """
    Returns aggregated stats for the admin command center.
    This includes active trips, today's bookings, revenue, and pending issues.
    """
    # Initialize values
    active_trips = 0
    todays_bookings = 0
    revenue_est = 0
    pending_issues = 0
    
    supabase_url = os.getenv("SUPABASE_URL")
    supabase_key = os.getenv("SUPABASE_KEY")

    # 1. Active Trips: Count trips where status = 'in_progress'
    try:
        trips_table = SupabaseTable(supabase_url, supabase_key, "trips")
        trips_response = trips_table.select("id").eq("status", "in_progress").execute()
        if trips_response and getattr(trips_response, "status_code", 200) == 200:
             active_trips = len(trips_response.json())
    except Exception as e:
        print(f"Error fetching active trips: {e}")

    # 2. Today's Bookings: Count bookings created today
    today_str = datetime.utcnow().strftime('%Y-%m-%d')
    try:
        bookings_table = SupabaseTable(supabase_url, supabase_key, "bookings")
        bookings_table.params["created_at"] = f"gte.{today_str}T00:00:00Z"
        bookings_response = bookings_table.select("id, total_price").execute()
        
        if bookings_response and getattr(bookings_response, "status_code", 200) == 200:
             data = bookings_response.json()
             todays_bookings = len(data)
             # 3. Revenue Est: Sum of total_price for today's bookings
             revenue_est = sum([float(b.get('total_price', 0)) for b in data])
    except Exception as e:
         print(f"Error fetching today's bookings: {e}")

    # 4. Pending Issues: Count support_tickets where status != 'Closed'
    try:
        tickets_table = SupabaseTable(supabase_url, supabase_key, "support_tickets")
        tickets_table.params["status"] = "neq.Closed"
        issues_response = tickets_table.select("id").execute()
        if issues_response and getattr(issues_response, "status_code", 200) == 200:
             pending_issues = len(issues_response.json())
    except Exception as e:
         print(f"Error fetching pending issues: {e}")
         # Mock fallback if the table doesn't exist yet
         pending_issues = 7

    return {
        "activeTrips": active_trips,
        "activeTripsTrend": 12, # Mock trend
        "todaysBookings": todays_bookings,
        "todaysBookingsTrend": 8, # Mock trend
        "revenueEst": revenue_est,
        "revenueTrend": -2, # Mock trend
        "pendingIssues": pending_issues
    }

@router.get("/issues")
def get_recent_issues():
     """
     Returns a list of recent support tickets/disputes.
     """
     try:
         supabase_url = os.getenv("SUPABASE_URL")
         supabase_key = os.getenv("SUPABASE_KEY")
         tickets_table = SupabaseTable(supabase_url, supabase_key, "support_tickets")
         tickets_table.params["order"] = "created_at.desc"
         tickets_table.params["limit"] = "10"
         issues_response = tickets_table.select().execute()
         
         if issues_response and getattr(issues_response, "status_code", 200) == 200:
             issues = issues_response.json()
             # We want to format this for the frontend table
             formatted_issues = []
             for issue in issues:
                 formatted_issues.append({
                     "id": str(issue.get("id"))[:8], # Send short ID
                     "full_id": issue.get("id"),
                     "type": issue.get("type"),
                     "status": issue.get("status"),
                     "user_id": issue.get("user_id"),
                     # We would ideally join the users table here to get the name
                     "user_name": "User",
                     "user_initial": "U",
                     "created_at": issue.get("created_at")
                 })
             return formatted_issues
     except Exception as e:
         print(f"Error fetching issues: {e}")
         
     # Fallback mock data if table uncreated
     return [
         { "id": "DSP-293", "user_name": "Sarah J.", "user_initial": "S", "type": "Refund Request", "status": "New" },
         { "id": "VER-004", "user_name": "Mike T.", "user_initial": "M", "type": "Driver Verification", "status": "Reviewing" },
         { "id": "DSP-291", "user_name": "Alex R.", "user_initial": "A", "type": "Harassment Report", "status": "Urgent" }
     ]

@router.get("/logs")
def get_recent_logs():
     """
     Returns a list of recent system logs for the activity feed.
     """
     try:
         supabase_url = os.getenv("SUPABASE_URL")
         supabase_key = os.getenv("SUPABASE_KEY")
         logs_table = SupabaseTable(supabase_url, supabase_key, "system_logs")
         logs_table.params["order"] = "created_at.desc"
         logs_table.params["limit"] = "10"
         logs_response = logs_table.select().execute()
         
         if logs_response and getattr(logs_response, "status_code", 200) == 200:
             return logs_response.json()
     except Exception as e:
         print(f"Error fetching logs: {e}")
         
     # Fallback mock data
     return [
         { "id": "1", "event_type": "System", "message": "Fallback: Could not connect to database.", "created_at": "Just now" }
     ]

@router.get("/disputes")
def get_disputes():
    """Returns a list of disputes."""
    try:
        supabase_url = os.getenv("SUPABASE_URL")
        supabase_key = os.getenv("SUPABASE_KEY")
        tickets_table = SupabaseTable(supabase_url, supabase_key, "support_tickets")
        tickets_table.params["type"] = "eq.Dispute"
        tickets_table.params["order"] = "created_at.desc"
        response = tickets_table.select().execute()
        if response and getattr(response, "status_code", 200) == 200:
            return response.json()
    except Exception as e:
        print(f"Error fetching disputes: {e}")
        
    return [
        { "id": "DS-9982", "user_name": "Sarah Smith", "user_initial": "S", "type": "Dispute", "status": "Under Review", "created_at": "2 hours ago" },
        { "id": "DS-9981", "user_name": "Marcus Cole", "user_initial": "M", "type": "Dispute", "status": "Pending", "created_at": "1 day ago" }
    ]

@router.get("/disputes/{dispute_id}")
def get_dispute_detail(dispute_id: str):
    """Returns details for a specific dispute."""
    return {
        "id": dispute_id,
        "type": "Non-arrival Complaint",
        "status": "Under Review",
        "created_at": "2 hours ago",
        "reason": "Driver didn't show up at the pickup point, waited 20 mins.",
        "trip_id": "TR-8821",
        "trip_cost": 45.50,
        "commuter": {
            "name": "Sarah Smith",
            "rating": 4.9,
            "trips": 42,
            "membership": "Premium"
        },
        "driver": {
            "name": "John Doe",
            "rating": 4.8,
            "trips": 124,
            "vehicle": "Honda Civic • AB-123-CD"
        },
        "timeline": [
            { "time": "14:00 PM", "title": "Booking Confirmed", "desc": "Trip scheduled from Downtown to Airport.", "icon": "calendar_today" },
            { "time": "14:15 PM", "title": "Driver Arrived at Zone", "desc": "GPS coordinates match pickup zone radius.", "icon": "near_me" },
            { "time": "14:35 PM", "title": "Booking Cancelled", "desc": "Cancelled by Commuter. Reason: 'Driver not found'.", "icon": "cancel" }
        ],
        "chat_logs": [
            { "sender": "commuter", "message": "I'm at the main entrance, where are you?", "time": "14:20 PM" },
            { "sender": "driver", "message": "I'm waiting near the Starbucks sign. Hazard lights are on.", "time": "14:22 PM" },
            { "sender": "commuter", "message": "I don't see any Starbucks here. Are you at terminal 2?", "time": "14:24 PM" }
        ]
    }

class DisputeResolution(BaseModel):
    action: str  # 'force_refund', 'release_payment', 'partial_refund'
    note: str

@router.post("/disputes/{dispute_id}/resolve")
def resolve_dispute(dispute_id: str, payload: DisputeResolution):
    """Resolve a dispute based on admin action."""
    return {"status": "success", "message": f"Dispute {dispute_id} resolved with action: {payload.action}", "note": payload.note}
