import React from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Car, MapPin, Calendar, Users } from "lucide-react";
import { format } from "date-fns";

export default function TripManagement() {
  const { data: trips, isLoading } = useQuery({
    queryKey: ['adminTrips'],
    queryFn: () => base44.asServiceRole.entities.Trip.list('-created_date', 50),
    refetchInterval: 30000
  });

  const { data: routes } = useQuery({
    queryKey: ['routes'],
    queryFn: () => base44.entities.FixedRoute.list()
  });

  const getRoute = (routeId) => {
    return routes?.find(r => r.id === routeId);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-slate-100 text-slate-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const tripStats = {
    total: trips?.length || 0,
    scheduled: trips?.filter(t => t.status === 'scheduled').length || 0,
    active: trips?.filter(t => t.status === 'active').length || 0,
    completed: trips?.filter(t => t.status === 'completed').length || 0
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm font-medium text-slate-600">Total Trips</p>
              <p className="text-3xl font-bold text-slate-900 mt-2">{tripStats.total}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm font-medium text-slate-600">Scheduled</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">{tripStats.scheduled}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm font-medium text-slate-600">Active</p>
              <p className="text-3xl font-bold text-green-600 mt-2">{tripStats.active}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm font-medium text-slate-600">Completed</p>
              <p className="text-3xl font-bold text-slate-600 mt-2">{tripStats.completed}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Trips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {trips?.slice(0, 10).map((trip) => {
              const route = getRoute(trip.route_id);
              return (
                <div
                  key={trip.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Car className="w-5 h-5 text-blue-700" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-slate-900">
                          {route?.route_name || 'Unknown Route'}
                        </h4>
                        <Badge className={getStatusColor(trip.status)}>
                          {trip.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-sm text-slate-600">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {format(new Date(trip.departure_date), 'MMM d, yyyy')}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {trip.seats_booked}/{trip.seats_available}
                        </span>
                        <span className="font-semibold text-green-600">
                          R{trip.price_per_seat}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}