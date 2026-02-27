import React from 'react';
import { Link } from 'react-router-dom';
import {
    Map,
    CircleDot,
    MapPin,
    Calendar,
    Clock,
    Car,
    Banknote,
    ArrowRight,
    Maximize,
    User,
    Star,
    Lightbulb,
    Lock
} from 'lucide-react';

export default function DriverTripWizard() {
    return (
        <div className="bg-slate-50 min-h-screen font-sans text-slate-900 flex flex-col pt-10 pb-20">

            <main className="flex-grow px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto">

                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-slate-900">Create a New Trip</h1>
                        <p className="mt-2 text-slate-600">Share your journey and earn money while driving.</p>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-10">
                        <div className="flex items-center justify-between relative">
                            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-slate-200 -z-10 rounded-full"></div>
                            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1/3 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 -z-10 rounded-full"></div>

                            {/* Step 1 */}
                            <div className="flex flex-col items-center gap-2 bg-slate-50 px-2 text-center">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold shadow-lg ring-4 ring-slate-50 transform scale-110">
                                    1
                                </div>
                                <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Route</span>
                            </div>

                            {/* Step 2 */}
                            <div className="flex flex-col items-center gap-2 bg-slate-50 px-2 text-center">
                                <div className="w-10 h-10 rounded-full bg-white border-2 border-slate-300 text-slate-500 flex items-center justify-center font-semibold shadow-sm ring-4 ring-slate-50 transition-colors">
                                    2
                                </div>
                                <span className="text-sm text-slate-500">Vehicle</span>
                            </div>

                            {/* Step 3 */}
                            <div className="flex flex-col items-center gap-2 bg-slate-50 px-2 text-center">
                                <div className="w-10 h-10 rounded-full bg-white border-2 border-slate-300 text-slate-500 flex items-center justify-center font-semibold shadow-sm ring-4 ring-slate-50">
                                    3
                                </div>
                                <span className="text-sm text-slate-500">Pricing</span>
                            </div>

                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* Left Column: Form Steps */}
                        <div className="lg:col-span-2 space-y-6">

                            {/* Active Step: Route Details */}
                            <div className="bg-white shadow-sm rounded-xl p-6 border border-slate-200 relative overflow-hidden">
                                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
                                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-slate-900">
                                    <Map className="text-blue-600 w-6 h-6" />
                                    Route Details
                                </h2>

                                <div className="space-y-6">

                                    {/* Locations */}
                                    <div className="relative">
                                        <div className="absolute left-[1.125rem] top-10 bottom-10 w-0.5 bg-slate-200 z-0"></div>

                                        {/* Pick-up */}
                                        <div className="relative z-10 mb-4">
                                            <label className="block text-sm font-medium text-slate-700 mb-1 ml-10">Pick-up Location</label>
                                            <div className="flex items-center group relative">
                                                <div className="absolute left-3 text-blue-500">
                                                    <CircleDot className="w-5 h-5" />
                                                </div>
                                                <input
                                                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-slate-900 placeholder-slate-400"
                                                    placeholder="City, Airport, or Address"
                                                    type="text"
                                                    defaultValue="San Francisco, CA"
                                                />
                                            </div>
                                        </div>

                                        {/* Drop-off */}
                                        <div className="relative z-10">
                                            <label className="block text-sm font-medium text-slate-700 mb-1 ml-10">Drop-off Location</label>
                                            <div className="flex items-center relative">
                                                <div className="absolute left-3 text-red-500">
                                                    <MapPin className="w-5 h-5 fill-current" />
                                                </div>
                                                <input
                                                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all text-slate-900 placeholder-slate-400"
                                                    placeholder="City, Airport, or Address"
                                                    type="text"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Date & Time */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-3.5 text-slate-400">
                                                    <Calendar className="w-5 h-5" />
                                                </span>
                                                <input
                                                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none text-slate-900"
                                                    type="date"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Time</label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-3.5 text-slate-400">
                                                    <Clock className="w-5 h-5" />
                                                </span>
                                                <input
                                                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none text-slate-900"
                                                    type="time"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Stops Checkbox */}
                                    <div className="flex items-center gap-3 p-4 bg-blue-50/50 rounded-lg border border-blue-100/50">
                                        <input
                                            className="h-5 w-5 text-blue-600 rounded focus:ring-blue-600 border-slate-300 bg-white"
                                            id="stops"
                                            type="checkbox"
                                        />
                                        <label className="text-sm font-medium text-slate-900 cursor-pointer" htmlFor="stops">
                                            I am willing to make stops along the way
                                        </label>
                                    </div>

                                </div>
                            </div>

                            {/* Locked Step: Vehicle & Capacity */}
                            <div className="bg-white shadow-sm rounded-xl p-6 border border-slate-200 opacity-50 pointer-events-none">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-xl font-semibold flex items-center gap-2 text-slate-500">
                                        <Car className="w-6 h-6" />
                                        Vehicle & Capacity
                                    </h2>
                                    <Lock className="text-slate-400 w-5 h-5" />
                                </div>
                            </div>

                            {/* Locked Step: Pricing */}
                            <div className="bg-white shadow-sm rounded-xl p-6 border border-slate-200 opacity-50 pointer-events-none">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-xl font-semibold flex items-center gap-2 text-slate-500">
                                        <Banknote className="w-6 h-6" />
                                        Pricing
                                    </h2>
                                    <Lock className="text-slate-400 w-5 h-5" />
                                </div>
                            </div>

                            {/* Action */}
                            <div className="flex justify-end pt-4">
                                <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-blue-600 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2">
                                    Next Step
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>

                        </div>

                        {/* Right Column: Summary & Map */}
                        <div className="lg:col-span-1 space-y-6">

                            {/* Map Preview */}
                            <div className="bg-white shadow-md rounded-xl overflow-hidden border border-slate-200 h-80 relative group">
                                <div className="absolute inset-0 bg-slate-200">
                                    <img
                                        alt="Map view showing route"
                                        className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-500"
                                        src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800"
                                    />
                                </div>
                                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm p-3 rounded-lg shadow-sm border border-slate-100">
                                    <div className="flex justify-between items-center text-xs text-slate-500 mb-1">
                                        <span>Est. Distance</span>
                                        <span>Est. Time</span>
                                    </div>
                                    <div className="flex justify-between items-center font-bold text-slate-900">
                                        <span>-- km</span>
                                        <span>-- hr -- min</span>
                                    </div>
                                </div>
                                <div className="absolute top-4 right-4">
                                    <button className="bg-white p-2 rounded-lg shadow-md hover:bg-slate-50 text-slate-600">
                                        <Maximize className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Trip Summary */}
                            <div className="bg-white shadow-md rounded-xl p-6 border border-slate-200 relative overflow-hidden">
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-600 to-indigo-600"></div>
                                <h3 className="font-semibold text-lg mb-4 text-slate-900">Trip Summary</h3>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
                                            <User className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500">Driver</p>
                                            <p className="font-medium text-sm text-slate-900">Vukosi Makhubele</p>
                                            <div className="flex items-center text-yellow-500 text-xs mt-0.5">
                                                <Star className="w-3.5 h-3.5 fill-current" />
                                                <span className="ml-1 text-slate-500">4.9 (120 trips)</span>
                                            </div>
                                        </div>
                                    </div>
                                    <hr className="border-slate-200" />
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-slate-500">Vehicle</span>
                                        <span className="text-sm font-medium text-slate-900">Toyota Corolla</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-slate-500">Available Seats</span>
                                        <span className="text-sm font-medium text-slate-900">--</span>
                                    </div>
                                </div>

                                {/* Tip Card */}
                                <div className="mt-6 bg-yellow-50 border border-yellow-100 rounded-lg p-3 flex gap-3">
                                    <Lightbulb className="text-yellow-600 w-5 h-5 flex-shrink-0 mt-0.5" />
                                    <p className="text-xs text-yellow-800">
                                        Tip: Trips posted at least 2 days in advance get 40% more bookings.
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}
