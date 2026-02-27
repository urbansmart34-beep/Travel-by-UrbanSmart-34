import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    ArrowRight,
    Clock,
    TrendingUp,
    Calendar,
    Wallet,
    ShieldCheck,
    Headset,
    Map,
    Award,
    User,
    CheckCircle2,
    Car
} from 'lucide-react';

export default function DriverRecruitment() {
    const [tripsPerWeek, setTripsPerWeek] = useState(40);
    const estimatedEarnings = tripsPerWeek * 120; // R120 per trip

    return (
        <div className="bg-slate-50 min-h-screen font-sans text-slate-900 overflow-x-hidden">

            {/* Hero Section */}
            <div className="relative w-full bg-white overflow-hidden border-b border-slate-200">
                {/* Abstract Background Gradient */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-[100px] pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[400px] h-[400px] rounded-full bg-blue-500/5 blur-[80px] pointer-events-none"></div>

                <div className="max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-20 mx-auto relative z-10">
                    <div className="flex flex-col-reverse lg:flex-row gap-12 items-center">

                        <div className="flex-1 flex flex-col gap-8 text-center lg:text-left">
                            <div className="flex flex-col gap-4">
                                <span className="text-blue-600 font-bold tracking-wider uppercase text-sm">Join the team</span>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-slate-900">
                                    Turn Your Car into Cash with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">UrbanSmart-34</span>
                                </h1>
                                <p className="text-slate-600 text-lg md:text-xl font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
                                    Be your own boss. Earn R120+ per trip on your schedule. Join the community of drivers moving the city forward.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <Link to="/driver/verify" className="flex items-center justify-center gap-2 rounded-xl h-14 px-8 bg-blue-600 hover:bg-blue-700 text-white text-base font-bold leading-normal tracking-wide shadow-xl shadow-blue-600/30 transition-all transform hover:-translate-y-1">
                                    <span className="truncate">Start Earning</span>
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                                <button className="flex items-center justify-center gap-2 rounded-xl h-14 px-8 bg-white border border-slate-200 hover:bg-slate-50 text-slate-900 text-base font-bold leading-normal transition-all">
                                    <span className="truncate">Learn More</span>
                                </button>
                            </div>

                            <div className="flex items-center justify-center lg:justify-start gap-4 mt-4 text-sm text-slate-500">
                                <div className="flex -space-x-2">
                                    <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center overflow-hidden">
                                        <User className="w-4 h-4 text-slate-400" />
                                    </div>
                                    <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-300 flex items-center justify-center overflow-hidden">
                                        <User className="w-4 h-4 text-slate-500" />
                                    </div>
                                    <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-400 flex items-center justify-center overflow-hidden">
                                        <User className="w-4 h-4 text-white" />
                                    </div>
                                </div>
                                <span>Join 5,000+ active drivers</span>
                            </div>
                        </div>

                        <div className="flex-1 w-full relative">
                            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl shadow-slate-200">
                                <img
                                    alt="Confident driver in car"
                                    className="w-full h-full object-cover"
                                    src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=800"
                                />

                                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-slate-100 flex items-center gap-4">
                                    <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
                                        <Wallet className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 font-medium">Average Trip Fare</p>
                                        <p className="text-xl font-bold text-slate-900">R120+</p>
                                    </div>
                                    <div className="h-8 w-px bg-slate-200 mx-2 hidden sm:block"></div>
                                    <div className="bg-blue-50 p-2 rounded-lg text-blue-600 hidden sm:block">
                                        <CheckCircle2 className="w-6 h-6" />
                                    </div>
                                    <div className="hidden sm:block">
                                        <p className="text-xs text-slate-500 font-medium">Success Rate</p>
                                        <p className="text-xl font-bold text-slate-900">98%</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* How it Works Section */}
            <div className="w-full bg-slate-50 py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">How it Works</h2>
                        <p className="text-slate-600 max-w-2xl mx-auto text-lg">Becoming a driver is easy. Follow these 3 simple steps to start earning money on your own terms.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-slate-200 -z-0"></div>

                        {/* Step 1 */}
                        <div className="group flex flex-col items-center text-center gap-6 relative z-10">
                            <div className="w-24 h-24 rounded-full bg-white border-4 border-slate-100 shadow-xl flex items-center justify-center group-hover:border-blue-200 transition-colors duration-300">
                                <User className="w-10 h-10 text-blue-600" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <h3 className="text-xl font-bold text-slate-900">1. Sign Up Online</h3>
                                <p className="text-slate-600">Fill out the registration form with your personal details and vehicle information.</p>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="group flex flex-col items-center text-center gap-6 relative z-10">
                            <div className="w-24 h-24 rounded-full bg-white border-4 border-slate-100 shadow-xl flex items-center justify-center group-hover:border-blue-200 transition-colors duration-300">
                                <CheckCircle2 className="w-10 h-10 text-blue-600" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <h3 className="text-xl font-bold text-slate-900">2. Get Verified</h3>
                                <p className="text-slate-600">Upload your documents and license. Get approved within 24 hours.</p>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="group flex flex-col items-center text-center gap-6 relative z-10">
                            <div className="w-24 h-24 rounded-full bg-white border-4 border-slate-100 shadow-xl flex items-center justify-center group-hover:border-blue-200 transition-colors duration-300">
                                <Car className="w-10 h-10 text-blue-600" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <h3 className="text-xl font-bold text-slate-900">3. Start Driving</h3>
                                <p className="text-slate-600">Turn on the app, accept trips nearby, and start earning immediately.</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Earnings Calculator Section */}
            <div className="w-full bg-white py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">

                    <div className="flex-1 space-y-8">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
                            Calculate your potential earnings
                        </h2>
                        <p className="text-lg text-slate-600">
                            See how much you could make by driving with UrbanSmart-34. The more you drive, the more you earn.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="bg-blue-50 p-2 rounded-lg text-blue-600 mt-1">
                                    <Clock className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg text-slate-900">Flexible Schedule</h4>
                                    <p className="text-slate-600">Drive during rush hour or on weekends. It's totally up to you.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-blue-50 p-2 rounded-lg text-blue-600 mt-1">
                                    <TrendingUp className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg text-slate-900">Surge Pricing</h4>
                                    <p className="text-slate-600">Earn extra during high-demand times and busy locations.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Calculator Widget */}
                    <div className="flex-1 w-full max-w-md bg-slate-50 p-8 rounded-2xl shadow-xl border border-slate-200">
                        <div className="mb-8 text-center">
                            <p className="text-slate-500 font-medium mb-2">Estimated Weekly Earnings</p>
                            <h3 className="text-5xl font-black text-slate-900 tracking-tight">
                                R{estimatedEarnings.toLocaleString()}
                            </h3>
                        </div>

                        <div className="space-y-6">
                            <div className="flex justify-between items-center">
                                <label className="font-bold text-slate-700">Trips per week</label>
                                <span className="text-blue-600 font-bold bg-blue-100 px-3 py-1 rounded-full">{tripsPerWeek} Trips</span>
                            </div>

                            <div className="relative w-full h-4 bg-slate-200 rounded-full flex items-center">
                                <input
                                    type="range"
                                    min="0"
                                    max="80"
                                    value={tripsPerWeek}
                                    onChange={(e) => setTripsPerWeek(Number(e.target.value))}
                                    className="absolute w-full h-full opacity-0 cursor-pointer z-20"
                                />
                                <div
                                    className="absolute left-0 h-4 bg-blue-600 rounded-full z-10 pointer-events-none"
                                    style={{ width: `${(tripsPerWeek / 80) * 100}%` }}
                                ></div>
                                <div
                                    className="absolute w-6 h-6 bg-white border-4 border-blue-600 rounded-full shadow-lg z-10 pointer-events-none transform -translate-x-1/2"
                                    style={{ left: `${(tripsPerWeek / 80) * 100}%` }}
                                ></div>
                            </div>

                            <div className="flex justify-between text-xs text-slate-400 font-medium">
                                <span>0 Trips</span>
                                <span>80+ Trips</span>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-slate-200">
                            <Link to="/driver/verify" className="w-full flex items-center justify-center gap-2 rounded-lg h-12 bg-blue-600 hover:bg-blue-700 text-white text-base font-bold transition-all shadow-lg shadow-blue-600/20">
                                Start Earning Now
                            </Link>
                            <p className="text-xs text-center text-slate-400 mt-4">Estimates are based on average fares in major cities.</p>
                        </div>
                    </div>

                </div>
            </div>

            {/* Why Drive With Us Section */}
            <div className="w-full bg-slate-50 py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Why Drive with UrbanSmart-34?</h2>
                        <p className="text-slate-600 max-w-2xl mx-auto text-lg">We prioritize our drivers with better rates, safety features, and constant support.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <FeatureCard
                            icon={Calendar}
                            colorClass="text-blue-600 bg-blue-50"
                            title="Set Your Own Schedule"
                            description="No minimum hours. No bosses. You decide when you want to drive and for how long. Total freedom."
                        />
                        <FeatureCard
                            icon={Wallet}
                            colorClass="text-green-600 bg-green-50"
                            title="Earn R120+ Per Trip"
                            description="Keep a larger share of your fare with our low commission rates. Get paid weekly directly to your bank."
                        />
                        <FeatureCard
                            icon={ShieldCheck}
                            colorClass="text-purple-600 bg-purple-50"
                            title="Insurance Coverage"
                            description="We've got you covered. Every trip is insured for you and your passengers for complete peace of mind."
                        />
                        <FeatureCard
                            icon={Headset}
                            colorClass="text-orange-600 bg-orange-50"
                            title="24/7 Driver Support"
                            description="Need help on the road? Our dedicated support team is available around the clock to assist you."
                        />
                        <FeatureCard
                            icon={Map}
                            colorClass="text-blue-600 bg-blue-50"
                            title="Smart Navigation"
                            description="Our app finds the fastest routes so you spend less time in traffic and more time earning."
                        />
                        <FeatureCard
                            icon={Award}
                            colorClass="text-pink-600 bg-pink-50"
                            title="Driver Rewards"
                            description="Unlock bonuses, fuel discounts, and vehicle maintenance perks as you complete more trips."
                        />
                    </div>
                </div>
            </div>

            {/* CTA Footer Section */}
            <div className="w-full bg-slate-900 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Ready to hit the road?</h2>
                    <p className="text-slate-400 text-xl mb-10 max-w-xl mx-auto">Join the fastest growing driver network in the city. Sign up today and start earning within 24 hours.</p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link to="/driver/verify" className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl h-14 px-8 bg-blue-600 hover:bg-blue-500 text-white text-lg font-bold shadow-xl shadow-blue-600/20 transition-all transform hover:-translate-y-1">
                            Start Earning Now
                        </Link>
                        <button className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl h-14 px-8 bg-white/10 hover:bg-white/20 text-white text-lg font-bold backdrop-blur-sm border border-white/10 transition-all">
                            Download App
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
}

function FeatureCard({ icon: Icon, colorClass, title, description }) {
    return (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-blue-200 transition-all duration-300">
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${colorClass}`}>
                <Icon className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
            <p className="text-slate-600 leading-relaxed">{description}</p>
        </div>
    );
}
