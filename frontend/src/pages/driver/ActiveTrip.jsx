import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { travelApi } from "../../services/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, MapPin, Users, Navigation } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Map as GoogleMap, AdvancedMarker } from '@vis.gl/react-google-maps';

const ActiveTrip = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { toast } = useToast();
    const [trip, setTrip] = useState(null);
    const [passengers, setPassengers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const tripData = await travelApi.getTrip(id);
                setTrip(tripData.data);

                // Get passengers
                const passengerData = await travelApi.getTripPassengers(id);
                setPassengers(passengerData.data || []);
            } catch (error) {
                console.error("Error loading trip:", error);
                toast({ title: "Error", description: "Could not load trip details.", variant: "destructive" });
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [id]);

    const handleStatusUpdate = async (newStatus) => {
        try {
            await travelApi.updateTripStatus(id, newStatus);
            setTrip(prev => ({ ...prev, status: newStatus }));
            toast({ title: "Status Updated", description: `Trip is now ${newStatus.replace('_', ' ')}` });

            if (newStatus === 'completed') {
                navigate('/driver');
            }
        } catch (error) {
            toast({ title: "Error", description: "Failed to update status", variant: "destructive" });
        }
    };

    if (loading) return <div className="p-8 text-white">Loading trip data...</div>;
    if (!trip) return <div className="p-8 text-white">Trip not found</div>;

    const statusColors = {
        scheduled: "bg-blue-500/20 text-blue-300",
        in_progress: "bg-green-500/20 text-green-300 animate-pulse",
        completed: "bg-slate-500/20 text-slate-300",
        cancelled: "bg-red-500/20 text-red-300"
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 p-6 pb-24">
            {/* Header / Status Bar */}
            <div className="fixed top-0 left-0 right-0 bg-slate-900 border-b border-slate-800 p-4 z-10 shadow-lg">
                <div className="max-w-4xl mx-auto flex justify-between items-center">
                    <h1 className="text-xl font-bold flex items-center gap-2">
                        {trip.origin} ➝ {trip.destination}
                        <Badge className={`${statusColors[trip.status || 'scheduled']} border-0`}>
                            {(trip.status || 'scheduled').replace('_', ' ').toUpperCase()}
                        </Badge>
                    </h1>
                    <Button variant="ghost" onClick={() => navigate('/driver')}>Close</Button>
                </div>
            </div>

            <div className="max-w-4xl mx-auto mt-20 space-y-6">

                {/* Primary Action Button */}
                <div className="grid grid-cols-2 gap-4">
                    {trip.status !== 'in_progress' && (
                        <Button
                            className="bg-green-600 hover:bg-green-700 h-14 text-lg w-full col-span-2"
                            onClick={() => handleStatusUpdate('in_progress')}
                            disabled={trip.status === 'completed'}
                        >
                            <Navigation className="mr-2" /> Start Trip
                        </Button>
                    )}

                    {trip.status === 'in_progress' && (
                        <Button
                            className="bg-red-600 hover:bg-red-700 h-14 text-lg w-full col-span-2"
                            onClick={() => handleStatusUpdate('completed')}
                        >
                            <CheckCircle className="mr-2" /> Complete Trip
                        </Button>
                    )}
                </div>

                {/* Route Map */}
                <Card className="bg-slate-900 border-slate-800 overflow-hidden">
                    <div className="h-64 w-full relative bg-slate-800">
                        <GoogleMap
                            defaultCenter={{ lat: -33.9285, lng: 18.6421 }}
                            defaultZoom={11}
                            mapId="ACTIVE_TRIP_MAP"
                            disableDefaultUI={true}
                        >
                            <AdvancedMarker position={{ lat: -33.9249, lng: 18.4241 }} />
                            <AdvancedMarker position={{ lat: -33.9531, lng: 18.4602 }} />
                        </GoogleMap>
                    </div>
                </Card>

                {/* Info Cards */}
                <div className="grid md:grid-cols-2 gap-6">
                    <Card className="bg-slate-900 border-slate-800">
                        <CardHeader><CardTitle className="text-white">Route Info</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="mt-1"><div className="w-3 h-3 rounded-full bg-green-500"></div></div>
                                <div>
                                    <p className="text-sm text-slate-400">Pick Up</p>
                                    <p className="font-medium text-lg">{trip.origin}</p>
                                    <p className="text-sm text-slate-500">{trip.date} @ {trip.time}</p>
                                </div>
                            </div>
                            <div className="border-l border-dashed border-slate-700 ml-1.5 h-8"></div>
                            <div className="flex items-start gap-4">
                                <div className="mt-1"><div className="w-3 h-3 rounded-full bg-red-500"></div></div>
                                <div>
                                    <p className="text-sm text-slate-400">Drop Off</p>
                                    <p className="font-medium text-lg">{trip.destination}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-slate-900 border-slate-800">
                        <CardHeader>
                            <CardTitle className="text-white flex justify-between">
                                Passenger Manifest
                                <Badge variant="secondary"><Users className="w-3 h-3 mr-1" /> {passengers.length} Riders</Badge>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {passengers.length === 0 ? (
                                    <p className="text-slate-500 italic">No passengers booked yet.</p>
                                ) : (
                                    passengers.map((p, idx) => (
                                        <div key={idx} className="flex justify-between items-center p-3 bg-slate-800 rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold">
                                                    P{idx + 1}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-slate-200">Passenger {p.user_id.slice(0, 6)}</p>
                                                    <p className="text-xs text-slate-400">Confirmed</p>
                                                </div>
                                            </div>
                                            <Button size="sm" variant="outline" className="border-slate-600">Check In</Button>
                                        </div>
                                    ))
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default ActiveTrip;
