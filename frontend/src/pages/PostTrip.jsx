import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  DollarSign,
  ArrowRight,
  Info,
  Car,
  Briefcase,
  Plus
} from "lucide-react";
import PlaceAutocomplete from "@/components/route/PlaceAutocomplete";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function PostTrip() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [currentStep, setCurrentStep] = useState(1);

  const [isCreatingRoute, setIsCreatingRoute] = useState(false);
  const [newRoute, setNewRoute] = useState({
    origin: null,
    destination: null,
    base_price_rand: 100
  });

  const [tripData, setTripData] = useState({
    route_id: '',
    departure_date: '',
    departure_time: '',
    seats_available: 4,
    price_per_seat: 0,
    luggage_space: 'Medium',
    visibility: 'public',
    pickup_notes: '',
    amenities: []
  });

  const { data: user } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => base44.auth.me(),
  });

  const { data: routes } = useQuery({
    queryKey: ['routes'],
    queryFn: () => base44.entities.FixedRoute.filter({ is_active: true }),
    initialData: [],
  });

  const { data: driverProfile } = useQuery({
    queryKey: ['driverProfile', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      const profiles = await base44.entities.DriverProfile.filter({ user_id: user.id });
      return profiles[0];
    },
    enabled: !!user?.id,
  });

  const selectedRoute = routes.find(r => r.id === tripData.route_id);

  const minPrice = selectedRoute ? selectedRoute.base_price_rand + 10 : 50;
  const maxPrice = selectedRoute ? selectedRoute.base_price_rand * 2 : 200;

  const createRouteMutation = useMutation({
    mutationFn: async (routeData) => {
      const distance = calculateDistance(
        routeData.origin.lat,
        routeData.origin.lng,
        routeData.destination.lat,
        routeData.destination.lng
      );

      return await base44.entities.FixedRoute.create({
        route_name: `${routeData.origin.name} to ${routeData.destination.name}`,
        origin: routeData.origin.name,
        destination: routeData.destination.name,
        origin_coordinates: {
          lat: routeData.origin.lat,
          lng: routeData.origin.lng
        },
        destination_coordinates: {
          lat: routeData.destination.lat,
          lng: routeData.destination.lng
        },
        base_price_rand: routeData.base_price_rand,
        distance_km: distance,
        municipality_type: 'Cross-City',
        is_active: true
      });
    },
    onSuccess: (createdRoute) => {
      queryClient.invalidateQueries(['routes']);
      setTripData({...tripData, route_id: createdRoute.id});
      setIsCreatingRoute(false);
      toast.success('Route created successfully!');
    },
    onError: (error) => {
      toast.error('Failed to create route');
      console.error(error);
    }
  });

  const handleCreateRoute = () => {
    if (!newRoute.origin || !newRoute.destination) {
      toast.error('Please select both origin and destination');
      return;
    }
    if (!newRoute.base_price_rand || newRoute.base_price_rand < 20) {
      toast.error('Please set a valid base price (minimum R20)');
      return;
    }
    createRouteMutation.mutate(newRoute);
  };

  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return Math.round(R * c);
  };

  const createTripMutation = useMutation({
    mutationFn: (data) => base44.entities.Trip.create({
      ...data,
      driver_id: user.id,
      seats_booked: 0,
      status: 'scheduled'
    }),
    onSuccess: () => {
      queryClient.invalidateQueries(['trips']);
      toast.success('Trip posted successfully!');
      navigate(createPageUrl('MyTrips'));
    },
    onError: (error) => {
      toast.error('Failed to post trip. Please try again.');
      console.error(error);
    }
  });

  const handleSubmit = () => {
    console.log('Submit clicked, tripData:', tripData);
    console.log('minPrice:', minPrice, 'selectedRoute:', selectedRoute);
    
    if (!tripData.route_id) {
      toast.error('Please select a route');
      return;
    }
    
    if (!tripData.departure_date) {
      toast.error('Please select departure date');
      return;
    }
    
    if (!tripData.departure_time) {
      toast.error('Please select departure time');
      return;
    }
    
    if (!tripData.price_per_seat || tripData.price_per_seat === 0) {
      toast.error('Please enter a price per seat');
      return;
    }

    if (selectedRoute && tripData.price_per_seat < minPrice) {
      toast.error(`Price must be at least R${minPrice}`);
      return;
    }

    console.log('All validations passed, creating trip...');
    createTripMutation.mutate(tripData);
  };

  if (!driverProfile) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Car className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Complete Your Driver Profile</h2>
            <p className="text-slate-600 mb-6">
              You need to set up your driver profile before you can post trips
            </p>
            <Button onClick={() => navigate(createPageUrl('Profile'))}>
              Set Up Profile
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const steps = [
    { number: 1, title: 'Route & Schedule' },
    { number: 2, title: 'Vehicle & Capacity' },
    { number: 3, title: 'Pricing' },
    { number: 4, title: 'Review' }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Post a Trip</h1>
          <p className="text-slate-600">Share your ride and earn money</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <React.Fragment key={step.number}>
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                    currentStep >= step.number 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-slate-200 text-slate-500'
                  }`}>
                    {step.number}
                  </div>
                  <span className={`ml-2 text-sm font-medium hidden sm:block ${
                    currentStep >= step.number ? 'text-slate-900' : 'text-slate-500'
                  }`}>
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-1 mx-4 rounded ${
                    currentStep > step.number ? 'bg-blue-600' : 'bg-slate-200'
                  }`}></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Form Steps */}
        <Card className="border-0 shadow-md">
          <CardContent className="p-8">
            {/* Step 1: Route & Schedule */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                {!isCreatingRoute ? (
                  <div>
                    <Label htmlFor="route" className="text-base font-semibold mb-3 block">Select Route</Label>
                    <Select value={tripData.route_id} onValueChange={(value) => setTripData({...tripData, route_id: value})}>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Choose your route" />
                      </SelectTrigger>
                      <SelectContent>
                        {routes.map(route => (
                          <SelectItem key={route.id} value={route.id}>
                            {route.route_name} - R{route.base_price_rand}+
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button 
                      type="button"
                      variant="outline" 
                      className="mt-3 w-full"
                      onClick={() => setIsCreatingRoute(true)}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Create New Route
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-base font-semibold">Create New Route</Label>
                      <Button 
                        type="button"
                        variant="ghost" 
                        size="sm"
                        onClick={() => {
                          setIsCreatingRoute(false);
                          setNewRoute({ origin: null, destination: null, base_price_rand: 100 });
                        }}
                      >
                        Cancel
                      </Button>
                    </div>

                    <div>
                      <Label className="text-sm font-medium mb-2 block">Origin</Label>
                      <PlaceAutocomplete 
                        placeholder="Starting location..."
                        onPlaceSelect={(place) => setNewRoute({...newRoute, origin: place})}
                      />
                      {newRoute.origin && (
                        <p className="text-xs text-slate-600 mt-1">{newRoute.origin.name}</p>
                      )}
                    </div>

                    <div>
                      <Label className="text-sm font-medium mb-2 block">Destination</Label>
                      <PlaceAutocomplete 
                        placeholder="Ending location..."
                        onPlaceSelect={(place) => setNewRoute({...newRoute, destination: place})}
                      />
                      {newRoute.destination && (
                        <p className="text-xs text-slate-600 mt-1">{newRoute.destination.name}</p>
                      )}
                    </div>

                    <div>
                      <Label className="text-sm font-medium mb-2 block">Base Price (Rand)</Label>
                      <Input 
                        type="number"
                        min="20"
                        step="10"
                        value={newRoute.base_price_rand}
                        onChange={(e) => setNewRoute({...newRoute, base_price_rand: parseInt(e.target.value)})}
                        placeholder="e.g., 100"
                      />
                      {newRoute.origin && newRoute.destination && (
                        <p className="text-xs text-slate-500 mt-1">
                          Distance: ~{calculateDistance(
                            newRoute.origin.lat, 
                            newRoute.origin.lng, 
                            newRoute.destination.lat, 
                            newRoute.destination.lng
                          )} km
                        </p>
                      )}
                    </div>

                    <Button 
                      type="button"
                      onClick={handleCreateRoute}
                      disabled={createRouteMutation.isPending}
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      {createRouteMutation.isPending ? 'Creating...' : 'Create Route'}
                    </Button>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date" className="text-base font-semibold mb-3 block">Departure Date</Label>
                    <Input
                      id="date"
                      type="date"
                      className="h-12"
                      min={new Date().toISOString().split('T')[0]}
                      value={tripData.departure_date}
                      onChange={(e) => setTripData({...tripData, departure_date: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="time" className="text-base font-semibold mb-3 block">Departure Time</Label>
                    <Input
                      id="time"
                      type="time"
                      className="h-12"
                      value={tripData.departure_time}
                      onChange={(e) => setTripData({...tripData, departure_time: e.target.value})}
                    />
                  </div>
                </div>

                {selectedRoute && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start gap-2">
                      <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div className="text-sm">
                        <p className="font-medium text-blue-900 mb-1">Route Information</p>
                        <p className="text-blue-700">
                          Base price: R{selectedRoute.base_price_rand} • 
                          {selectedRoute.estimated_duration_minutes && ` ~${selectedRoute.estimated_duration_minutes} min`}
                          {selectedRoute.distance_km && ` • ${selectedRoute.distance_km} km`}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Step 2: Vehicle & Capacity */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                  <p className="text-sm text-slate-600 mb-2">Your Vehicle</p>
                  <p className="font-semibold text-slate-900">
                    {driverProfile.vehicle_make} {driverProfile.vehicle_model} ({driverProfile.vehicle_type})
                  </p>
                  <p className="text-sm text-slate-600">
                    License: {driverProfile.license_plate} • Capacity: {driverProfile.vehicle_capacity} seats
                  </p>
                </div>

                <div>
                  <Label htmlFor="seats" className="text-base font-semibold mb-3 block">Available Seats</Label>
                  <Input
                    id="seats"
                    type="number"
                    min="1"
                    max={driverProfile.vehicle_capacity || 8}
                    className="h-12"
                    value={tripData.seats_available}
                    onChange={(e) => setTripData({...tripData, seats_available: parseInt(e.target.value)})}
                  />
                  <p className="text-sm text-slate-500 mt-2">
                    Maximum capacity: {driverProfile.vehicle_capacity} seats
                  </p>
                </div>

                <div>
                  <Label className="text-base font-semibold mb-3 block">Luggage Space</Label>
                  <Select value={tripData.luggage_space} onValueChange={(value) => setTripData({...tripData, luggage_space: value})}>
                    <SelectTrigger className="h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Small">Small - Backpacks only</SelectItem>
                      <SelectItem value="Medium">Medium - 1 suitcase per person</SelectItem>
                      <SelectItem value="Large">Large - 2 bags per person</SelectItem>
                      <SelectItem value="Extra">Extra - Extra luggage space</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-base font-semibold mb-3 block">Pickup Instructions (Optional)</Label>
                  <Textarea
                    placeholder="e.g., Meet at the main entrance..."
                    value={tripData.pickup_notes}
                    onChange={(e) => setTripData({...tripData, pickup_notes: e.target.value})}
                    rows={3}
                  />
                </div>
              </motion.div>
            )}

            {/* Step 3: Pricing */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div>
                  <Label htmlFor="price" className="text-base font-semibold mb-3 block">
                    Price per Seat
                  </Label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">R</span>
                    <Input
                      id="price"
                      type="number"
                      min={minPrice}
                      max={maxPrice}
                      step="10"
                      className="h-12 pl-8 text-lg"
                      value={tripData.price_per_seat}
                      onChange={(e) => setTripData({...tripData, price_per_seat: parseFloat(e.target.value)})}
                    />
                  </div>
                  
                  {selectedRoute && (
                    <div className="mt-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
                      <p className="text-sm font-medium text-slate-700 mb-2">Pricing Guidance</p>
                      <div className="space-y-1 text-sm text-slate-600">
                        <p>Minimum price: R{minPrice}</p>
                        <p>Suggested range: R{minPrice} - R{maxPrice}</p>
                        <p className="text-xs text-slate-500 mt-2">
                          You'll earn approximately R{(tripData.price_per_seat * tripData.seats_available * 0.9).toFixed(0)} after platform fees
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <Label className="text-base font-semibold mb-3 block">Trip Visibility</Label>
                  <Select value={tripData.visibility} onValueChange={(value) => setTripData({...tripData, visibility: value})}>
                    <SelectTrigger className="h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public - Anyone can book</SelectItem>
                      <SelectItem value="friends_only">Friends Only - Only your connections</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </motion.div>
            )}

            {/* Step 4: Review */}
            {currentStep === 4 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Review Your Trip</h3>
                  <p className="text-slate-600">Make sure everything looks correct</p>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-slate-50 rounded-lg">
                    <span className="text-slate-600">Route</span>
                    <span className="font-semibold text-slate-900">{selectedRoute?.route_name}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-slate-50 rounded-lg">
                    <span className="text-slate-600">Departure</span>
                    <span className="font-semibold text-slate-900">
                      {tripData.departure_date} at {tripData.departure_time}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-slate-50 rounded-lg">
                    <span className="text-slate-600">Seats Available</span>
                    <span className="font-semibold text-slate-900">{tripData.seats_available}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-slate-50 rounded-lg">
                    <span className="text-slate-600">Price per Seat</span>
                    <span className="font-semibold text-blue-600 text-lg">R{tripData.price_per_seat}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-slate-50 rounded-lg">
                    <span className="text-slate-600">Potential Earnings</span>
                    <span className="font-semibold text-green-600">
                      R{(tripData.price_per_seat * tripData.seats_available * 0.9).toFixed(0)}
                    </span>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
                  <p className="font-medium mb-1">Ready to post?</p>
                  <p>Your trip will be visible to passengers immediately. You'll receive notifications when someone books a seat.</p>
                </div>
              </motion.div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-slate-200">
              <Button
                variant="outline"
                onClick={() => currentStep > 1 && setCurrentStep(currentStep - 1)}
                disabled={currentStep === 1}
              >
                Back
              </Button>
              
              {currentStep < 4 ? (
                <Button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Next Step
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={createTripMutation.isPending}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {createTripMutation.isPending ? 'Posting...' : 'Post Trip'}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}