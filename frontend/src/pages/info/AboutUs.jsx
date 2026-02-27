import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Headphones, AlertTriangle } from 'lucide-react';

export default function AboutUs() {
    return (
        <div className="flex flex-col grow">
            {/* Hero Section */}
            <div className="relative w-full min-h-[500px] flex items-center justify-center bg-cover bg-center overflow-hidden" style={{ backgroundImage: "linear-gradient(rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.8)), url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')" }}>
                <div className="flex flex-col max-w-[960px] px-4 text-center z-10 animate-fade-in-up">
                    <h1 className="text-white text-4xl md:text-6xl font-black leading-tight tracking-tight mb-4 drop-shadow-sm">
                        Moving South Africa, Together
                    </h1>
                    <h2 className="text-slate-200 text-lg md:text-xl font-medium max-w-2xl mx-auto mb-8 drop-shadow-sm">
                        Community-driven ridesharing connecting cities, towns, and people across the nation.
                    </h2>
                    <div className="flex justify-center gap-4">
                        <Link to="/register" className="flex h-12 items-center justify-center rounded-lg px-8 bg-blue-600 hover:bg-blue-700 text-white text-base font-bold shadow-lg shadow-blue-900/20 transition-all hover:scale-105">
                            Join the Community
                        </Link>
                    </div>
                </div>
            </div>

            {/* Mission Section */}
            <div className="bg-white dark:bg-slate-950 py-16 px-4">
                <div className="max-w-[960px] mx-auto text-center">
                    <p className="text-blue-600 dark:text-blue-400 font-bold uppercase tracking-widest text-xs mb-3">Our Mission</p>
                    <h3 className="text-2xl md:text-3xl font-bold leading-relaxed text-slate-800 dark:text-slate-200">
                        "We are building a safer, more connected South Africa where every journey is an opportunity to share, save, and discover."
                    </h3>
                </div>
            </div>

            {/* Safety Section */}
            <div className="py-16 md:py-24 px-4 md:px-10 bg-slate-50 dark:bg-slate-900">
                <div className="max-w-[1280px] mx-auto grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <span className="text-blue-600 dark:text-blue-400 font-bold text-sm uppercase tracking-wider w-fit">Safety First</span>
                            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white leading-tight">
                                Our Commitment to Safety
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                                Your safety is our priority. We've built robust systems to ensure every journey is tracked, and help is always just a tap away.
                            </p>
                        </div>

                        <div className="grid gap-4 mt-4">
                            <div className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-slate-950 shadow-sm border border-slate-100 dark:border-slate-800 group hover:border-blue-100 transition-colors">
                                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg text-blue-600 dark:text-blue-400">
                                    <Shield className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg text-slate-900 dark:text-slate-100">Community Trust</h4>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Our review and rating system ensures accountability across our community of riders and drivers.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-slate-950 shadow-sm border border-slate-100 dark:border-slate-800 group hover:border-blue-100 transition-colors">
                                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg text-blue-600 dark:text-blue-400">
                                    <Headphones className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg text-slate-900 dark:text-slate-100">24/7 Support</h4>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Round-the-clock assistance team ready to handle any issues or concerns immediately.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-slate-950 shadow-sm border border-slate-100 dark:border-slate-800 group hover:border-blue-100 transition-colors">
                                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg text-blue-600 dark:text-blue-400">
                                    <AlertTriangle className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg text-slate-900 dark:text-slate-100">SOS Feature</h4>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Emergency assistance integrated directly into the app sharing your live location with authorities.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative h-full min-h-[400px] rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/10">
                        <img
                            alt="Safety features"
                            className="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                            src="https://images.unsplash.com/photo-1549317336-206569e845f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                        />
                    </div>
                </div>
            </div>

            {/* Affordable Travel Section */}
            <div className="py-16 md:py-24 px-4 md:px-10 bg-white dark:bg-slate-950">
                <div className="max-w-[1280px] mx-auto flex flex-col-reverse lg:flex-row gap-12 md:gap-20 items-center">
                    <div className="w-full lg:w-1/2 grid grid-cols-2 gap-4">
                        <div className="space-y-4 mt-8">
                            <div className="bg-slate-200 rounded-xl overflow-hidden aspect-[3/4] shadow-lg">
                                <img alt="Travel plans" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="bg-slate-200 rounded-xl overflow-hidden aspect-[3/4] shadow-lg">
                                <img alt="Happy travelers" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" src="https://images.unsplash.com/photo-1539651044670-315229da9d2f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" />
                            </div>
                        </div>
                    </div>

                    <div className="w-full lg:w-1/2 flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <span className="text-blue-600 dark:text-blue-400 font-bold text-sm uppercase tracking-wider w-fit">Affordable Travel</span>
                            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white leading-tight">
                                Travel Without Breaking the Bank
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                                We believe travel should be accessible to everyone. Our platform offers transparent pricing and cost-sharing models to keep your journey affordable, whether you are commuting to work or exploring the coast.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-blue-600 py-16 px-4">
                <div className="max-w-[720px] mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-black text-white mb-6">Ready to start your journey?</h2>
                    <p className="text-blue-100 text-lg mb-8 font-medium">Join thousands of South Africans moving smarter, safer, and together.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/find-rides" className="h-12 px-8 flex items-center justify-center rounded-lg bg-white text-blue-700 font-bold hover:bg-slate-50 transition-colors shadow-lg">
                            Find a Ride
                        </Link>
                        <Link to="/driver/join" className="h-12 px-8 flex items-center justify-center rounded-lg bg-blue-900/30 text-white font-bold hover:bg-blue-900/50 backdrop-blur-sm transition-colors shadow-sm border border-white/20">
                            Become a Driver
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
