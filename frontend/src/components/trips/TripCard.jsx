import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import {
  MapPin,
  Calendar,
  Clock,
  Users,
  Star,
  ChevronRight,
  Car,
  Briefcase
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { format } from "date-fns";

export default function TripCard({ trip, driverProfile, index = 0 }) {
  // Use data passed directly in trip prop (from API)
  // Fallback to empty strings if missing to prevent crashes
  const origin = trip.origin || trip.route?.origin || 'Unknown Origin';
  const destination = trip.destination || trip.route?.destination || 'Unknown Destination';
  const driverName = trip.driver_name || trip.driver?.full_name || 'Driver';
  const driverImage = trip.driver_image || trip.driver?.profile_photo_url;
  const driverRating = trip.driver_rating || trip.driver?.rating || 0;

  const seatsAvailable = trip.seats_available - (trip.seats_booked || 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">

            {/* Time and Route Pipeline */}
            <div className="flex-1 flex gap-6">
              <div className="flex flex-col justify-between items-end text-sm font-semibold text-slate-900 py-1 min-w-[48px]">
                <span>{trip.time || trip.departure_time || '08:00'}</span>
                <span className="text-slate-500 text-xs font-medium py-2">{trip.duration || '2h 15m'}</span>
                <span>{trip.arrival_time || '10:15'}</span>
              </div>

              <div className="flex flex-col items-center py-2 h-full">
                <div className="w-3 h-3 rounded-full border-2 border-blue-600 bg-white shadow-[0_0_0_4px_rgba(37,99,235,0.1)] flex-shrink-0"></div>
                <div className="w-0.5 flex-1 bg-slate-200 my-1"></div>
                <div className="w-3 h-3 rounded-full border-2 border-slate-400 bg-white flex-shrink-0"></div>
              </div>

              <div className="flex flex-col justify-between py-1">
                <div>
                  <p className="font-semibold text-slate-900 text-base">{origin}</p>
                  <p className="text-sm text-slate-500">Pick up point</p>
                </div>
                <div className="mt-8">
                  <p className="font-semibold text-slate-900 text-base">{destination}</p>
                  <p className="text-sm text-slate-500">Drop off point</p>
                </div>
              </div>
            </div>

            {/* Driver & Price */}
            <div className="md:w-64 flex flex-col justify-between border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10 ring-1 ring-slate-100">
                    <AvatarImage src={driverImage} />
                    <AvatarFallback className="bg-blue-100 text-blue-700 font-semibold">{driverName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{driverName}</p>
                    <div className="flex items-center text-xs text-slate-500 mt-0.5">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400 mr-1" />
                      {driverRating > 0 ? <span className="font-medium text-slate-700">{driverRating.toFixed(1)}</span> : 'New'}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-slate-900">R{trip.price || trip.price_per_seat}</p>
                </div>
              </div>

              <Link to={`${createPageUrl('TripDetails')}?id=${trip.id}`} className="w-full mt-auto">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 shadow-sm transition-colors">
                  Select Seat
                </Button>
              </Link>
            </div>
          </div>

          {/* Amenities Strip */}
          <div className="mt-5 pt-4 border-t border-slate-50 flex flex-wrap gap-2 items-center">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Instant Booking
            </div>

            {trip.amenities && trip.amenities.map(amenity => (
              <div key={amenity} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                {amenity}
              </div>
            ))}

            <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ml-auto ${seatsAvailable <= 2 ? 'bg-orange-50 text-orange-700' : 'bg-blue-50 text-blue-700'}`}>
              <Users className="w-3 h-3" /> {seatsAvailable} seats left
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}