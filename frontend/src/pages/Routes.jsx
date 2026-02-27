import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import {
  MapPin, Clock, Search, ArrowUpDown, Heart, Repeat, Star,
  Zap, ShieldCheck, Camera, Sun, Users, PiggyBank, Briefcase,
  Wifi, Map, Sparkles, Car
} from "lucide-react";
import { motion } from "framer-motion";

export default function Routes() {
  const [searchOrigin, setSearchOrigin] = useState('');
  const [searchDestination, setSearchDestination] = useState('');
  const [activeRegion, setActiveRegion] = useState('All Regions');

  const { data: routes, isLoading } = useQuery({
    queryKey: ['routes'],
    queryFn: () => base44.entities.FixedRoute.filter({ is_active: true }, '-base_price_rand'),
    initialData: [],
  });

  const filteredRoutes = routes.filter(route => {
    let matchesOrigin = true;
    let matchesDest = true;
    if (searchOrigin) matchesOrigin = route.origin?.toLowerCase().includes(searchOrigin.toLowerCase());
    if (searchDestination) matchesDest = route.destination?.toLowerCase().includes(searchDestination.toLowerCase());
    return matchesOrigin && matchesDest;
  });

  const regions = ['All Regions', 'Western Cape', 'Gauteng', 'KwaZulu-Natal', 'Eastern Cape'];

  const getMockupData = (index) => {
    const types = [
      { tag: 'Popular', color: 'text-blue-700 bg-blue-100 ring-blue-700/10', icon1: <Clock className="w-4 h-4 text-cyan-500" />, text1: '~45 Mins Travel', icon2: <Repeat className="w-4 h-4 text-cyan-500" />, text2: 'Frequent departures', icon3: <Star className="w-4 h-4 text-cyan-500" />, text3: 'Rated 4.8/5' },
      { tag: 'Business', color: 'text-indigo-700 bg-indigo-100 ring-indigo-700/10', icon1: <Clock className="w-4 h-4 text-cyan-500" />, text1: '~25 Mins Travel', icon2: <Zap className="w-4 h-4 text-cyan-500" />, text2: 'Express Route', icon3: <ShieldCheck className="w-4 h-4 text-cyan-500" />, text3: 'Trusted Community' },
      { tag: 'Leisure', color: 'text-green-700 bg-green-100 ring-green-700/10', icon1: <Clock className="w-4 h-4 text-cyan-500" />, text1: '~60 Mins Travel', icon2: <Camera className="w-4 h-4 text-cyan-500" />, text2: 'Scenic Stops', icon3: <Sun className="w-4 h-4 text-cyan-500" />, text3: 'Best in Morning' },
      { tag: 'Commute', color: 'text-purple-700 bg-purple-100 ring-purple-700/10', icon1: <Clock className="w-4 h-4 text-cyan-500" />, text1: '~35 Mins Travel', icon2: <Users className="w-4 h-4 text-cyan-500" />, text2: 'Carpool Options', icon3: <PiggyBank className="w-4 h-4 text-cyan-500" />, text3: 'Most Economical' }
    ];
    return types[index % types.length];
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-slate-50 overflow-x-hidden">

      {/* Hero Search Section */}
      <div className="w-full bg-slate-900 py-12 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <img
            alt="South African highway traffic at sunset"
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
          <span className="inline-flex items-center rounded-full bg-cyan-500/20 px-3 py-1 text-xs font-medium text-cyan-400 ring-1 ring-inset ring-cyan-500/30 mb-6 tracking-wide">
            Updated Daily Schedules
          </span>
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-4 max-w-3xl">
            Find Your Way: Popular Rideshare Routes
          </h1>
          <p className="text-slate-300 text-base md:text-lg mb-8 max-w-2xl">
            Explore the most frequented routes across South Africa with transparent pricing, live availability, and reliable schedules.
          </p>

          <div className="w-full max-w-3xl bg-white p-2 rounded-xl shadow-xl flex flex-col sm:flex-row gap-2">
            <div className="flex-1 flex items-center px-4 h-14 border-b sm:border-b-0 sm:border-r border-slate-200">
              <MapPin className="text-slate-400 w-5 h-5 mr-3" />
              <input
                className="w-full bg-transparent border-none focus:ring-0 focus:outline-none text-slate-900 placeholder-slate-400 text-lg"
                placeholder="From (e.g. Cape Town)"
                type="text"
                value={searchOrigin}
                onChange={(e) => setSearchOrigin(e.target.value)}
              />
            </div>
            <div className="flex-1 flex items-center px-4 h-14">
              <MapPin className="text-slate-400 w-5 h-5 mr-3" />
              <input
                className="w-full bg-transparent border-none focus:ring-0 focus:outline-none text-slate-900 placeholder-slate-400 text-lg"
                placeholder="To (e.g. Stellenbosch)"
                type="text"
                value={searchDestination}
                onChange={(e) => setSearchDestination(e.target.value)}
              />
            </div>
            <button className="bg-[#13daec] hover:bg-cyan-400 text-slate-900 font-bold h-14 px-8 rounded-lg transition-colors flex items-center justify-center gap-2 w-full sm:w-auto text-lg">
              <Search className="w-5 h-5" />
              <span>Search</span>
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {/* Regional Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center border-b border-slate-200 pb-2 mb-8 gap-4 overflow-x-auto w-full scrollbar-hide">
          <div className="flex gap-8 min-w-max px-2">
            {regions.map((region) => (
              <button
                key={region}
                onClick={() => setActiveRegion(region)}
                className={`flex flex-col items-center border-b-[3px] pb-3 transition-colors ${activeRegion === region
                  ? 'border-b-[#13daec] text-slate-900'
                  : 'border-b-transparent hover:border-b-slate-300 text-slate-500'
                  }`}
              >
                <span className="text-sm font-bold tracking-wide">{region}</span>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-500 whitespace-nowrap pl-4">
            <ArrowUpDown className="w-4 h-4" />
            <span>Sort by: Popularity</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Main Route List */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Top Routes matching '{activeRegion}'</h2>
                <span className="text-[#13daec] text-sm font-bold hover:underline cursor-pointer">View All ({filteredRoutes.length})</span>
              </div>

              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="animate-pulse bg-white border border-slate-200 rounded-xl p-5 h-[280px]"></div>
                  ))}
                </div>
              ) : filteredRoutes.length === 0 ? (
                <div className="bg-white border text-center border-dashed rounded-xl border-slate-300 p-12">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">No routes found</h3>
                  <p className="text-slate-500">Try adjusting your origin or destination.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredRoutes.map((route, index) => {
                    const styleData = getMockupData(index);
                    return (
                      <motion.div
                        key={route.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="group relative flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 transition-all hover:shadow-xl hover:border-[#13daec]/50"
                      >
                        <div className="mb-6">
                          <div className="flex items-center justify-between mb-3">
                            <span className={`rounded-md px-2.5 py-1 text-xs font-bold ring-1 ring-inset ${styleData.color}`}>
                              {route.municipality_type || styleData.tag}
                            </span>
                            <button className="text-slate-300 hover:text-red-500 transition-colors">
                              <Heart className="w-5 h-5" />
                            </button>
                          </div>
                          <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-[#13daec] transition-colors truncate">
                            {route.origin} <span className="text-slate-300 mx-1">➝</span> {route.destination}
                          </h3>
                          <p className="text-sm text-slate-500 mb-5 truncate">
                            {route.route_name || 'Standard Route'}
                          </p>
                          <div className="flex items-baseline gap-1 text-slate-900 mb-5">
                            <span className="text-3xl font-black tracking-tight">R{route.base_price_rand}</span>
                            <span className="text-sm font-medium text-slate-500">avg. price</span>
                          </div>

                          <div className="space-y-2.5">
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                              {styleData.icon1}
                              <span>{route.estimated_duration_minutes ? `~${route.estimated_duration_minutes} Mins Travel Time` : styleData.text1}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                              {styleData.icon2}
                              <span>{styleData.text2}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                              {styleData.icon3}
                              <span>{styleData.text3}</span>
                            </div>
                          </div>
                        </div>

                        <Link
                          to={`${createPageUrl('Routes')}/${route.id}`}
                          className="mt-auto flex w-full items-center justify-center rounded-lg bg-slate-100 py-3 text-sm font-bold text-slate-900 transition-colors hover:bg-[#13daec]"
                        >
                          View Schedule
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-8">
            {/* Map Widget */}
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Route Coverage Map</h3>
              <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-slate-200 group cursor-pointer">
                <img
                  alt="Abstract map"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80"
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/30 transition-colors duration-300">
                  <button className="bg-white text-slate-900 px-4 py-2 rounded-lg font-bold text-sm shadow-xl flex items-center gap-2 transform group-hover:-translate-y-1 transition-transform">
                    <Map className="w-4 h-4 text-[#13daec]" /> Interactive Map
                  </button>
                </div>
              </div>
            </div>

            {/* Suggested Routes List */}
            <div className="rounded-xl bg-slate-50 border border-slate-200 p-6">
              <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900 mb-5">
                <Sparkles className="w-5 h-5 text-[#13daec]" /> Suggested for You
              </h3>
              <ul className="space-y-4">
                <li className="pb-4 border-b border-slate-200 last:border-0 last:pb-0">
                  <Link to={`/Routes/sample`} className="group block">
                    <div className="flex justify-between items-start mb-1.5">
                      <span className="font-bold text-slate-800 group-hover:text-[#13daec] transition-colors">Durban ➝ Umhlanga</span>
                      <span className="text-xs font-semibold bg-green-100 text-green-700 px-2 py-0.5 rounded border border-green-200">Fast</span>
                    </div>
                    <div className="flex justify-between text-sm text-slate-500">
                      <span>~20 mins</span>
                      <span className="font-medium text-slate-900">R60</span>
                    </div>
                  </Link>
                </li>
                <li className="pb-4 border-b border-slate-200 last:border-0 last:pb-0">
                  <Link to={`/Routes/sample`} className="group block">
                    <div className="flex justify-between items-start mb-1.5">
                      <span className="font-bold text-slate-800 group-hover:text-[#13daec] transition-colors">George ➝ Knysna</span>
                      <span className="text-xs font-semibold bg-blue-100 text-blue-700 px-2 py-0.5 rounded border border-blue-200">Scenic</span>
                    </div>
                    <div className="flex justify-between text-sm text-slate-500">
                      <span>~50 mins</span>
                      <span className="font-medium text-slate-900">R110</span>
                    </div>
                  </Link>
                </li>
                <li className="pb-4 border-b border-slate-200 last:border-0 last:pb-0">
                  <Link to={`/Routes/sample`} className="group block">
                    <div className="flex justify-between items-start mb-1.5">
                      <span className="font-bold text-slate-800 group-hover:text-[#13daec] transition-colors">Soweto ➝ JHB CBD</span>
                      <span className="text-xs font-semibold bg-amber-100 text-amber-700 px-2 py-0.5 rounded border border-amber-200">Popular</span>
                    </div>
                    <div className="flex justify-between text-sm text-slate-500">
                      <span>~30 mins</span>
                      <span className="font-medium text-slate-900">R35</span>
                    </div>
                  </Link>
                </li>
              </ul>
              <button className="mt-6 w-full rounded-lg border border-slate-300 bg-white py-2.5 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-50">
                See More Suggestions
              </button>
            </div>

            {/* Driver Ad */}
            <div className="rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white relative overflow-hidden shadow-lg">
              <div className="relative z-10">
                <h3 className="text-lg font-bold mb-2">Drive with UrbanSmart</h3>
                <p className="text-sm text-slate-300 mb-5 leading-relaxed">Earn money on your own schedule. Sign up to become a driver today.</p>
                <button className="bg-[#13daec] hover:bg-cyan-400 text-slate-900 text-sm font-bold px-5 py-2.5 rounded-lg transition-colors shadow-md">
                  Become a Driver
                </button>
              </div>
              <div className="absolute -right-6 -bottom-6 text-slate-700 opacity-20 transform -rotate-12">
                <Car className="w-40 h-40" />
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}