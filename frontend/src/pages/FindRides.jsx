import React, { useState, useEffect } from "react";
import { travelApi } from '@/services/api';
import { useQuery } from "@tanstack/react-query";
import {
  Filter,
  Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import TripCard from "@/components/trips/TripCard";
import { useMapsLibrary } from '@vis.gl/react-google-maps';
import { useRef } from 'react';

export default function FindRides() {
  const urlParams = new URLSearchParams(window.location.search);

  const [filters, setFilters] = useState({
    from: urlParams.get('from') || '',
    to: urlParams.get('to') || '',
    date: urlParams.get('date') || '',
    minSeats: parseInt(urlParams.get('passengers')) || 1,
    maxPrice: 500,
    vehicleType: 'all'
  });

  const [showFilters, setShowFilters] = useState(false);

  const placesLibrary = useMapsLibrary('places');
  const fromInputRef = useRef(null);
  const toInputRef = useRef(null);

  useEffect(() => {
    if (!placesLibrary || !fromInputRef.current) return;
    const options = { fields: ['formatted_address', 'name'] };
    const ac = new placesLibrary.Autocomplete(fromInputRef.current, options);
    ac.addListener('place_changed', () => {
      const place = ac.getPlace();
      setFilters(prev => ({ ...prev, from: place.formatted_address || place.name || '' }));
    });
  }, [placesLibrary]);

  useEffect(() => {
    if (!placesLibrary || !toInputRef.current) return;
    const options = { fields: ['formatted_address', 'name'] };
    const ac = new placesLibrary.Autocomplete(toInputRef.current, options);
    ac.addListener('place_changed', () => {
      const place = ac.getPlace();
      setFilters(prev => ({ ...prev, to: place.formatted_address || place.name || '' }));
    });
  }, [placesLibrary]);

  const { data: trips, isLoading, isError, error } = useQuery({
    queryKey: ['trips', filters.from, filters.to, filters.date], // Only refetch when search params change
    queryFn: async () => {
      try {
        const response = await travelApi.searchTrips({
          from_loc: filters.from,
          to_loc: filters.to,
          date: filters.date
        });

        let allTrips = response.data;

        // Apply client-side filtering for price and seats (since backend mock is simple)
        // In real app, passes these as params to API
        return allTrips.filter(trip => {
          const seatsAvailable = trip.seats_available - (trip.seats_booked || 0);
          if (seatsAvailable < filters.minSeats) return false;
          // Handle price field variation (price vs price_per_seat)
          const price = trip.price || trip.price_per_seat || 0;
          if (price > filters.maxPrice) return false;
          if (filters.vehicleType !== 'all' && trip.vehicle !== filters.vehicleType) return false;
          return true;
        });
      } catch (err) {
        console.error("Failed to fetch trips:", err);
        return [];
      }
    },
    initialData: [],
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Find Your Ride</h1>
          <p className="text-slate-600">Discover affordable, convenient trips matching your schedule</p>
        </div>

        {/* Search Bar - Horizontal */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
            <div>
              <label className="text-xs font-medium text-slate-500 mb-1 block">From</label>
              <Input
                ref={fromInputRef}
                placeholder="Leaving from..."
                value={filters.from}
                onChange={(e) => setFilters({ ...filters, from: e.target.value })}
                className="w-full"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500 mb-1 block">To</label>
              <Input
                ref={toInputRef}
                placeholder="Going to..."
                value={filters.to}
                onChange={(e) => setFilters({ ...filters, to: e.target.value })}
                className="w-full"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500 mb-1 block">Date</label>
              <Input
                type="date"
                value={filters.date}
                onChange={(e) => setFilters({ ...filters, date: e.target.value })}
                min={new Date().toISOString().split('T')[0]}
                className="w-full"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500 mb-1 block">Passengers</label>
              <Input
                type="number"
                min="1"
                max="8"
                value={filters.minSeats}
                onChange={(e) => setFilters({ ...filters, minSeats: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>
            <div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 h-10">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sticky top-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-slate-900">Filters</h2>
                <button
                  onClick={() => setFilters({ from: '', to: '', date: '', minSeats: 1, maxPrice: 1000, vehicleType: 'all' })}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium cursor-pointer"
                >
                  Reset
                </button>
              </div>

              {/* Price Range */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-slate-900 mb-4">Price Range</h3>
                <Slider
                  value={[filters.maxPrice]}
                  onValueChange={(value) => setFilters({ ...filters, maxPrice: value[0] })}
                  max={1000}
                  min={50}
                  step={10}
                  className="w-full mb-3"
                />
                <div className="flex justify-between text-sm text-slate-500">
                  <span>R50</span>
                  <span className="font-medium text-slate-900">Up to R{filters.maxPrice}</span>
                </div>
              </div>

              {/* Vehicle Type */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-slate-900 mb-4">Vehicle Type</h3>
                <Select
                  value={filters.vehicleType}
                  onValueChange={(value) => setFilters({ ...filters, vehicleType: value })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Vehicles</SelectItem>
                    <SelectItem value="Hatchback">Hatchback</SelectItem>
                    <SelectItem value="Sedan">Sedan</SelectItem>
                    <SelectItem value="SUV">SUV</SelectItem>
                    <SelectItem value="Luxury">Luxury</SelectItem>
                    <SelectItem value="Minibus">Minibus</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Departure Time */}
              <div className="mb-8 border-t border-slate-100 pt-6">
                <h3 className="text-sm font-semibold text-slate-900 mb-3">Departure Time</h3>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4" defaultChecked />
                    <span className="ml-3 text-sm text-slate-600">Before 12:00 PM</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4" defaultChecked />
                    <span className="ml-3 text-sm text-slate-600">After 12:00 PM</span>
                  </label>
                </div>
              </div>

              {/* Amenities */}
              <div className="border-t border-slate-100 pt-6">
                <h3 className="text-sm font-semibold text-slate-900 mb-3">Amenities & Rules</h3>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4" />
                    <span className="ml-3 text-sm text-slate-600">Instant Booking</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4" />
                    <span className="ml-3 text-sm text-slate-600">Max 2 in back</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4" />
                    <span className="ml-3 text-sm text-slate-600">Pets allowed</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Results Area */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-slate-900">
                {isLoading ? 'Searching...' : `${trips.length} rides available`}
              </h2>
              {trips.length > 0 && (
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <span>Sort by:</span>
                  <Select defaultValue="departure">
                    <SelectTrigger className="h-8 border-transparent hover:bg-slate-100 w-auto min-w-[120px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="departure">Earliest</SelectItem>
                      <SelectItem value="price_low">Lowest Price</SelectItem>
                      <SelectItem value="price_high">Highest Rating</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            {/* Mismatch Warning */}
            {trips.length > 0 && filters.from && filters.to && !trips.some(t =>
              (t.origin?.toLowerCase().includes(filters.from.toLowerCase()) ||
                t.route?.origin?.toLowerCase().includes(filters.from.toLowerCase())) &&
              (t.destination?.toLowerCase().includes(filters.to.toLowerCase()) ||
                t.route?.destination?.toLowerCase().includes(filters.to.toLowerCase()))
            ) && (
                <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-6 rounded-r-lg">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <Search className="h-5 w-5 text-amber-500" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-amber-800">
                        We could not find a trip matching your request (<strong>{filters.from}</strong> to <strong>{filters.to}</strong>), but here are the available trips.
                      </p>
                    </div>
                  </div>
                </div>
              )}

            {isLoading ? (
              <div className="grid grid-cols-1 gap-4">
                {[1, 2, 3].map(i => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-6">
                      <div className="h-24 bg-slate-200 rounded"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : trips.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">No rides found</h3>
                <p className="text-slate-500 mb-6">We couldn't find any rides matching your search criteria.</p>
                <Button variant="outline" onClick={() => setFilters({
                  from: '', to: '', date: '', minSeats: 1, maxPrice: 1000, vehicleType: 'all'
                })}>
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                <AnimatePresence>
                  {trips.map((trip, index) => (
                    <TripCard
                      key={trip.id}
                      trip={trip}
                      index={index}
                    />
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}