import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { travelApi } from '@/services/api';
import { useAuth } from '@/lib/AuthContext';
import { useToast } from "@/components/ui/use-toast";
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PaymentRedirect = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { toast } = useToast();
    const [status, setStatus] = useState('processing'); // processing, success, error

    // We expect 'tx' on success, or 'error' on cancellation/failure
    const txId = searchParams.get('tx');
    const errorParam = searchParams.get('error');

    // Mutations
    const paymentMutation = useMutation({
        mutationFn: (paymentData) => travelApi.processPayment(paymentData),
        onSuccess: (data) => {
            if (data.data.success) {
                completeBooking();
            } else {
                handleError("Payment verification failed. Please contact support.");
            }
        },
        onError: (err) => {
            handleError(err.response?.data?.detail || "Payment verification failed.");
        }
    });

    const bookingMutation = useMutation({
        mutationFn: (bookingData) => travelApi.createBooking(bookingData),
        onSuccess: () => {
            setStatus('success');
            toast({
                title: "Booking Confirmed! 🎉",
                description: "Your trip has been successfully booked.",
            });
            // Clear pending booking
            localStorage.removeItem('pending_trip_booking');

            // Redirect after a short delay so user sees success state
            setTimeout(() => {
                navigate('/MyBookings');
            }, 3000);
        },
        onError: (err) => {
            handleError("Payment succeeded, but booking creation failed. Please contact support.");
        }
    });

    const handleError = (message) => {
        setStatus('error');
        toast({
            variant: "destructive",
            title: "Payment Error",
            description: message,
        });
    };

    const completeBooking = () => {
        try {
            const pendingStr = localStorage.getItem('pending_trip_booking');
            if (!pendingStr) {
                // If it's missing, maybe they navigated here directly or refreshed.
                handleError("Booking details not found. Reference ID: " + txId);
                return;
            }

            const pendingBooking = JSON.parse(pendingStr);

            bookingMutation.mutate({
                trip_id: pendingBooking.trip_id,
                user_id: user.id,
                seats: pendingBooking.seats
            });

        } catch (err) {
            handleError("Invalid booking data.");
        }
    };

    const initialized = React.useRef(false);

    useEffect(() => {
        if (!user || initialized.current) {
            return;
        }

        initialized.current = true;

        if (errorParam) {
            handleError(errorParam === 'cancelled' ? 'Payment was cancelled.' : 'Payment failed.');
            return;
        }

        if (txId) {
            // Verify payment
            const pendingStr = localStorage.getItem('pending_trip_booking');
            let amount = 0;
            let tripId = "";
            if (pendingStr) {
                try {
                    const data = JSON.parse(pendingStr);
                    amount = data.total;
                    tripId = data.trip_id;
                } catch (e) { }
            }

            paymentMutation.mutate({
                amount: amount,
                user_id: user.id,
                trip_id: tripId,
                token: txId
            });
        } else {
            handleError("Invalid payment redirect link.");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [txId, errorParam, user]);

    return (
        <div className="min-h-[80vh] bg-slate-50 flex items-center justify-center p-4">
            <Card className="max-w-md w-full text-center py-6 shadow-xl border-slate-200">
                <CardHeader>
                    <div className="mx-auto mb-4 flex justify-center">
                        {status === 'processing' && (
                            <Loader2 className="h-16 w-16 text-blue-600 animate-spin" />
                        )}
                        {status === 'success' && (
                            <CheckCircle2 className="h-16 w-16 text-green-500" />
                        )}
                        {status === 'error' && (
                            <XCircle className="h-16 w-16 text-red-500" />
                        )}
                    </div>
                    <CardTitle className="text-2xl font-bold">
                        {status === 'processing' && 'Processing Payment...'}
                        {status === 'success' && 'Payment Successful!'}
                        {status === 'error' && 'Payment Failed'}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-slate-600 mb-6">
                        {status === 'processing' && 'Please wait while we verify your transaction and confirm your booking. Do not close this secure window.'}
                        {status === 'success' && 'Your transaction was successful. Generating your itinerary & redirecting to your bookings...'}
                        {status === 'error' && 'There was an issue processing your payment securely. You will not be charged. Please try again.'}
                    </p>
                    {status === 'error' && (
                        <button
                            onClick={() => navigate(-1)}
                            className="text-blue-600 hover:text-blue-800 hover:underline font-semibold bg-blue-50 px-4 py-2 rounded-lg"
                        >
                            Return to previous page
                        </button>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default PaymentRedirect;
