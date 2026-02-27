import React from 'react';
import { Link } from 'react-router-dom';
import {
    CheckCircle2,
    TrendingUp,
    Banknote,
    CarFront,
    Star,
    Handshake,
    MapPin,
    Route,
    Bus,
    Info,
    Trophy,
    Check,
    X,
    CircleDollarSign,
    Diamond,
    ChevronDown
} from 'lucide-react';

export default function DriverEarnings() {
    return (
        <div className="bg-slate-50 min-h-screen font-sans text-slate-900 pb-20">

            <main className="px-4 md:px-10 lg:px-40 flex justify-center py-8">
                <div className="flex flex-col max-w-5xl flex-1">

                    {/* Hero Section */}
                    <div className="mb-10">
                        <div className="flex flex-col gap-6 lg:gap-12 md:flex-row items-center">

                            <div className="flex flex-col gap-6 md:w-1/2">
                                <div className="flex flex-col gap-3 text-left">
                                    <div className="inline-flex w-fit items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-blue-700">
                                        <CheckCircle2 className="w-4 h-4" />
                                        Transparent Pricing
                                    </div>
                                    <h1 className="text-slate-900 text-4xl font-black leading-tight tracking-tight lg:text-5xl">
                                        Drive Smarter, <br /><span className="text-blue-500">Earn Better.</span>
                                    </h1>
                                    <p className="text-slate-600 text-lg font-normal leading-relaxed">
                                        Our transparent Pricing Engine rewards top-rated drivers. See exactly how your final payout is calculated with no hidden fees.
                                    </p>
                                </div>

                                <div className="flex gap-4 flex-wrap">
                                    <Link to="/driver/create-trip" className="flex h-12 items-center justify-center rounded-lg bg-blue-500 px-6 text-white text-base font-bold shadow-md hover:bg-blue-600 hover:shadow-lg transition-all">
                                        Go Online Now
                                    </Link>
                                    <button className="flex h-12 items-center justify-center rounded-lg bg-white border border-slate-200 px-6 text-slate-700 text-base font-medium hover:bg-slate-50 shadow-sm transition-all">
                                        View My Tier
                                    </button>
                                </div>
                            </div>

                            {/* Hero Visual */}
                            <div className="w-full md:w-1/2">
                                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-xl bg-slate-900">
                                    <div
                                        className="absolute inset-0 bg-cover bg-center opacity-60 mix-blend-overlay"
                                        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=800")' }}
                                    ></div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent"></div>

                                    <div className="absolute bottom-6 left-6 right-6 text-white">
                                        <div className="flex items-center gap-2 mb-2">
                                            <TrendingUp className="w-5 h-5 text-blue-400" />
                                            <span className="font-bold text-sm tracking-wider uppercase text-blue-400">Weekly Insight</span>
                                        </div>
                                        <p className="font-medium text-lg leading-tight">Top rated drivers earned 15% more last week in Cape Town.</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Price Breakdown Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">

                        {/* Left: Explanation Cards */}
                        <div className="lg:col-span-7 flex flex-col gap-6">
                            <div>
                                <h2 className="text-slate-900 text-2xl font-bold leading-tight">How It Works</h2>
                                <p className="text-slate-600 mt-2">Your earnings are based on a base rate, vehicle type, and your driver rating. We believe in complete transparency.</p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                                {/* Card 1 */}
                                <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-all">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                                        <Banknote className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-slate-900 font-bold">Base Route Price</h3>
                                        <p className="text-slate-500 text-sm mt-1">Standard rate per km and minute for the route calculated upfront.</p>
                                    </div>
                                </div>

                                {/* Card 2 */}
                                <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-all">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-50 text-purple-600">
                                        <CarFront className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-slate-900 font-bold">Vehicle Multiplier</h3>
                                        <p className="text-slate-500 text-sm mt-1">Earn more with luxury or larger capacity vehicles (e.g., x1.2 for Vans).</p>
                                    </div>
                                </div>

                                {/* Card 3 */}
                                <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-all">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-50 text-yellow-600">
                                        <Star className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-slate-900 font-bold">Rating Bonus</h3>
                                        <p className="text-slate-500 text-sm mt-1">Maintain a 4.8+ rating to unlock the Gold Tier 5% bonus per trip.</p>
                                    </div>
                                </div>

                                {/* Card 4 */}
                                <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-all">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-600">
                                        <Handshake className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-slate-900 font-bold">Platform Fee</h3>
                                        <p className="text-slate-500 text-sm mt-1">A fixed % used to maintain the app, insurance, and marketing.</p>
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* Right: Interactive Calculator Visual */}
                        <div className="lg:col-span-5 relative">
                            <div className="sticky top-6 rounded-2xl bg-white border border-slate-200 shadow-xl overflow-hidden mt-6 lg:mt-0">

                                <div className="bg-slate-900 p-6 text-white relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl"></div>
                                    <div className="relative z-10 flex justify-between items-start mb-6">
                                        <div>
                                            <p className="text-blue-400 text-xs font-bold uppercase tracking-wider mb-1">Sample Trip Receipt</p>
                                            <h3 className="text-xl font-bold">Trip #JHB-4921</h3>
                                        </div>
                                        <div className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium border border-white/20">
                                            Completed
                                        </div>
                                    </div>
                                    <div className="relative z-10 flex items-center gap-3 text-sm text-slate-300">
                                        <MapPin className="w-5 h-5 text-blue-400" />
                                        <span>Sandton City → OR Tambo Int.</span>
                                    </div>
                                </div>

                                <div className="p-6 flex flex-col gap-4">

                                    {/* Line Item */}
                                    <div className="flex justify-between items-center py-3 border-b border-slate-100">
                                        <div className="flex items-center gap-4">
                                            <Route className="text-slate-400 w-5 h-5" />
                                            <span className="text-slate-700 font-medium">Base Fare</span>
                                        </div>
                                        <span className="text-slate-900 font-bold">R 100.00</span>
                                    </div>

                                    {/* Line Item */}
                                    <div className="flex justify-between items-center py-3 border-b border-slate-100">
                                        <div className="flex items-center gap-4">
                                            <Bus className="text-purple-500 w-5 h-5" />
                                            <div className="flex flex-col">
                                                <span className="text-slate-700 font-medium">Vehicle Multiplier</span>
                                                <span className="text-xs text-slate-500">Luxury Van (x1.2)</span>
                                            </div>
                                        </div>
                                        <span className="text-green-600 font-bold">+ R 20.00</span>
                                    </div>

                                    {/* Line Item */}
                                    <div className="flex justify-between items-center py-3 border-b border-slate-100 bg-yellow-50/50 -mx-6 px-6">
                                        <div className="flex items-center gap-4">
                                            <Star className="text-yellow-500 w-5 h-5 fill-current" />
                                            <div className="flex flex-col">
                                                <span className="text-slate-900 font-bold">Gold Tier Bonus</span>
                                                <span className="text-xs text-slate-600">4.9 Star Rating (+5%)</span>
                                            </div>
                                        </div>
                                        <span className="text-green-600 font-bold">+ R 6.00</span>
                                    </div>

                                    {/* Line Item */}
                                    <div className="flex justify-between items-center py-3 border-b border-slate-100">
                                        <div className="flex items-center gap-4">
                                            <div className="group relative">
                                                <Info className="text-slate-400 w-5 h-5 cursor-help" />
                                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden w-48 rounded bg-slate-800 p-2 text-xs text-white group-hover:block z-20 text-center shadow-lg">
                                                    Covers insurance &app maintenance
                                                </div>
                                            </div>
                                            <span className="text-slate-700 font-medium">Platform Fee</span>
                                        </div>
                                        <span className="text-red-500 font-bold">- R 15.00</span>
                                    </div>

                                    {/* Total */}
                                    <div className="mt-4 flex justify-between items-center rounded-xl bg-slate-50 border border-slate-200 p-5">
                                        <span className="text-slate-900 text-lg font-bold">Net Earnings</span>
                                        <span className="text-blue-600 text-3xl font-black tracking-tight">R 111.00</span>
                                    </div>

                                    <button className="mt-4 w-full text-center text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">
                                        See full calculation history
                                    </button>

                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Rating Impact Visualizer */}
                    <div className="rounded-2xl bg-white p-6 md:p-10 shadow-sm border border-slate-200 mb-16">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                            <div className="max-w-xl">
                                <h2 className="text-slate-900 text-3xl font-bold mb-3">Unlock Higher Earnings</h2>
                                <p className="text-slate-600 text-lg">Your rating directly impacts your take-home pay. Move up the tiers to decrease platform fees and unlock exclusive bonuses.</p>
                            </div>
                            <div className="flex items-center gap-2 rounded-lg bg-blue-50 border border-blue-100 px-5 py-3 text-blue-700 font-bold shadow-sm whitespace-nowrap">
                                <Trophy className="w-5 h-5" />
                                <span>Current Tier: Silver</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                            {/* Bronze Tier */}
                            <div className="flex flex-col gap-5 rounded-xl border border-slate-200 bg-slate-50 p-6 opacity-70">
                                <div className="flex justify-between items-center">
                                    <h3 className="font-bold text-slate-700 text-lg">Bronze</h3>
                                    <span className="text-xs font-bold bg-slate-200 text-slate-700 px-2 py-1 rounded">Rating &lt; 4.5</span>
                                </div>
                                <div className="h-2 w-full rounded-full bg-slate-200">
                                    <div className="h-full w-full rounded-full bg-slate-400"></div>
                                </div>
                                <ul className="text-sm text-slate-600 space-y-3">
                                    <li className="flex items-center gap-3"><Check className="w-4 h-4" /> Standard Rates</li>
                                    <li className="flex items-center gap-3"><X className="w-4 h-4 text-slate-400" /> No Bonuses</li>
                                </ul>
                            </div>

                            {/* Silver Tier (Current) */}
                            <div className="relative flex flex-col gap-5 rounded-xl border-2 border-blue-500 bg-white p-6 shadow-lg shadow-blue-500/10 transform md:-translate-y-2">
                                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-md">
                                    YOU ARE HERE
                                </div>
                                <div className="flex justify-between items-center mt-2">
                                    <h3 className="font-bold text-slate-900 text-xl">Silver</h3>
                                    <span className="text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100 px-2 py-1 rounded">Rating 4.5 - 4.7</span>
                                </div>
                                <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                                    <div className="h-full w-3/4 rounded-full bg-blue-500"></div>
                                </div>
                                <ul className="text-sm text-slate-700 font-medium space-y-3">
                                    <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-blue-500" /> Standard Rates</li>
                                    <li className="flex items-center gap-3"><TrendingUp className="w-4 h-4 text-blue-500" /> Priority Support</li>
                                </ul>
                            </div>

                            {/* Gold Tier */}
                            <div className="flex flex-col gap-5 rounded-xl border border-yellow-300 bg-gradient-to-b from-yellow-50 to-white p-6 shadow-sm">
                                <div className="flex justify-between items-center">
                                    <h3 className="font-bold text-yellow-700 text-xl">Gold</h3>
                                    <span className="text-xs font-bold bg-yellow-100 text-yellow-800 border border-yellow-200 px-2 py-1 rounded">Rating 4.8+</span>
                                </div>
                                <div className="h-2 w-full rounded-full bg-slate-100">
                                    <div className="h-full w-0 rounded-full bg-yellow-400"></div>
                                </div>
                                <ul className="text-sm text-slate-700 font-medium space-y-3">
                                    <li className="flex items-center gap-3"><CircleDollarSign className="w-4 h-4 text-yellow-600" /> 5% Bonus per Trip</li>
                                    <li className="flex items-center gap-3"><Diamond className="w-4 h-4 text-yellow-600" /> Exclusive Routes</li>
                                </ul>
                                <button className="mt-2 text-xs font-bold text-yellow-700 uppercase tracking-widest hover:text-yellow-800 transition-colors text-left flex items-center gap-1 group">
                                    See Requirements
                                    <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                                </button>
                            </div>

                        </div>
                    </div>

                    {/* FAQ Section */}
                    <div className="max-w-3xl mx-auto w-full mb-16">
                        <h2 className="text-slate-900 text-2xl font-bold leading-tight mb-8 text-center">Frequently Asked Questions</h2>

                        <div className="flex flex-col gap-4">
                            <details className="group rounded-xl border border-slate-200 bg-white open:bg-slate-50 transition-all shadow-sm">
                                <summary className="flex cursor-pointer items-center justify-between p-5 font-semibold text-slate-900 list-none">
                                    <span className="text-lg">When do I get paid?</span>
                                    <ChevronDown className="w-5 h-5 text-slate-400 transition-transform group-open:rotate-180" />
                                </summary>
                                <div className="px-5 pb-5 text-slate-600 leading-relaxed">
                                    Payouts are processed weekly on Tuesdays directly to your linked bank account. Instant cash-out is available for Gold tier drivers for a small processing fee.
                                </div>
                            </details>

                            <details className="group rounded-xl border border-slate-200 bg-white open:bg-slate-50 transition-all shadow-sm">
                                <summary className="flex cursor-pointer items-center justify-between p-5 font-semibold text-slate-900 list-none">
                                    <span className="text-lg">What does the Platform Fee cover?</span>
                                    <ChevronDown className="w-5 h-5 text-slate-400 transition-transform group-open:rotate-180" />
                                </summary>
                                <div className="px-5 pb-5 text-slate-600 leading-relaxed">
                                    The platform fee goes towards continuous app development, maintaining our 24/7 dedicated driver support team, marketing efforts to get you more riders, and comprehensive commercial insurance coverage during all active trips.
                                </div>
                            </details>

                            <details className="group rounded-xl border border-slate-200 bg-white open:bg-slate-50 transition-all shadow-sm">
                                <summary className="flex cursor-pointer items-center justify-between p-5 font-semibold text-slate-900 list-none">
                                    <span className="text-lg">How is the Base Route Price calculated?</span>
                                    <ChevronDown className="w-5 h-5 text-slate-400 transition-transform group-open:rotate-180" />
                                </summary>
                                <div className="px-5 pb-5 text-slate-600 leading-relaxed">
                                    It is calculated based on the estimated distance (km) and expected time (minutes) of the most efficient route, plus a base flag-fall fee. This ensures transparent upfront pricing for both you and your passengers.
                                </div>
                            </details>
                        </div>
                    </div>

                    {/* Final CTA */}
                    <div className="rounded-3xl bg-slate-900 p-10 text-center text-white relative overflow-hidden shadow-2xl">
                        <div
                            className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none"
                            style={{ backgroundImage: 'radial-gradient(#14b8a6 1px, transparent 1px)', backgroundSize: '24px 24px' }}
                        ></div>
                        <div className="relative z-10 flex flex-col items-center">
                            <h2 className="text-3xl font-black mb-4">Ready to maximize your earnings?</h2>
                            <p className="text-slate-300 text-lg mb-8 max-w-lg">Join thousands of high-earning drivers in South Africa using UrbanSmart-34 today.</p>
                            <Link to="/driver/create-trip" className="h-14 flex items-center justify-center rounded-xl bg-blue-500 px-10 text-white text-lg font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-400 hover:-translate-y-1 transition-transform">
                                Go Online Now
                            </Link>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}
