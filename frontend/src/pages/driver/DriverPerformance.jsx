import React from 'react';
import {
    Car,
    TrendingUp,
    Ticket,
    Banknote,
    Star,
    StarHalf,
    Users,
    MessageSquare,
    ShieldCheck,
    Plus,
    ThumbsUp,
    CheckCircle2,
    Fuel,
    Wrench,
    ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DriverPerformance() {
    return (
        <div className="bg-slate-50 min-h-screen font-sans text-slate-900 pb-20">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Driver Dashboard</h1>
                        <p className="mt-2 text-slate-500">Welcome back, Vukosi Makhubele. Here's your performance overview.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-colors flex items-center gap-2">
                            <MessageSquare className="w-5 h-5" />
                            Messages
                        </button>
                        <div className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 border border-blue-100">
                            <ShieldCheck className="w-5 h-5" />
                            Profile Verified
                        </div>
                        <Link to="/driver/create-trip" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-all duration-200 flex items-center gap-2">
                            <Plus className="w-5 h-5" />
                            Post Trip
                        </Link>
                    </div>
                </div>

                {/* Highlight Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-start justify-between relative overflow-hidden group">
                        <div className="absolute inset-0 bg-blue-50/50 opacity-50"></div>
                        <div className="relative z-10">
                            <p className="text-sm font-medium text-slate-500">Total Trips</p>
                            <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mt-1">142</h3>
                            <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                                <TrendingUp className="w-3 h-3" /> +12% this month
                            </p>
                        </div>
                        <div className="relative z-10 p-3 bg-blue-50 rounded-lg text-blue-600 shadow-sm">
                            <Car className="w-6 h-6" />
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-start justify-between relative overflow-hidden">
                        <div className="relative z-10">
                            <p className="text-sm font-medium text-slate-500">Upcoming Bookings</p>
                            <h3 className="text-3xl font-bold text-slate-900 mt-1">8</h3>
                            <p className="text-xs text-slate-500 mt-2">Next trip in 2h</p>
                        </div>
                        <div className="relative z-10 p-3 bg-purple-50 rounded-lg text-purple-600">
                            <Ticket className="w-6 h-6" />
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-start justify-between relative overflow-hidden">
                        <div className="absolute inset-0 bg-blue-50/50 opacity-50"></div>
                        <div className="relative z-10">
                            <p className="text-sm font-medium text-slate-500">Total Earnings</p>
                            <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mt-1">R 32,400</h3>
                            <p className="text-xs text-blue-600 mt-2 flex items-center gap-1">
                                +R 4,500 this week
                            </p>
                        </div>
                        <div className="relative z-10 p-3 bg-blue-50 rounded-lg text-blue-600 shadow-sm">
                            <Banknote className="w-6 h-6" />
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-start justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-500">Driver Rating</p>
                            <h3 className="text-3xl font-bold text-slate-900 mt-1">4.9</h3>
                            <div className="flex mt-2 text-yellow-400">
                                <Star className="w-4 h-4 fill-current" />
                                <Star className="w-4 h-4 fill-current" />
                                <Star className="w-4 h-4 fill-current" />
                                <Star className="w-4 h-4 fill-current" />
                                <StarHalf className="w-4 h-4 fill-current text-yellow-400" />
                            </div>
                        </div>
                        <div className="p-3 bg-yellow-50 rounded-lg text-yellow-600">
                            <Star className="w-6 h-6 fill-current" />
                        </div>
                    </div>

                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    <div className="lg:col-span-2 space-y-6">

                        {/* Today's Schedule */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                                <h2 className="text-lg font-semibold text-slate-900">Today's Schedule</h2>
                                <button className="text-sm text-blue-600 font-medium hover:underline hover:text-blue-700 transition-colors">
                                    View Calendar
                                </button>
                            </div>
                            <div className="p-6">

                                <div className="relative pl-8 pb-8 border-l-2 border-blue-600/30">
                                    <span className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 border-4 border-white shadow-sm"></span>
                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                                        <div>
                                            <span className="inline-block px-2 py-1 text-xs font-semibold rounded bg-blue-50 text-blue-600 mb-2">Up Next • 14:00</span>
                                            <h4 className="text-base font-semibold text-slate-900">Downtown to Airport Terminal 1</h4>
                                            <p className="text-sm text-slate-500 mt-1 flex items-center gap-1">
                                                <Users className="w-4 h-4" /> 3 Passengers • Toyota Camry
                                            </p>
                                        </div>
                                        <button className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-3 py-1.5 rounded text-sm font-medium transition-colors">
                                            Details
                                        </button>
                                    </div>
                                </div>

                                <div className="relative pl-8 pb-8 border-l-2 border-slate-200">
                                    <span className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-slate-300 border-4 border-white"></span>
                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                                        <div>
                                            <span className="inline-block px-2 py-1 text-xs font-semibold rounded bg-slate-100 text-slate-600 mb-2">17:30</span>
                                            <h4 className="text-base font-medium text-slate-900">Airport Terminal 1 to West Side Mall</h4>
                                            <p className="text-sm text-slate-500 mt-1 flex items-center gap-1">
                                                <Users className="w-4 h-4" /> 2 Passengers • Toyota Camry
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="relative pl-8 border-l-2 border-slate-200">
                                    <span className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-slate-300 border-4 border-white"></span>
                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                                        <div>
                                            <span className="inline-block px-2 py-1 text-xs font-semibold rounded bg-slate-100 text-slate-600 mb-2">20:00</span>
                                            <h4 className="text-base font-medium text-slate-900">West Side Mall to North Campus</h4>
                                            <p className="text-sm text-slate-500 mt-1 flex items-center gap-1">
                                                <Users className="w-4 h-4" /> 4 Passengers • Toyota Camry
                                            </p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* Weekly Earnings Chart Placeholder */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-lg font-semibold text-slate-900">Weekly Earnings</h2>
                                <select className="bg-slate-50 border-slate-200 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block p-2 outline-none">
                                    <option>This Week</option>
                                    <option>Last Week</option>
                                    <option>Last Month</option>
                                </select>
                            </div>

                            <div className="h-48 flex items-end justify-between gap-2 px-2">
                                <div className="w-full bg-blue-100 rounded-t-sm h-[40%] relative group">
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">R 1,200</div>
                                </div>
                                <div className="w-full bg-blue-100 rounded-t-sm h-[65%] relative group">
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">R 1,800</div>
                                </div>
                                <div className="w-full bg-blue-100 rounded-t-sm h-[50%] relative group">
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">R 1,500</div>
                                </div>
                                <div className="w-full bg-blue-100 rounded-t-sm h-[80%] relative group">
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">R 2,400</div>
                                </div>
                                <div className="w-full bg-gradient-to-t from-blue-600 to-indigo-600 rounded-t-sm h-[95%] shadow-md relative group">
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">R 3,100</div>
                                </div>
                                <div className="w-full bg-slate-100 rounded-t-sm h-[20%] relative group">
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">R 500</div>
                                </div>
                                <div className="w-full bg-slate-100 rounded-t-sm h-[10%] relative group">
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">R 200</div>
                                </div>
                            </div>

                            <div className="flex justify-between text-xs text-slate-500 mt-2 px-2">
                                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span className="font-bold text-blue-600">Fri</span><span>Sat</span><span>Sun</span>
                            </div>
                        </div>

                    </div>

                    <div className="space-y-6">

                        {/* Performance Insights */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                            <h2 className="text-lg font-semibold text-slate-900 mb-4">Performance Insights</h2>
                            <div className="space-y-4">

                                <div className="flex items-center gap-4 p-3 bg-green-50 rounded-lg border border-green-100">
                                    <div className="bg-white p-2 rounded-full shadow-sm">
                                        <ThumbsUp className="w-5 h-5 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-slate-900">Great Service!</p>
                                        <p className="text-xs text-slate-500">Your rating went up by 0.2 this week.</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                                    <div className="bg-white p-2 rounded-full shadow-sm">
                                        <CheckCircle2 className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-slate-900">High Completion Rate</p>
                                        <p className="text-xs text-slate-500">You completed 98% of your accepted rides.</p>
                                    </div>
                                </div>

                            </div>
                            <button className="w-full mt-4 text-sm text-blue-600 font-medium hover:underline hover:text-blue-700 flex items-center justify-center gap-1 transition-colors">
                                View Detailed Report <ArrowRight className="w-4 h-4 text-blue-600" />
                            </button>
                        </div>

                        {/* Recent Reviews */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                            <div className="px-6 py-4 border-b border-slate-100">
                                <h2 className="text-lg font-semibold text-slate-900">Recent Reviews</h2>
                            </div>
                            <div className="divide-y divide-slate-100">

                                <div className="p-4 hover:bg-slate-50 transition-colors">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex items-center gap-2">
                                            <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">SJ</div>
                                            <span className="text-sm font-medium text-slate-900">Sarah J.</span>
                                        </div>
                                        <div className="flex text-yellow-400">
                                            <Star className="w-3.5 h-3.5 fill-current" />
                                            <Star className="w-3.5 h-3.5 fill-current" />
                                            <Star className="w-3.5 h-3.5 fill-current" />
                                            <Star className="w-3.5 h-3.5 fill-current" />
                                            <Star className="w-3.5 h-3.5 fill-current" />
                                        </div>
                                    </div>
                                    <p className="text-xs text-slate-500 line-clamp-2">"Vukosi was very polite and the car was spotless. Great music choice too! Would definitely ride again."</p>
                                    <p className="text-[10px] text-slate-400 mt-2">Yesterday</p>
                                </div>

                                <div className="p-4 hover:bg-slate-50 transition-colors">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex items-center gap-2">
                                            <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">MK</div>
                                            <span className="text-sm font-medium text-slate-900">Mike K.</span>
                                        </div>
                                        <div className="flex">
                                            <Star className="w-3.5 h-3.5 text-yellow-400 fill-current" />
                                            <Star className="w-3.5 h-3.5 text-yellow-400 fill-current" />
                                            <Star className="w-3.5 h-3.5 text-yellow-400 fill-current" />
                                            <Star className="w-3.5 h-3.5 text-yellow-400 fill-current" />
                                            <Star className="w-3.5 h-3.5 text-slate-300 fill-current" />
                                        </div>
                                    </div>
                                    <p className="text-xs text-slate-500 line-clamp-2">"Good drive, got to the destination on time. A bit of traffic but handled well."</p>
                                    <p className="text-[10px] text-slate-400 mt-2">2 days ago</p>
                                </div>

                            </div>
                            <div className="p-4 border-t border-slate-100">
                                <button className="w-full py-2 text-sm text-slate-600 hover:text-blue-600 font-medium transition-colors">
                                    View All Reviews
                                </button>
                            </div>
                        </div>

                        {/* Vehicle Status */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="text-lg font-semibold text-slate-900">Vehicle Status</h2>
                                    <p className="text-sm text-slate-500 mt-1">Toyota Camry • LIC-492</p>
                                </div>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    Active
                                </span>
                            </div>
                            <div className="mt-4 grid grid-cols-2 gap-4">
                                <div className="text-center p-3 bg-slate-50 rounded-lg">
                                    <Fuel className="w-5 h-5 text-slate-400 mb-1 mx-auto" />
                                    <p className="text-xs text-slate-500">Fuel Level</p>
                                    <p className="font-semibold text-slate-900">75%</p>
                                </div>
                                <div className="text-center p-3 bg-slate-50 rounded-lg">
                                    <Wrench className="w-5 h-5 text-slate-400 mb-1 mx-auto" />
                                    <p className="text-xs text-slate-500">Service Due</p>
                                    <p className="font-semibold text-slate-900">3,400km</p>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </main>
        </div>
    );
}
