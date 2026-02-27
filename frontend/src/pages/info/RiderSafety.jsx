import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Star, FileText, Lock, MapPin, AlertCircle, PhoneOff, Check, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Map as GoogleMap, AdvancedMarker } from '@vis.gl/react-google-maps';

export default function RiderSafety() {
    return (
        <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950">
            {/* Hero Section */}
            <section className="relative px-6 py-12 lg:px-20 lg:py-24 bg-white dark:bg-slate-900 overflow-hidden">
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[600px] h-[600px] bg-blue-600 opacity-10 blur-3xl rounded-full pointer-events-none"></div>
                <div className="mx-auto max-w-7xl relative z-10">
                    <div className="flex flex-col lg:flex-row gap-12 items-center">
                        <div className="flex-1 flex flex-col gap-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 w-fit">
                                <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                <span className="text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wide">Official Safety Guidelines</span>
                            </div>
                            <h1 className="text-4xl lg:text-6xl font-black leading-tight tracking-tight text-slate-900 dark:text-white">
                                Ride with confidence across <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">South Africa</span>.
                            </h1>
                            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl">
                                Your safety is engineered into every trip. With our secure Escrow payment system, we ensure you arrive safely before a cent is transferred.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 mt-4">
                                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                                    Book a Safe Ride Now
                                </Button>
                                <Button variant="outline" size="lg">
                                    Read Safety Report
                                </Button>
                            </div>
                        </div>
                        <div className="flex-1 w-full relative">
                            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-slate-100 dark:bg-slate-800 ring-1 ring-slate-900/5">
                                <img alt="Safe driving pov" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1549317336-206569e845f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                                <div className="absolute bottom-6 left-6 right-6">
                                    <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20">
                                        <div className="bg-blue-600 rounded-full p-1 shadow-lg shadow-blue-500/30">
                                            <Check className="text-white w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="text-white font-bold text-sm">Trusted Driver</p>
                                            <p className="text-white/80 text-xs">Highly rated community member</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Who Drives You SECTION */}
            <section className="px-6 py-16 lg:px-20 bg-slate-50 dark:bg-slate-950/50">
                <div className="mx-auto max-w-7xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Who Drives You?</h2>
                        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                            UrbanSmart-34 ensures every driver meets our community standards of trust, accountability, and capability.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white dark:bg-slate-900 p-8 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm transition-shadow group">
                            <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-6 text-blue-600 group-hover:scale-110 transition-transform">
                                <FileText className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Identity Verified</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                Every driver provides their valid license and vehicle details before joining the platform to assure a safe experience.
                            </p>
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-8 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm transition-shadow group">
                            <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-6 text-blue-600 group-hover:scale-110 transition-transform">
                                <Star className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">4.0+ Rating Only</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                Excellence is mandatory. Drivers must maintain a minimum 4.0 star rating from riders like you to stay on our platform.
                            </p>
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-8 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm transition-shadow group">
                            <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-6 text-blue-600 group-hover:scale-110 transition-transform">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Community Accountability</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                Our robust two-way review system holds all participants accountable, keeping the community safe and reliable for everyone.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Escrow SECTION */}
            <section className="px-6 py-16 lg:px-20 bg-white dark:bg-slate-900 relative overflow-hidden">
                <div className="mx-auto max-w-7xl">
                    <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-2xl relative">
                        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-transparent to-blue-900/20 pointer-events-none"></div>
                        <div className="flex flex-col lg:flex-row relative z-10">
                            <div className="flex-1 p-8 lg:p-16 flex flex-col justify-center">
                                <div className="inline-flex items-center gap-2 mb-6 text-blue-400">
                                    <Lock className="w-5 h-5" />
                                    <span className="font-bold uppercase tracking-wider text-sm">Escrow Protection</span>
                                </div>
                                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                                    Your money is safe until you arrive.
                                </h2>
                                <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                                    We use a smart Escrow Payment System. When you book, your payment is held securely by UrbanSmart-34. It is only released to the driver once your trip is completed and you confirm your safe arrival.
                                </p>
                                <ul className="space-y-4">
                                    <li className="flex items-center gap-3 text-white">
                                        <Check className="text-teal-400 w-5 h-5" />
                                        <span>No cash needed</span>
                                    </li>
                                    <li className="flex items-center gap-3 text-white">
                                        <Check className="text-teal-400 w-5 h-5" />
                                        <span>Automatic refunds for cancellations</span>
                                    </li>
                                    <li className="flex items-center gap-3 text-white">
                                        <Check className="text-teal-400 w-5 h-5" />
                                        <span>Dispute resolution support</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="lg:w-1/2 relative min-h-[300px] lg:min-h-full">
                                <img alt="Secure payment concept" className="absolute inset-0 w-full h-full object-cover" src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" />
                                <div className="absolute inset-0 bg-blue-900/40 mix-blend-multiply"></div>
                                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-slate-900/90 lg:to-slate-900"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* In-App Toolkit SECTION */}
            <section className="px-6 py-16 lg:px-20 bg-slate-50 dark:bg-slate-950/50">
                <div className="mx-auto max-w-7xl flex flex-col lg:flex-row gap-16 items-center">
                    <div className="lg:w-1/2">
                        <div className="relative mx-auto w-full max-w-[320px] aspect-[9/19] bg-slate-900 rounded-[3rem] p-4 shadow-2xl border-4 border-slate-800">
                            <div className="w-full h-full bg-white dark:bg-slate-800 rounded-[2rem] overflow-hidden relative flex flex-col">
                                <div className="h-1/2 bg-slate-200 dark:bg-slate-700 relative overflow-hidden">
                                    <div className="absolute inset-0 opacity-80 mix-blend-multiply">
                                        <GoogleMap
                                            defaultCenter={{ lat: -33.9285, lng: 18.6421 }}
                                            defaultZoom={11}
                                            mapId="SAFETY_MAP"
                                            disableDefaultUI={true}
                                        >
                                            <AdvancedMarker position={{ lat: -33.9249, lng: 18.4241 }} />
                                            <AdvancedMarker position={{ lat: -33.9531, lng: 18.4602 }} />
                                        </GoogleMap>
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white dark:from-slate-800 to-transparent"></div>
                                </div>
                                <div className="h-1/2 p-6 flex flex-col gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-slate-300 dark:bg-slate-600"></div>
                                        <div>
                                            <div className="h-4 w-24 bg-slate-200 dark:bg-slate-600 rounded mb-2"></div>
                                            <div className="h-3 w-16 bg-slate-100 dark:bg-slate-700 rounded"></div>
                                        </div>
                                    </div>
                                    <div className="h-px bg-slate-100 dark:bg-slate-700 my-2"></div>
                                    <button className="w-full py-3 bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-red-100 transition-colors">
                                        <AlertCircle className="w-5 h-5" />
                                        Emergency Assist
                                    </button>
                                    <button className="w-full py-3 bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-blue-100 transition-colors">
                                        <MapPin className="w-5 h-5" />
                                        Share Trip Status
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 lg:pl-10">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">In-App Safety Toolkit</h2>
                        <p className="text-slate-600 dark:text-slate-400 text-lg mb-10">
                            Technology that keeps watch. Access a suite of safety tools directly from your ride screen, designed for the South African context.
                        </p>
                        <div className="flex flex-col gap-8">
                            <div className="flex gap-4 group">
                                <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 p-3 rounded-lg h-fit group-hover:shadow-md transition-all">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1">Share Your Ride</h3>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm">Send a live link of your trip to trusted contacts so they can track your progress in real-time.</p>
                                </div>
                            </div>
                            <div className="flex gap-4 group">
                                <div className="bg-red-50 dark:bg-red-900/20 text-red-600 p-3 rounded-lg h-fit group-hover:shadow-md transition-all">
                                    <AlertCircle className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1">Emergency SOS</h3>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm">One tap connects you immediately to local emergency services and our 24/7 safety response team.</p>
                                </div>
                            </div>
                            <div className="flex gap-4 group">
                                <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 p-3 rounded-lg h-fit group-hover:shadow-md transition-all">
                                    <PhoneOff className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1">Phone Number Masking</h3>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm">Call or message your driver without revealing your personal phone number.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Common Questions SECTION */}
            <section className="px-6 py-16 lg:px-20 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
                <div className="mx-auto max-w-3xl">
                    <h2 className="text-2xl font-bold text-center text-slate-900 dark:text-white mb-10">Common Safety Questions</h2>
                    <div className="space-y-4">
                        <details className="group bg-slate-50 dark:bg-slate-950 rounded-lg p-4 cursor-pointer">
                            <summary className="flex justify-between items-center font-bold text-slate-900 dark:text-white list-none">
                                <span>What if the driver doesn't match the photo?</span>
                                <ChevronDown className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" />
                            </summary>
                            <div className="mt-3 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-200 dark:border-slate-800 pt-3">
                                Do not enter the vehicle. Cancel the ride immediately using the "Driver did not match" reason in the app. You will not be charged, and we will investigate the report immediately.
                            </div>
                        </details>
                        <details className="group bg-slate-50 dark:bg-slate-950 rounded-lg p-4 cursor-pointer">
                            <summary className="flex justify-between items-center font-bold text-slate-900 dark:text-white list-none">
                                <span>Is my card information stored safely?</span>
                                <ChevronDown className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" />
                            </summary>
                            <div className="mt-3 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-200 dark:border-slate-800 pt-3">
                                Absolutely. We use bank-grade encryption and PCI-DSS compliant payment processors such as Yoco. UrbanSmart-34 never stores your full credit card details on our servers.
                            </div>
                        </details>
                        <details className="group bg-slate-50 dark:bg-slate-950 rounded-lg p-4 cursor-pointer">
                            <summary className="flex justify-between items-center font-bold text-slate-900 dark:text-white list-none">
                                <span>What happens if I forget an item in the car?</span>
                                <ChevronDown className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" />
                            </summary>
                            <div className="mt-3 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-200 dark:border-slate-800 pt-3">
                                You can contact the driver through the app for up to 24 hours after the trip without revealing your number. Alternatively, contact our support team to help facilitate the return of your item.
                            </div>
                        </details>
                    </div>
                </div>
            </section>
        </div>
    );
}
