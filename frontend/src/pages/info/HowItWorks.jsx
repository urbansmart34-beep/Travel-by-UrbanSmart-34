import React, { useState } from 'react';
import { Map, CreditCard, ShieldCheck, Smartphone, Target } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function HowItWorks() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col pt-16">
            <div className="max-w-4xl mx-auto text-center px-4 mb-16">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-xs font-bold mb-6 border border-blue-200 dark:border-blue-800">
                    <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                    Simplifying South African Transit
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white mb-6 leading-tight">
                    How <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">UrbanSmart-34</span> Moves You
                </h1>
                <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                    Whether you're behind the wheel or in the passenger seat, we've streamlined the journey. Compare exactly how our platform handles your everyday commute.
                </p>
            </div>

            <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-16 mb-24">
                {/* For Commuters */}
                <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl">
                            <Smartphone className="w-8 h-8" />
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">For Riders</h2>
                    </div>

                    <div className="space-y-8">
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 size-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 font-bold text-lg">1</div>
                            <div>
                                <h3 className="font-bold text-slate-900 dark:text-white text-xl mb-2">Search & Compare</h3>
                                <p className="text-slate-600 dark:text-slate-400">Enter your destination and choose from scheduled rides or request an immediate pick-up. Compare prices, driver ratings, and vehicle types.</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-shrink-0 size-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 font-bold text-lg">2</div>
                            <div>
                                <h3 className="font-bold text-slate-900 dark:text-white text-xl mb-2">Book Securely</h3>
                                <p className="text-slate-600 dark:text-slate-400">Pay directly through the app using Yoco's secure gateway. Your funds are held safely until the trip is completed successfully.</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-shrink-0 size-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 font-bold text-lg">3</div>
                            <div>
                                <h3 className="font-bold text-slate-900 dark:text-white text-xl mb-2">Ride & Review</h3>
                                <p className="text-slate-600 dark:text-slate-400">Track your driver in real-time. Share your location with friends or family via the SOS feature, and leave a review once you arrive.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* For Drivers */}
                <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl">
                            <Target className="w-8 h-8" />
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">For Drivers</h2>
                    </div>

                    <div className="space-y-8">
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 size-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 font-bold text-lg">1</div>
                            <div>
                                <h3 className="font-bold text-slate-900 dark:text-white text-xl mb-2">Verification & Visibility</h3>
                                <p className="text-slate-600 dark:text-slate-400">Complete our fast digital background check. Once approved, toggle yourself 'Online' to become instantly visible to passengers nearby.</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-shrink-0 size-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 font-bold text-lg">2</div>
                            <div>
                                <h3 className="font-bold text-slate-900 dark:text-white text-xl mb-2">Receive & Accept</h3>
                                <p className="text-slate-600 dark:text-slate-400">Get notification requests with upfront earning estimates. Accept the rides that fit your schedule or pre-publish your daily route.</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-shrink-0 size-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 font-bold text-lg">3</div>
                            <div>
                                <h3 className="font-bold text-slate-900 dark:text-white text-xl mb-2">Earn & Track</h3>
                                <p className="text-slate-600 dark:text-slate-400">Complete the trip to have funds instantly credited to your Wallet. Monitor your daily stats and initiate instant payouts.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-slate-900 text-center py-16 px-4">
                <h2 className="text-2xl font-bold text-white mb-6">Ready to get moving?</h2>
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">Download the App Today</Button>
            </div>
        </div>
    );
}
