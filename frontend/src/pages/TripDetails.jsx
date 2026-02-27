import React, { useState } from 'react';
import axios from 'axios';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { travelApi } from '@/services/api';
import { useAuth } from '@/lib/AuthContext';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, Calendar, Clock, MapPin, User, Car, Star, Briefcase, Plus, Minus, ShieldCheck, CheckCircle, MessageSquare, Music, Ban, Shield, Share2, Lock } from 'lucide-react';
import { Map as GoogleMap, AdvancedMarker } from '@vis.gl/react-google-maps';

const TripDetails = () => {
    const [searchParams] = useSearchParams();
    const tripId = searchParams.get('id');
    const navigate = useNavigate();
    const { user } = useAuth();
    const { toast } = useToast();
    const [isProcessing, setIsProcessing] = useState(false);

    // Booking details state
    const [seatsRequired, setSeatsRequired] = useState(1);

    // Fetch Trip Details
    const { data: trip, isLoading, error } = useQuery({
        queryKey: ['trip', tripId],
        queryFn: async () => {
            const response = await travelApi.getTrip(tripId);
            return response.data;
        },
        enabled: !!tripId,
    });

    const maxSeats = trip ? (trip.seats_available - (trip.seats_booked || 0)) : 1;
    const basePrice = trip ? parseFloat(trip.price || trip.price_per_seat || 0) : 0;
    const serviceFee = 10.00;
    const totalPrice = (basePrice * seatsRequired) + serviceFee;

    // Booking Mutation
    const bookingMutation = useMutation({
        mutationFn: (bookingData) => travelApi.createBooking(bookingData),
        onSuccess: () => {
            toast({
                title: "Booking Confirmed! 🎉",
                description: "Your trip has been successfully booked.",
            });
            navigate('/MyBookings');
        },
        onError: (err) => {
            console.error("Booking failed", err);
            toast({
                variant: "destructive",
                title: "Booking Failed",
                description: err.response?.data?.detail || "Something went wrong. Please try again.",
            });
        },
    });

    // Payment Mutation
    const paymentMutation = useMutation({
        mutationFn: (paymentData) => travelApi.processPayment(paymentData),
        onSuccess: (data) => {
            if (data.data.success) {
                toast({
                    title: "Payment Successful",
                    description: `Transaction ID: ${data.data.transaction_id}`,
                });
                bookingMutation.mutate({
                    trip_id: tripId,
                    user_id: user.id,
                    seats: seatsRequired
                });
            }
        },
        onError: (err) => {
            toast({
                variant: "destructive",
                title: "Payment Failed",
                description: "Your transaction failed. Please try again.",
            });
        }
    });

    const handleBookClick = async () => {
        if (!user) {
            toast({
                title: "Login Required",
                description: "Please login to book a trip.",
            });
            navigate('/login');
            return;
        }

        setIsProcessing(true);
        try {
            // Save pending booking to local storage so we can complete it on return
            const pendingBooking = {
                trip_id: tripId,
                seats: seatsRequired,
                total: totalPrice
            };
            localStorage.setItem('pending_trip_booking', JSON.stringify(pendingBooking));

            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
            const checkoutResponse = await axios.post(`${apiUrl}/payments/create-checkout`, {
                amount: totalPrice,
                currency: 'ZAR',
                metadata: {
                    trip_id: tripId,
                    user_id: user.id,
                    seats: seatsRequired
                }
            });

            const checkoutUrl = checkoutResponse.data.checkoutUrl;
            if (checkoutUrl) {
                window.location.href = checkoutUrl;
            } else {
                throw new Error("No checkout URL received from Payment Switch");
            }
        } catch (err) {
            console.error("Payment Init Error:", err);
            toast({
                variant: "destructive",
                title: "Payment Error",
                description: err.response?.data?.detail || err.message || "Failed to initialize payment.",
            });
            setIsProcessing(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-slate-500">Loading trip details...</p>
                </div>
            </div>
        );
    }

    if (error || !trip) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
                <Card className="max-w-md w-full text-center">
                    <CardHeader>
                        <CardTitle className="text-red-600">Trip Not Found</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-slate-600 mb-6">
                            We couldn't find the trip you're looking for. It might have been cancelled or removed.
                        </p>
                        <Link to="/FindRides">
                            <Button variant="outline">Back to Search</Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const origin = trip.origin || trip.route?.origin || 'Unknown Origin';
    const destination = trip.destination || trip.route?.destination || 'Unknown Destination';
    const driverName = trip.driver_name || trip.driver?.full_name || 'Driver';
    const driverImage = trip.driver_image || trip.driver?.profile_photo_url;
    const driverRating = trip.driver_rating || trip.driver?.rating || 4.8;

    return (
        <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Breadcrumb / Back Navigation */}
                <nav aria-label="Breadcrumb" className="flex mb-6 text-sm font-medium">
                    <ol className="flex items-center space-x-2">
                        <li>
                            <Link to="/FindRides" className="text-slate-500 hover:text-blue-600 flex items-center">
                                <ArrowLeft className="w-4 h-4 mr-1" /> Find Rides
                            </Link>
                        </li>
                        <li className="text-slate-400">/</li>
                        <li><span className="text-blue-600">{origin} to {destination}</span></li>
                    </ol>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content (Left Column) */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Timeline Header Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                            <div className="p-6 border-b border-slate-200">
                                <div className="flex justify-between items-start mb-4">
                                    <h1 className="text-2xl font-bold text-slate-900">{trip.date ? new Date(trip.date).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' }) : 'Date To Be Decided'}</h1>
                                    <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-2.5 py-0.5 rounded border border-blue-200">Confirmed Trip</span>
                                </div>

                                <div className="relative pl-8 border-l-2 border-dashed border-slate-300 ml-3 space-y-8 py-2">
                                    <div className="relative">
                                        <div className="absolute -left-[41px] bg-white p-1">
                                            <MapPin className="text-green-500 w-5 h-5 fill-current" />
                                        </div>
                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                                            <div>
                                                <p className="text-lg font-semibold">{trip.time || trip.departure_time || '08:00 AM'}</p>
                                                <p className="text-slate-500 text-sm">{origin}</p>
                                            </div>
                                            <a className="text-blue-600 text-sm hover:underline mt-1 sm:mt-0 flex items-center gap-1" href="#map">
                                                View on map
                                            </a>
                                        </div>
                                    </div>

                                    <div className="relative">
                                        <div className="absolute -left-[41px] bg-white p-1">
                                            <MapPin className="text-blue-600 w-5 h-5 fill-current" />
                                        </div>
                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                                            <div>
                                                <p className="text-lg font-semibold">{trip.arrival_time || '10:15 AM'}</p>
                                                <p className="text-slate-500 text-sm">{destination}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-6 mt-8 pt-6 border-t border-slate-200">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-slate-50 rounded-lg text-blue-600">
                                            <Clock className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500 font-medium uppercase">Duration</p>
                                            <p className="font-semibold text-sm">{trip.duration || '2h 15m'}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-slate-50 rounded-lg text-blue-600">
                                            <Car className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500 font-medium uppercase">Vehicle</p>
                                            <p className="font-semibold text-sm">{trip.vehicle || 'Standard Car'}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-slate-50 rounded-lg text-blue-600">
                                            <Briefcase className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500 font-medium uppercase">Luggage</p>
                                            <p className="font-semibold text-sm">Small Bag Only</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Route Map Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden" id="map">
                            <div className="p-4 border-b border-slate-200 flex justify-between items-center">
                                <h3 className="font-bold text-lg">Route Map</h3>
                                <button className="text-sm text-blue-600 font-medium hover:underline">Expand View</button>
                            </div>
                            <div className="h-64 w-full bg-slate-100 relative overflow-hidden">
                                <GoogleMap
                                    defaultCenter={{ lat: -33.9285, lng: 18.6421 }}
                                    defaultZoom={10}
                                    mapId="TRIP_DETAILS_MAP"
                                    disableDefaultUI={true}
                                >
                                    <AdvancedMarker position={{ lat: -33.9249, lng: 18.4241 }} />
                                    <AdvancedMarker position={{ lat: -33.9321, lng: 18.8602 }} />
                                </GoogleMap>
                            </div>
                        </div>

                        {/* Driver Info Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                            <h3 className="font-bold text-lg mb-4">Your Driver</h3>
                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="flex-shrink-0 flex flex-col items-center">
                                    <div className="h-24 w-24 rounded-full overflow-hidden border-4 border-white shadow-md bg-slate-100 flex items-center justify-center">
                                        {driverImage ? <img src={driverImage} alt="Driver" className="h-full w-full object-cover" /> : <User className="w-12 h-12 text-slate-400" />}
                                    </div>
                                    <div className="mt-2 flex items-center bg-amber-50 px-2 py-0.5 rounded text-xs font-bold text-amber-700 gap-1 border border-amber-200">
                                        <Star className="w-3 h-3 fill-current" /> {Number(driverRating).toFixed(1)}
                                    </div>
                                </div>
                                <div className="flex-grow">
                                    <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                                        <div>
                                            <h4 className="text-xl font-bold">{driverName}</h4>
                                            <p className="text-sm text-slate-500">Member since 2021 • {trip.driver?.rides || Math.floor(Math.random() * 200) + 50} Rides</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                                                <ShieldCheck className="w-3 h-3 mr-1" /> ID Verified
                                            </span>
                                            <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                                                <CheckCircle className="w-3 h-3 mr-1" /> Email
                                            </span>
                                        </div>
                                    </div>
                                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                                        "Hi! I'm commuting daily to work. I enjoy good music and quiet rides in the morning. I'm punctual and my car is always clean. Happy to chat if you want."
                                    </p>
                                    <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                                        <h5 className="text-xs font-semibold uppercase text-slate-500 mb-2">Driver Preferences</h5>
                                        <div className="flex flex-wrap gap-4">
                                            <span className="flex items-center text-xs text-slate-700 gap-1"><MessageSquare className="w-4 h-4 text-slate-400" /> Chatty</span>
                                            <span className="flex items-center text-xs text-slate-700 gap-1"><Music className="w-4 h-4 text-slate-400" /> Music</span>
                                            <span className="flex items-center text-xs text-slate-700 gap-1"><Ban className="w-4 h-4 text-slate-400" /> No Smoking</span>
                                            <span className="flex items-center text-xs text-slate-700 gap-1"><span className="text-slate-400 font-bold">🐾</span> No Pets</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Reviews Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-bold text-lg">Reviews (12)</h3>
                                <a className="text-sm text-blue-600 hover:underline" href="#">View all</a>
                            </div>
                            <div className="space-y-6">
                                <div className="border-b border-slate-100 pb-6">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 text-xs font-bold">JD</div>
                                            <div>
                                                <p className="text-sm font-semibold">John Doe</p>
                                                <p className="text-xs text-slate-500">Oct 20, 2023</p>
                                            </div>
                                        </div>
                                        <div className="flex text-amber-400"><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /></div>
                                    </div>
                                    <p className="text-sm text-slate-600">Great ride! Was on time and very friendly. The car was comfortable. Would definitely ride again.</p>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-700 text-xs font-bold">SM</div>
                                            <div>
                                                <p className="text-sm font-semibold">Sarah M.</p>
                                                <p className="text-xs text-slate-500">Oct 15, 2023</p>
                                            </div>
                                        </div>
                                        <div className="flex text-amber-400"><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 text-slate-200" /></div>
                                    </div>
                                    <p className="text-sm text-slate-600">Smooth journey, got me there safely. Thanks!</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Booking Sidebar (Right Column) */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8 space-y-4">
                            <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
                                <div className="p-6 border-b border-slate-100 bg-slate-50">
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <p className="text-sm text-slate-500">Total price per seat</p>
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-3xl font-bold text-blue-600">R{basePrice.toFixed(2)}</span>
                                                <span className="text-xs text-slate-500">ZAR</span>
                                            </div>
                                        </div>
                                        <span className="bg-green-100 text-green-700 border border-green-200 text-xs px-2 py-1 rounded font-medium">Best Value</span>
                                    </div>
                                </div>
                                <div className="p-6 space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-900 mb-2">Seats Required</label>
                                        <div className="flex items-center justify-between bg-slate-50 p-1 rounded-lg border border-slate-200">
                                            <button
                                                onClick={() => setSeatsRequired(p => Math.max(1, p - 1))}
                                                disabled={seatsRequired <= 1}
                                                className="p-2 rounded-md hover:bg-white text-slate-600 disabled:opacity-50"
                                            >
                                                <Minus className="w-5 h-5" />
                                            </button>
                                            <span className="font-bold text-lg">{seatsRequired}</span>
                                            <button
                                                onClick={() => setSeatsRequired(p => Math.min(maxSeats, p + 1))}
                                                disabled={seatsRequired >= maxSeats}
                                                className="p-2 rounded-md hover:bg-white text-blue-600 disabled:opacity-50"
                                            >
                                                <Plus className="w-5 h-5" />
                                            </button>
                                        </div>
                                        {maxSeats <= 3 && (
                                            <p className="text-xs text-red-500 mt-2 flex items-center gap-1 font-medium">
                                                Only {maxSeats} seats left!
                                            </p>
                                        )}
                                    </div>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between text-slate-600">
                                            <span>Ride Contribution</span>
                                            <span>R{(basePrice * seatsRequired).toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-slate-600">
                                            <span>Service Fee</span>
                                            <span>R{serviceFee.toFixed(2)}</span>
                                        </div>
                                        <div className="border-t border-slate-200 pt-2 mt-2 flex justify-between font-bold text-slate-900">
                                            <span>Total</span>
                                            <span>R{totalPrice.toFixed(2)}</span>
                                        </div>
                                    </div>

                                    <Button
                                        className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-lg font-bold shadow-md shadow-blue-200/50"
                                        onClick={handleBookClick}
                                        disabled={bookingMutation.isPending || isProcessing || maxSeats < 1}
                                    >
                                        {isProcessing ? 'Redirecting to Secure Checkout...' :
                                            bookingMutation.isPending ? 'Confirming...' :
                                                maxSeats < 1 ? 'Sold Out' : 'Request to Book'}
                                    </Button>

                                    <div className="text-center">
                                        <p className="text-xs text-slate-500 flex items-center justify-center gap-1">
                                            <Shield className="w-4 h-4 text-green-500" /> Secure escrow payment
                                        </p>
                                    </div>
                                </div>
                                <div className="bg-slate-50 p-4 border-t border-slate-100">
                                    <h4 className="text-sm font-semibold text-blue-600 mb-1">Safety First</h4>
                                    <p className="text-xs text-slate-500 leading-relaxed">This trip is monitored by safety protocols. Emergency assistance is available in-app.</p>
                                </div>
                            </div>

                            <div className="flex justify-center pt-2">
                                <button className="text-sm text-slate-500 hover:text-blue-600 flex items-center gap-2 font-medium">
                                    <Share2 className="w-4 h-4" /> Share this trip
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default TripDetails;
