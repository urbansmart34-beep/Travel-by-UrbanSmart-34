import { useState, useEffect } from "react";
import { travelApi } from "../services/api";
import { useAuth } from "../lib/AuthContext";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { CalendarIcon, MapPinIcon, ClockIcon } from "lucide-react";


const MyBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) return;
      try {
        const response = await travelApi.getBookings(user.id);
        setBookings(response.data);
      } catch (err) {
        console.error("Failed to fetch bookings:", err);
        setError("Could not load your bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen bg-neutral-900 text-white">

        <div className="container mx-auto px-4 py-8 text-center">
          <h2 className="text-xl">Please log in to view your bookings.</h2>
          <Button asChild className="mt-4">
            <Link to="/login">Login</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-rose-500/30">

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-rose-400 to-orange-300 bg-clip-text text-transparent">
          My Bookings
        </h1>

        {error && (
          <div className="p-4 mb-4 bg-red-900/20 border border-red-800 text-red-200 rounded-lg">
            {error}
          </div>
        )}

        {loading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-64 w-full bg-neutral-800 rounded-xl" />
            ))}
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl text-neutral-400">No bookings found.</h3>
            <p className="text-neutral-500 mt-2">Ready to explore?</p>
            <Button asChild className="mt-6 bg-rose-600 hover:bg-rose-700">
              <Link to="/find-rides">Find a Ride</Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {bookings.map((booking) => {
              const trip = booking.trips; // Joined data from Supabase
              return (
                <Card key={booking.id} className="bg-neutral-900/50 border-neutral-800 backdrop-blur-sm overflow-hidden hover:border-rose-500/30 transition-all duration-300 group">
                  <div className="h-32 bg-neutral-800 relative">
                    <img
                      src={trip?.vehicle_image || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80"}
                      alt={trip?.destination}
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                    />
                    <Badge className={`absolute top-3 right-3 ${booking.status === 'confirmed' ? 'bg-green-500/20 text-green-300 hover:bg-green-500/30' : 'bg-yellow-500/20 text-yellow-300'
                      }`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl text-neutral-100 flex justify-between items-start">
                      <span>{trip?.destination}</span>
                      <span className="text-lg font-normal text-rose-400">R{trip?.price}</span>
                    </CardTitle>
                    <CardDescription className="text-neutral-400">
                      From {trip?.origin}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center text-sm text-neutral-300">
                      <CalendarIcon className="w-4 h-4 mr-2 text-rose-500" />
                      {trip?.date}
                    </div>
                    <div className="flex items-center text-sm text-neutral-300">
                      <ClockIcon className="w-4 h-4 mr-2 text-rose-500" />
                      {trip?.time}
                    </div>
                    <div className="flex items-center text-sm text-neutral-300">
                      <MapPinIcon className="w-4 h-4 mr-2 text-rose-500" />
                      {trip?.vehicle} • {trip?.driver_name}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full border-neutral-700 text-neutral-300 hover:bg-neutral-800 hover:text-white">
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default MyBookings;