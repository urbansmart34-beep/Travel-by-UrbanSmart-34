import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { 
  Calendar, 
  Clock, 
  Users, 
  MapPin,
  Plus,
  Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { format } from "date-fns";

export default function MyTrips() {
  const [activeTab, setActiveTab] = useState('upcoming');

  const { data: user } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => base44.auth.me(),
  });

  const { data: trips, isLoading } = useQuery({
    queryKey: ['myTrips', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      return await base44.entities.Trip.filter({ driver_id: user.id }, '-departure_date');
    },
    initialData: [],
    enabled: !!user?.id,
  });

  const { data: routes } = useQuery({
    queryKey: ['routes'],
    queryFn: () => base44.entities.FixedRoute.list(),
    initialData: [],
  });

  const upcomingTrips = trips.filter(t => t.status === 'scheduled');
  const completedTrips = trips.filter(t => t.status === 'completed');
  const cancelledTrips = trips.filter(t => t.status === 'cancelled');

  const getRoute = (routeId) => routes.find(r => r.id === routeId);

  const TripsList = ({ tripsList }) => {
    if (tripsList.length === 0) {
      return (
        <Card className="border-dashed">
          <CardContent className="p-12 text-center">
            <p className="text-slate-600">No trips found</p>
          </CardContent>
        </Card>
      );
    }

    return (
      <div className="grid grid-cols-1 gap-4">
        {tripsList.map(trip => {
          const route = getRoute(trip.route_id);
          const seatsBooked = trip.seats_booked || 0;
          const seatsAvailable = trip.seats_available - seatsBooked;

          return (
            <Card key={trip.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant={trip.status === 'scheduled' ? 'default' : 'secondary'}>
                        {trip.status}
                      </Badge>
                      {seatsAvailable === 0 && trip.status === 'scheduled' && (
                        <Badge className="bg-green-100 text-green-800">Fully Booked</Badge>
                      )}
                    </div>

                    {route && (
                      <h3 className="font-semibold text-lg text-slate-900 mb-2">
                        {route.route_name}
                      </h3>
                    )}

                    <div className="grid grid-cols-2 gap-3 text-sm text-slate-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        {trip.departure_date && format(new Date(trip.departure_date), 'MMM d, yyyy')}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-slate-400" />
                        {trip.departure_time}
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-slate-400" />
                        {seatsBooked}/{trip.seats_available} booked
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-blue-600">R{trip.price_per_seat}/seat</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 lg:items-end">
                    <p className="text-sm text-slate-600">Potential Earnings</p>
                    <p className="text-2xl font-bold text-green-600">
                      R{((trip.price_per_seat * seatsBooked) * 0.9).toFixed(0)}
                    </p>
                    <Link to={`${createPageUrl('TripDetails')}?id=${trip.id}`}>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">My Trips</h1>
            <p className="text-slate-600">Manage your scheduled rides</p>
          </div>
          <Link to={createPageUrl('PostTrip')}>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-5 h-5 mr-2" />
              Post New Trip
            </Button>
          </Link>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3 mb-8">
            <TabsTrigger value="upcoming">
              Upcoming ({upcomingTrips.length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed ({completedTrips.length})
            </TabsTrigger>
            <TabsTrigger value="cancelled">
              Cancelled ({cancelledTrips.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming">
            <TripsList tripsList={upcomingTrips} />
          </TabsContent>

          <TabsContent value="completed">
            <TripsList tripsList={completedTrips} />
          </TabsContent>

          <TabsContent value="cancelled">
            <TripsList tripsList={cancelledTrips} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}