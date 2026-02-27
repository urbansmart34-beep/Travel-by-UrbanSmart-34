from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Optional
import os

router = APIRouter(
    prefix="/wallet",
    tags=["wallet"]
)

# Mock Data
MOCK_WALLET_BALANCE = {
    "available_balance": 2450.00,
    "escrowed_funds": 350.00,
    "total_earned": 5200.00,
    "earned_change": 12.5,
    "total_spent": 1100.00,
    "spent_change": -5.0,
    "trips_completed": 12,
    "upcoming_trips": 2
}

MOCK_TRANSACTIONS = [
    {
        "id": "TX-1",
        "date": "Oct 24, 2023",
        "time": "14:30 PM",
        "description": "Trip Payment - #TR-8821",
        "sub_description": "Carpool: Sandton to Midrand",
        "type": "Earnings",
        "status": "Completed",
        "amount": "+ R 450.00",
        "icon": "local_taxi",
        "icon_color": "blue"
    },
    {
        "id": "TX-2",
        "date": "Oct 22, 2023",
        "time": "09:15 AM",
        "description": "Ride Payment - #TR-8805",
        "sub_description": "Ride: Centurion to Pretoria",
        "type": "Spending",
        "status": "Completed",
        "amount": "- R 120.00",
        "icon": "shopping_cart",
        "icon_color": "slate"
    },
    {
        "id": "TX-3",
        "date": "Oct 20, 2023",
        "time": "11:00 AM",
        "description": "Wallet Top-Up",
        "sub_description": "Credit Card **** 4242",
        "type": "Deposit",
        "status": "Success",
        "amount": "+ R 1,000.00",
        "icon": "add_card",
        "icon_color": "teal"
    },
    {
        "id": "TX-4",
        "date": "Oct 18, 2023",
        "time": "16:45 PM",
        "description": "Trip Escrow - #TR-8830",
        "sub_description": "Funds held for Trip #8830",
        "type": "Escrow Hold",
        "status": "Pending",
        "amount": "(R 350.00)",
        "icon": "timelapse",
        "icon_color": "orange"
    },
    {
        "id": "TX-5",
        "date": "Oct 15, 2023",
        "time": "08:00 AM",
        "description": "Bank Withdrawal",
        "sub_description": "Transfer to FNB Acc ...8901",
        "type": "Withdrawal",
        "status": "Completed",
        "amount": "- R 2,000.00",
        "icon": "account_balance",
        "icon_color": "slate"
    }
]

@router.get("/balance")
def get_wallet_balance():
    """Returns the current user's wallet balance and aggregated statistics."""
    # In a real implementation, we would query the `wallets` table in Supabase 
    # using the authenticated user's ID.
    return MOCK_WALLET_BALANCE

@router.get("/transactions")
def get_transactions(type: Optional[str] = None):
    """Returns a list of transactions for the current user's wallet."""
    # In a real implementation, we would query the `transactions` table in Supabase
    # using the authenticated user's wallet_id, and apply filters based on `type`.
    
    if type and type != "All":
        filtered = [tx for tx in MOCK_TRANSACTIONS if tx["type"] == type or (type == "Earnings" and tx["type"] == "Deposit")]
        return filtered
    
    return MOCK_TRANSACTIONS
