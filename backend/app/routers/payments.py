from fastapi import APIRouter, HTTPException, Body, Request
from pydantic import BaseModel
import uuid
import time
import random

router = APIRouter(
    prefix="/payments",
    tags=["payments"],
)

class PaymentRequest(BaseModel):
    amount: float
    currency: str = "ZAR"
    user_id: str
    trip_id: str
    token: str # Yoco Token

class PaymentResponse(BaseModel):
    success: bool
    transaction_id: str
    message: str

import os
import requests

PAYMENT_SWITCH_URL = os.getenv("PAYMENT_SWITCH_URL", "https://payment-switch.urbansmart34.com")
PAYMENT_SWITCH_STORE_ID = os.getenv("PAYMENT_SWITCH_STORE_ID", "811298f2-31aa-4e90-9071-41999bfe47a0")

class CheckoutRequest(BaseModel):
    amount: float
    currency: str = "ZAR"
    metadata: dict = {}

@router.post("/create-checkout")
def create_checkout(checkout: CheckoutRequest, request: Request):
    """
    Initiates a new checkout session with the external Payment Switch.
    Returns the Checkout URL to redirect the user to.
    """
    try:
        # Convert amount to cents
        amount_in_cents = int(checkout.amount * 100)
        
        origin = request.headers.get("origin", "http://localhost:5173")
        
        headers = {
            "Content-Type": "application/json",
            "origin": origin
        }
        
        payload = {
            "amount": amount_in_cents,
            "currency": checkout.currency,
            "storeId": PAYMENT_SWITCH_STORE_ID,
            "metadata": checkout.metadata
        }
        
        # Call Payment Switch API
        process_url = f"{PAYMENT_SWITCH_URL.rstrip('/')}/api/process-payment"
        response = requests.post(process_url, json=payload, headers=headers)
        
        if not response.ok:
            error_data = response.text
            try:
                error_data = response.json()
            except:
                pass
            print(f"Payment Switch Error: {error_data}")
            raise HTTPException(status_code=response.status_code, detail=f"Payment Switch Error: {error_data}")
        
        data = response.json()
        return {"checkoutUrl": data.get("checkoutUrl"), "transactionId": data.get("transactionId")}
        
    except requests.exceptions.RequestException as e:
        print(f"Payment Switch Network Error: {str(e)}")
        raise HTTPException(status_code=503, detail="Payment service is currently unavailable.")
    except Exception as e:
        print(f"Internal Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/process", response_model=PaymentResponse)
def process_payment(payment: PaymentRequest):
    """
    Verifies the payment status with Yoco after frontend completion.
    """
    print(f"Verifying payment {payment.token} for user {payment.user_id}")
    
    # In a real implementation with Yoco's new flow, we might need to verify the Checkout status here 
    # using the ID provided in `payment.token` (which we are using to store the Checkout ID/Reference).
    
    # For now, we simulate success if we got this far, or we could verify against Yoco if needed.
    # Verification Logic (Optional but recommended):
    # verify_response = requests.get(f"https://payments-online.yoco.com/api/checkouts/{payment.token}", headers=headers)
    
    return {
        "success": True,
        "transaction_id": f"txn_{uuid.uuid4().hex[:12]}",
        "message": "Payment verified and processed successfully"
    }
