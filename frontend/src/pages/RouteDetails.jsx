import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import {
    MapPin, Clock, DollarSign, Car, Leaf, Calendar, Users,
    ChevronRight, Star, ShieldCheck, Camera, Sun, Info, Map as LucideMap, Search, Zap, Briefcase
} from 'lucide-react';
import { Map as GoogleMap, AdvancedMarker } from '@vis.gl/react-google-maps';

export default function RouteDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    // In a real application, we'd fetch the route details using `id`.
    // For now, we'll use static data that matches the mockup structure.
    const routeData = {
        origin: "Cape Town CBD",
        destination: "Stellenbosch",
        description: "Regular daily commutes and weekend wine trips. Connect with a community of drivers for a comfortable 45-minute journey through the winelands.",
        stats: [
            { icon: <Clock className="w-5 h-5" />, text: "Avg. 45-60 min" },
            { icon: <DollarSign className="w-5 h-5" />, text: "Avg. R120 - R150 per seat" },
            { icon: <Car className="w-5 h-5" />, text: "~15 trips daily" },
            { icon: <Leaf className="w-5 h-5" />, text: "Save ~4kg CO2" }
        ],
        liveTrips: [
            { driver: "David M.", rating: "4.9 (52)", price: "130", time: "08:00 - 08:50", seats: 2, avatar: "https://i.pravatar.cc/150?u=david" },
            { driver: "Sarah L.", rating: "4.8 (120)", price: "120", time: "09:30 - 10:15", instant: true, avatar: "https://i.pravatar.cc/150?u=sarah" },
            { driver: "Thabo N.", rating: "New", price: "115", time: "17:00 - 18:00", pets: true, avatar: "https://i.pravatar.cc/150?u=thabo" }
        ]
    };

    const handleSearchClick = () => {
        navigate(`${createPageUrl('FindRides')}?origin=${routeData.origin}&destination=${routeData.destination}`);
    };

    return (
        <div className="bg-slate-50 min-h-screen pb-12">
            {/* Hero Section */}
            <div className="relative bg-white border-b border-slate-200">
                <div className="absolute inset-0 z-0">
                    <img
                        alt="Scenic drive coastal road"
                        className="w-full h-full object-cover opacity-10"
                        src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
                    <div className="flex flex-col lg:flex-row gap-8 lg:items-center">
                        <div className="lg:w-2/3">
                            <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-cyan-100 text-cyan-700 mb-6">
                                <ShieldCheck className="w-4 h-4 mr-1.5" /> Popular Route
                            </div>
                            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-4 flex items-center flex-wrap gap-2">
                                {routeData.origin} <span className="text-slate-300 font-light mx-2 text-2xl">to</span> {routeData.destination}
                            </h1>
                            <p className="text-lg text-slate-600 mb-8 max-w-2xl leading-relaxed">
                                {routeData.description}
                            </p>

                            <div className="flex flex-wrap gap-6 text-sm text-slate-600">
                                {routeData.stats.map((stat, idx) => (
                                    <div key={idx} className="flex items-center gap-2 font-medium">
                                        <div className="text-[#13daec]">{stat.icon}</div>
                                        <span>{stat.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quick Book Card (Hidden on Mobile) */}
                        <div className="hidden lg:block lg:w-1/3">
                            <div className="bg-white shadow-xl rounded-2xl p-6 border border-slate-100 relative overflow-hidden">
                                <h3 className="text-lg font-bold mb-5 text-slate-900">Search Available Rides</h3>
                                <form className="space-y-4 relative z-10" onSubmit={(e) => { e.preventDefault(); handleSearchClick(); }}>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Date</label>
                                        <div className="relative">
                                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                            <input
                                                className="w-full pl-10 h-11 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-[#13daec]"
                                                type="date"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Passengers</label>
                                            <select className="w-full h-11 bg-slate-50 border border-slate-200 rounded-lg text-sm px-3 focus:ring-2 focus:ring-[#13daec]">
                                                <option>1 Person</option>
                                                <option>2 People</option>
                                                <option>3 People</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Time</label>
                                            <select className="w-full h-11 bg-slate-50 border border-slate-200 rounded-lg text-sm px-3 focus:ring-2 focus:ring-[#13daec]">
                                                <option>Anytime</option>
                                                <option>Morning</option>
                                                <option>Afternoon</option>
                                            </select>
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleSearchClick}
                                        type="button"
                                        className="w-full mt-2 bg-slate-900 text-white hover:bg-slate-800 transition-colors py-3 rounded-lg text-sm font-bold flex justify-center items-center gap-2"
                                    >
                                        Find Rides <ChevronRight className="w-4 h-4" />
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Sticky Search */}
            <div className="lg:hidden p-4 bg-white border-b border-slate-200 sticky top-16 z-40 shadow-sm">
                <button
                    onClick={handleSearchClick}
                    className="w-full flex items-center justify-center gap-2 py-3 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-slate-900 hover:bg-slate-800"
                >
                    <Search className="w-4 h-4" /> Find Rides for This Route
                </button>
            </div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-10">
                        {/* Live Trips Horizontal Scroll */}
                        <section>
                            <div className="flex items-center justify-between mb-5">
                                <h2 className="text-xl font-bold text-slate-900">Live Trips</h2>
                                <button className="text-[#13daec] hover:text-cyan-600 text-sm font-semibold flex items-center" onClick={handleSearchClick}>
                                    View all <ChevronRight className="w-4 h-4 ml-0.5" />
                                </button>
                            </div>

                            <div className="flex overflow-x-auto pb-4 gap-5 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
                                {routeData.liveTrips.map((trip, idx) => (
                                    <div key={idx} className="flex-none w-[300px] bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md hover:border-cyan-200 transition-all">
                                        <div className="p-5">
                                            <div className="flex justify-between items-start mb-5">
                                                <div className="flex items-center gap-3">
                                                    <img alt="Driver" className="w-10 h-10 rounded-full object-cover border border-slate-100" src={trip.avatar} />
                                                    <div>
                                                        <p className="text-sm font-semibold text-slate-900">{trip.driver}</p>
                                                        <div className="flex items-center text-xs text-yellow-500 font-medium">
                                                            <Star className="w-3 h-3 fill-current mr-0.5" /> {trip.rating}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <span className="block text-lg font-bold text-slate-900">R{trip.price}</span>
                                                    <span className="text-[10px] text-slate-500 uppercase tracking-wider">per seat</span>
                                                </div>
                                            </div>

                                            <div className="space-y-3 mb-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex flex-col items-center gap-1">
                                                        <div className="w-2 h-2 rounded-full bg-[#13daec]"></div>
                                                        <div className="w-0.5 h-6 bg-slate-200"></div>
                                                        <div className="w-2 h-2 rounded-full border-2 border-[#13daec] bg-white"></div>
                                                    </div>
                                                    <div className="flex flex-col gap-2 flex-1">
                                                        <div className="flex justify-between text-sm">
                                                            <span className="font-bold text-slate-900">{trip.time.split(' - ')[0]}</span>
                                                            <span className="text-slate-500 truncate w-32">{routeData.origin}</span>
                                                        </div>
                                                        <div className="flex justify-between text-sm">
                                                            <span className="font-bold text-slate-900">{trip.time.split(' - ')[1]}</span>
                                                            <span className="text-slate-500 truncate w-32">{routeData.destination}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                                                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                                                    {trip.instant ? (
                                                        <><Zap className="w-4 h-4 text-green-500" /> <span className="text-green-600">Instant Book</span></>
                                                    ) : trip.pets ? (
                                                        <><Star className="w-4 h-4 text-amber-500" /> <span className="text-amber-600">Pets Allowed</span></>
                                                    ) : (
                                                        <><Users className="w-4 h-4" /> <span>{trip.seats} seats</span></>
                                                    )}
                                                </div>
                                                <Link to={`/TripDetails`} className="text-[#13daec] text-sm font-bold hover:underline">Book</Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Route Details Map/Stats section */}
                        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                            <div className="p-5 border-b border-slate-100">
                                <h2 className="text-lg font-bold text-slate-900">Route Analytics & Details</h2>
                            </div>

                            <div className="relative h-[250px] w-full bg-slate-100 overflow-hidden">
                                <GoogleMap
                                    defaultCenter={{ lat: -33.9285, lng: 18.6421 }}
                                    defaultZoom={10}
                                    mapId="ROUTE_DETAILS_MAP"
                                    disableDefaultUI={true}
                                >
                                    <AdvancedMarker position={{ lat: -33.9249, lng: 18.4241 }} />
                                    <AdvancedMarker position={{ lat: -33.9321, lng: 18.8602 }} />
                                </GoogleMap>
                                <div className="absolute inset-0 flex items-end p-4 pointer-events-none transition-colors">
                                    <button className="bg-white text-slate-900 px-4 py-2 rounded-lg shadow-md font-bold text-sm hover:scale-105 pointer-events-auto transition-transform flex items-center gap-2">
                                        <LucideMap className="w-4 h-4 text-[#13daec]" /> View Interactive Map
                                    </button>
                                </div>
                            </div>

                            <div className="divide-y divide-slate-100">
                                <div className="p-6">
                                    <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                                        <Clock className="w-5 h-5 text-[#13daec]" /> Typical Travel Times
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                            <span className="block text-xs text-slate-500 uppercase tracking-widest font-semibold">Morning Rush (07:00-09:00)</span>
                                            <span className="block text-xl font-bold text-slate-900 mt-1.5">55 - 75 min</span>
                                            <p className="text-sm text-slate-500 mt-1">Heavy traffic on N1 outbound.</p>
                                        </div>
                                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                            <span className="block text-xs text-slate-500 uppercase tracking-widest font-semibold">Off-Peak</span>
                                            <span className="block text-xl font-bold text-slate-900 mt-1.5">40 - 50 min</span>
                                            <p className="text-sm text-slate-500 mt-1">Smooth sailing.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                                        <Briefcase className="w-5 h-5 text-[#13daec]" /> Luggage Guide
                                    </h3>
                                    <p className="text-slate-600 text-sm mb-4">Most drivers on this route are commuters in sedans or hatchbacks.</p>
                                    <ul className="space-y-3">
                                        <li className="flex items-start gap-3">
                                            <ShieldCheck className="w-5 h-5 text-green-500 flex-shrink-0" />
                                            <span className="text-sm text-slate-700">Backpacks and laptop bags are always welcome.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <Info className="w-5 h-5 text-amber-500 flex-shrink-0" />
                                            <span className="text-sm text-slate-700">Large suitcases require prior confirmation with the driver.</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Sidebar */}
                    <aside className="space-y-6">
                        {/* Safety Pledge */}
                        <div className="bg-cyan-50/50 rounded-2xl p-6 border border-cyan-100">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 bg-cyan-100 text-cyan-600 rounded-lg">
                                    <ShieldCheck className="w-5 h-5" />
                                </div>
                                <h3 className="font-bold text-slate-900">Safety First</h3>
                            </div>
                            <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                                Community reviews help maintain quality. We monitor trips in real-time for your safety.
                            </p>
                            <a href="#" className="text-sm font-bold text-cyan-600 hover:text-cyan-700 flex items-center">
                                Read our Safety Pledge <ChevronRight className="w-4 h-4 ml-0.5" />
                            </a>
                        </div>

                        {/* Pickup Points */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                            <h3 className="font-bold text-slate-900 mb-5">Popular Pickup Points</h3>
                            <ul className="space-y-4">
                                {[
                                    { name: "Cape Town Station", area: "CBD" },
                                    { name: "Gardens Centre", area: "Gardens" },
                                    { name: "Observatory Lower Main", area: "Obs" }
                                ].map((point, i) => (
                                    <li key={i} className="flex items-center justify-between group cursor-pointer">
                                        <div className="flex items-center gap-3">
                                            <MapPin className="w-4 h-4 text-slate-400 group-hover:text-[#13daec] transition-colors" />
                                            <span className="text-sm text-slate-700 font-medium group-hover:text-[#13daec] transition-colors">{point.name}</span>
                                        </div>
                                        <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-500 px-2 py-1 rounded">
                                            {point.area}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Promo Block */}
                        <div className="bg-gradient-to-br from-[#13daec] to-cyan-500 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
                            <h3 className="font-bold text-lg mb-2 relative z-10">Travel together?</h3>
                            <p className="text-cyan-50 text-sm mb-5 relative z-10">Share this route with a friend and you both get R50 off your next trip.</p>
                            <button className="w-full py-3 bg-white text-slate-900 rounded-xl text-sm font-bold hover:bg-slate-50 transition-colors relative z-10 shadow-sm">
                                Share Route
                            </button>
                            <div className="absolute -bottom-6 -right-6 opacity-20 transform rotate-12">
                                <Users className="w-32 h-32" />
                            </div>
                        </div>
                    </aside>
                </div>
            </main>
        </div>
    );
}
