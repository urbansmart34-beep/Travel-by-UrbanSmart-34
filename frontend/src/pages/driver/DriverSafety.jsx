import React from 'react';
import { Link } from 'react-router-dom';
import {
    ShieldCheck,
    ShieldPlus,
    LifeBuoy,
    IdCard,
    UserCheck,
    CreditCard,
    MapPin,
    Route,
    PhoneOff,
    Users,
    Info,
    ArrowRight,
    Shield,
    Lock
} from 'lucide-react';

export default function DriverSafety() {
    return (
        <div className="bg-slate-50 min-h-screen font-sans text-slate-900 pb-20">

            {/* Header SOS Area - We include this below the main nav to give context, though the mockup shows a full header. */}
            <div className="bg-slate-900 text-white px-4 sm:px-6 lg:px-8 py-4 sticky top-0 z-40 border-b border-slate-800 shadow-md flex justify-between items-center">
                <div>
                    <h2 className="text-lg font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Driver Safety & Security</h2>
                </div>
                <div>
                    <button className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white px-4 py-2 rounded-lg font-bold shadow-lg shadow-red-500/30 transition-all duration-200">
                        <LifeBuoy className="w-5 h-5" />
                        Emergency SOS
                    </button>
                </div>
            </div>

            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">

                {/* Hero Section */}
                <section className="flex flex-col md:flex-row items-center gap-8 lg:gap-12">

                    <div className="w-full md:w-1/2 rounded-2xl overflow-hidden relative shadow-xl aspect-[4/3] bg-slate-900 group">
                        <img
                            src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80"
                            alt="Safe driver smiling in car interior"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent flex items-end p-6">
                            <div className="flex gap-2 flex-wrap">
                                <div className="bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-bold text-slate-800 shadow-sm">
                                    <ShieldCheck className="w-4 h-4 text-blue-600" /> Verified Driver
                                </div>
                                <div className="bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-bold text-slate-800 shadow-sm">
                                    <ShieldPlus className="w-4 h-4 text-green-600" /> Safety Certified
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full md:w-1/2 flex flex-col gap-6">
                        <div>
                            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 mb-4 leading-tight">
                                Safety First <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Design</span>
                            </h1>
                            <p className="text-lg text-slate-600 leading-relaxed">
                                Your safety is our engine. Driving with UrbanSmart means you are never alone on South African roads. We combine advanced technology with 24/7 support.
                            </p>
                        </div>
                        <div className="flex gap-4">
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold shadow-md shadow-blue-500/20 transition-colors">
                                Learn More
                            </button>
                            <button className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-900 px-6 py-3 rounded-lg font-bold shadow-sm transition-colors">
                                View Guidelines
                            </button>
                        </div>
                    </div>
                </section>

                {/* Passenger Verification */}
                <section className="border-t border-slate-200 pt-16">
                    <div className="max-w-2xl mb-10">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Passenger Verification Standards</h2>
                        <p className="text-slate-600 text-lg">
                            Every passenger goes through a rigorous multi-step verification process before they can book a ride, ensuring you know exactly who is getting in your vehicle.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow group">
                            <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                <IdCard className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">ID Verification</h3>
                            <p className="text-sm text-slate-500 leading-relaxed">Government-issued ID checks linked to Home Affairs database for all riders.</p>
                        </div>

                        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow group">
                            <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                <UserCheck className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">Facial Recognition</h3>
                            <p className="text-sm text-slate-500 leading-relaxed">Real-time selfie matching to ensure the account holder is the passenger.</p>
                        </div>

                        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow group">
                            <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                <CreditCard className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">Secure Payment</h3>
                            <p className="text-sm text-slate-500 leading-relaxed">Verified digital payment methods reduce cash handling risks.</p>
                        </div>
                    </div>
                </section>

                {/* Real-time Monitoring */}
                <section className="border-t border-slate-200 pt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Real-Time Trip Monitoring</h2>
                        <p className="text-slate-600 text-lg mb-8">
                            Our dedicated safety team monitors trips 24/7 for anomalies. We track route deviations, unexpected long stops, and traffic patterns in major SA metros.
                        </p>

                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <MapPin className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                                <div>
                                    <h4 className="font-bold text-slate-900">Live Location Sharing</h4>
                                    <p className="text-sm text-slate-500 mt-1">Share your live location with trusted contacts instantly.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <Route className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                                <div>
                                    <h4 className="font-bold text-slate-900">Route Deviation Alerts</h4>
                                    <p className="text-sm text-slate-500 mt-1">Automatic alerts sent to HQ if you go significantly off-route.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <PhoneOff className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                                <div>
                                    <h4 className="font-bold text-slate-900">Anonymized Calling</h4>
                                    <p className="text-sm text-slate-500 mt-1">Phone numbers are masked to protect your privacy.</p>
                                </div>
                            </div>
                        </div>

                        <button className="mt-8 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-lg font-bold shadow-md transition-colors w-full sm:w-auto">
                            View Live Map Demo
                        </button>
                    </div>

                    <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-square sm:aspect-video lg:aspect-[4/5] bg-slate-800 group">
                        <img
                            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80"
                            alt="Live tracking map"
                            className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500 grayscale group-hover:grayscale-0"
                        />
                        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md p-2 rounded-lg shadow-lg border border-slate-200">
                            <span className="flex items-center gap-2 text-xs font-bold text-green-600 uppercase tracking-wide px-1">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                                Monitoring Active
                            </span>
                        </div>

                        <div className="absolute bottom-6 left-6 right-6">
                            <div className="bg-white p-4 rounded-xl shadow-2xl border border-slate-200 flex items-center gap-4">
                                <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2.5 rounded-full text-white shadow-inner">
                                    <ShieldCheck className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-0.5">Status</p>
                                    <p className="text-sm font-black text-slate-900">Secure Route • ETA 12 min</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Emergency Setup Guide */}
                <section className="border-t border-slate-200 pt-16">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-1">
                            <h2 className="text-3xl font-bold text-slate-900 mb-4">Emergency Contact Setup Guide</h2>
                            <p className="text-slate-600 mb-6">
                                Prepare for the unexpected. Set up your trusted contacts now so help is just one tap away.
                            </p>

                            <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-start gap-3">
                                <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                <p className="text-sm text-blue-900 leading-relaxed font-medium">
                                    Your trusted contacts will receive a live link to your trip if you activate SOS.
                                </p>
                            </div>
                        </div>

                        <div className="lg:col-span-2 space-y-4">
                            <div className="bg-white border border-slate-200 p-5 rounded-xl flex items-start sm:items-center gap-5 shadow-sm">
                                <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold flex-shrink-0 shadow-sm">1</div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900">Open App Settings</h3>
                                    <p className="text-sm text-slate-500 mt-1">Navigate to the 'Safety' tab in your driver app profile.</p>
                                </div>
                            </div>

                            <div className="bg-blue-50/50 border border-blue-200 p-5 rounded-xl flex flex-col sm:flex-row sm:items-center gap-5 shadow-sm relative overflow-hidden">
                                <div className="absolute -right-6 -top-6 text-blue-100 opacity-50 z-0">
                                    <Users className="w-32 h-32" />
                                </div>
                                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold flex-shrink-0 shadow-md z-10">2</div>
                                <div className="z-10">
                                    <h3 className="text-lg font-bold text-slate-900">Add Trusted Contacts</h3>
                                    <p className="text-sm text-slate-700 mt-1 mb-3">Select up to 5 contacts from your phone book. They don't need the app to receive alerts.</p>
                                    <button className="text-blue-600 font-bold text-sm flex items-center gap-1 hover:text-blue-700 transition-colors group">
                                        Add Contacts Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>

                            <div className="bg-white border border-slate-200 p-5 rounded-xl flex items-start sm:items-center gap-5 shadow-sm">
                                <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center font-bold flex-shrink-0">3</div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900">Enable Voice SOS</h3>
                                    <p className="text-sm text-slate-500 mt-1">Set up a voice phrase to trigger emergency protocols hands-free.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/*Footer Brands */}
                <div className="border-t border-slate-200 pt-10 pb-10 flex flex-col items-center">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 border-b border-slate-100 pb-2 inline-block">Secured by Industry Leaders</p>
                    <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-300">
                        <div className="flex items-center gap-2">
                            <Shield className="w-8 h-8 text-blue-900" />
                            <span className="font-bold text-xl text-slate-700">SAPS Partner</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="w-8 h-8 text-green-600" />
                            <span className="font-bold text-xl text-slate-700">CyberTrust</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Lock className="w-8 h-8 text-slate-600" />
                            <span className="font-bold text-xl text-slate-700">256-Bit SSL</span>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
}
