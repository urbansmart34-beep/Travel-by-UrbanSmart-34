import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { travelApi } from "../../services/api";
import { useAuth } from "../../lib/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Clock, ChevronRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const DriverDashboard = () => {
    const { user } = useAuth();
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDriverTrips = async () => {
            if (!user) return;
            try {
                // For prototype, we fetch ALL trips and filter by a 'mock' driver ID logic
                // OR we can assign the current user as driver for testing.
                // ideally: const data = await travelApi.getDriverTrips(user.id);
                // But since our seed data has static driver names/IDs, we might need to 
                // just fetch all and pretend, or filter by the user's ID if we updated the seed.

                // Let's fetch all for now and show them (assuming user is a universal driver for demo)
                // In production: we would filter strictly by driver_id
                const response = await travelApi.searchTrips({});

                // Filter to show only scheduled/active trips for clarity
                // PROTOTYPE: Show ALL active trips so the driver sees something.
                const activeTrips = Array.isArray(response) ? response : (response.data || []);

                // If we wanted to simulate "Assignment", we would filter by driver_id here.
                // But since our seed data has driver_id=null, we show everything.
                setTrips(activeTrips);

            } catch (error) {
                console.error("Error fetching driver trips:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDriverTrips();
    }, [user]);

    if (!user) return <div className="p-8 text-center text-white">Please log in to access Driver Dashboard.</div>;

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 p-6">
            <header className="mb-8 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <img
                        src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69793aa8b086913e8a1ee223/96e6ee55b_ChatGPTImageJan29202602_48_52AM.png"
                        alt="Travel by UrbanSmart-34"
                        className="h-10 w-auto bg-white rounded-md p-1"
                    />
                    <div>
                        <h1 className="text-3xl font-bold text-white">Driver Dashboard</h1>
                        <p className="text-slate-400">Welcome back, {user.user_metadata?.first_name || 'Driver'}</p>
                    </div>
                </div>
                <Button variant="outline" asChild>
                    <Link to="/profile">Switch to Rider</Link>
                </Button>
            </header>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card className="bg-slate-900 border-slate-800 col-span-full mb-6">
                    <CardHeader>
                        <CardTitle className="text-white">Active Assignment</CardTitle>
                        <CardDescription>Your next scheduled trip</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <Skeleton className="h-24 w-full bg-slate-800" />
                        ) : trips.length > 0 ? (
                            <div className="flex justify-between items-center p-4 bg-rose-500/10 border border-rose-500/20 rounded-lg">
                                <div>
                                    <h3 className="text-xl font-semibold text-rose-400">{trips[0].origin} ➝ {trips[0].destination}</h3>
                                    <div className="flex gap-4 mt-2 text-sm text-slate-300">
                                        <span className="flex items-center"><Calendar className="w-4 h-4 mr-1" /> {trips[0].date}</span>
                                        <span className="flex items-center"><Clock className="w-4 h-4 mr-1" /> {trips[0].time}</span>
                                    </div>
                                </div>
                                <Button asChild className="bg-rose-600 hover:bg-rose-700">
                                    <Link to={`/driver/trip/${trips[0].id}`}>Start Trip</Link>
                                </Button>
                            </div>
                        ) : (
                            <p className="text-slate-400">No active trips scheduled.</p>
                        )}
                    </CardContent>
                </Card >

                {
                    loading ? (
                        [1, 2, 3].map(i => <Skeleton key={i} className="h-40 bg-slate-800" />)
                    ) : trips.slice(1).map(trip => (
                        <Card key={trip.id} className="bg-slate-900 border-slate-800 hover:border-slate-700 transition-colors">
                            <CardHeader>
                                <div className="flex justify-between">
                                    <Badge variant="outline" className="border-slate-700 text-slate-300">{trip.status || 'Scheduled'}</Badge>
                                    <span className="text-slate-400 text-sm">{trip.date}</span>
                                </div>
                                <CardTitle className="text-lg text-white mt-2">{trip.origin} ➝ {trip.destination}</CardTitle>
                            </CardHeader>
                            <CardFooter>
                                <Button variant="ghost" className="w-full text-rose-400 hover:text-rose-300 hover:bg-rose-950" asChild>
                                    <Link to={`/driver/trip/${trip.id}`}>View Details <ChevronRight className="w-4 h-4 ml-2" /></Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))
                }
            </div >
        </div >
    );
};

export default DriverDashboard;
