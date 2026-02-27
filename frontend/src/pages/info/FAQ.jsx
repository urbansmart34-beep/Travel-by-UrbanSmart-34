import React, { useState } from 'react';
import { Search, ChevronDown, CreditCard, XCircle, Car, Settings } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function FAQ() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            {/* Hero Header */}
            <div className="relative w-full overflow-hidden bg-slate-950 py-16 md:py-24">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/80 to-slate-800/60 z-10"></div>
                </div>
                <div className="relative z-10 mx-auto max-w-[800px] px-6 text-center">
                    <h1 className="mb-4 text-4xl font-black tracking-tight text-white md:text-5xl lg:text-6xl">
                        Help Center
                    </h1>
                    <p className="mb-8 text-lg text-slate-300 md:text-xl max-w-2xl mx-auto">
                        Find answers about booking travel across South Africa with <span className="font-semibold text-blue-400">UrbanSmart-34</span>.
                    </p>
                    <div className="relative mx-auto flex w-full max-w-lg items-center rounded-lg bg-white shadow-xl">
                        <Search className="absolute left-4 w-5 h-5 text-slate-400" />
                        <Input
                            className="h-14 w-full pl-12 border-none bg-transparent text-slate-900 placeholder:text-slate-400 focus-visible:ring-0"
                            placeholder="Search for answers (e.g., refunds, booking)..."
                        />
                        <Button className="absolute right-2 top-2 h-10 bg-blue-600 hover:bg-blue-700">
                            Search
                        </Button>
                    </div>
                </div>
            </div>

            {/* FAQ Content Grid */}
            <div className="flex flex-col md:flex-row gap-8 max-w-[1200px] mx-auto px-6 py-12">
                <aside className="w-full md:w-64 flex-shrink-0">
                    <div className="sticky top-28 space-y-2">
                        <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-500">Categories</h3>
                        <nav className="flex flex-col space-y-1">
                            <a href="#pricing" className="flex items-center gap-3 rounded-lg bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-md shadow-blue-600/20">
                                <CreditCard className="w-5 h-5" /> Pricing & Fees
                            </a>
                            <a href="#cancellations" className="group flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
                                <XCircle className="w-5 h-5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" /> Cancellations
                            </a>
                            <a href="#rides" className="group flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
                                <Car className="w-5 h-5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" /> Requesting Rides
                            </a>
                            <a href="#account" className="group flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
                                <Settings className="w-5 h-5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" /> Account Settings
                            </a>
                        </nav>
                    </div>
                </aside>

                <main className="flex-1 space-y-12">
                    {/* Pricing */}
                    <section id="pricing" className="scroll-mt-28">
                        <div className="mb-6 flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                                <CreditCard className="w-5 h-5" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Pricing & Fees</h2>
                        </div>
                        <div className="flex flex-col gap-4">
                            <details className="group rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm transition-all hover:shadow-md">
                                <summary className="flex cursor-pointer list-none items-center justify-between p-6 [&::-webkit-details-marker]:hidden">
                                    <h3 className="text-base font-semibold text-slate-900 dark:text-white pr-4">How are fares calculated for long-distance travel?</h3>
                                    <span className="transition group-open:rotate-180">
                                        <ChevronDown className="w-5 h-5 text-blue-600" />
                                    </span>
                                </summary>
                                <div className="border-t border-slate-200 dark:border-slate-800 px-6 py-4 text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/50">
                                    <p>Fares are calculated based on a combination of base rate, distance (per km), and estimated time. For inter-city travel (e.g., Johannesburg to Durban), dynamic pricing may apply during peak holiday seasons. All estimated costs are shown upfront before you confirm your booking.</p>
                                </div>
                            </details>

                            <details className="group rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm transition-all hover:shadow-md">
                                <summary className="flex cursor-pointer list-none items-center justify-between p-6 [&::-webkit-details-marker]:hidden">
                                    <h3 className="text-base font-semibold text-slate-900 dark:text-white pr-4">Are there booking fees or hidden costs?</h3>
                                    <span className="transition group-open:rotate-180">
                                        <ChevronDown className="w-5 h-5 text-blue-600" />
                                    </span>
                                </summary>
                                <div className="border-t border-slate-200 dark:border-slate-800 px-6 py-4 text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/50">
                                    <p>We believe in transparency. A small service fee is included in the final price shown to you to cover platform maintenance. Any tolls or airport surcharges will be itemized on your receipt.</p>
                                </div>
                            </details>
                        </div>
                    </section>

                    {/* Cancellations */}
                    <section id="cancellations" className="scroll-mt-28">
                        <div className="mb-6 flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">
                                <XCircle className="w-5 h-5" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Cancellations</h2>
                        </div>
                        <div className="flex flex-col gap-4">
                            <details className="group rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm transition-all hover:shadow-md">
                                <summary className="flex cursor-pointer list-none items-center justify-between p-6 [&::-webkit-details-marker]:hidden">
                                    <h3 className="text-base font-semibold text-slate-900 dark:text-white pr-4">What is the refund policy?</h3>
                                    <span className="transition group-open:rotate-180">
                                        <ChevronDown className="w-5 h-5 text-blue-600" />
                                    </span>
                                </summary>
                                <div className="border-t border-slate-200 dark:border-slate-800 px-6 py-4 text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/50">
                                    <p>If you cancel more than 24 hours before your scheduled trip, you will receive a full refund to your original payment method. Cancellations made between 24 hours and 2 hours before the trip are eligible for a 50% refund or full credit towards a future ride.</p>
                                </div>
                            </details>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}
