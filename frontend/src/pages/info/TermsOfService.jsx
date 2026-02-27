import React, { useEffect, useState } from 'react';
import { ChevronRight, FileText, CheckCircle, AlertCircle, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TermsOfService() {
    const [activeSection, setActiveSection] = useState('introduction');

    // Make smooth scrolling for sections via simple state check for active styles
    const navItems = [
        { id: 'introduction', label: '1. Introduction' },
        { id: 'user-responsibilities', label: '2. User Responsibilities' },
        { id: 'payment-terms', label: '3. Payment Terms' },
        { id: 'cancellation-policy', label: '4. Cancellation Policy' },
        { id: 'data-usage', label: '5. Data Usage & Privacy' },
        { id: 'cookie-policy', label: '6. Cookie Policy' },
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col pt-10">
            <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-start">

                    {/* Floating Sidebar Navigation */}
                    <aside className="hidden lg:block lg:col-span-3 sticky top-28">
                        <nav className="space-y-1 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <p className="px-3 text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Jump To</p>

                            {navItems.map((item) => (
                                <a
                                    key={item.id}
                                    href={`#${item.id}`}
                                    onClick={() => setActiveSection(item.id)}
                                    className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all border-l-4 ${activeSection === item.id
                                            ? 'bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400'
                                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white border-transparent'
                                        }`}
                                >
                                    <span className="truncate">{item.label}</span>
                                </a>
                            ))}
                        </nav>

                        <div className="mt-6 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-800/80 rounded-xl border border-blue-100 dark:border-slate-700">
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">Need Clarification?</h4>
                            <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">Our support team is available 24/7 if you don't understand any of the terms.</p>
                            <Link to="/help" className="inline-flex items-center text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline">
                                Visit Support Center <ChevronRight className="w-4 h-4 ml-1" />
                            </Link>
                        </div>
                    </aside>

                    {/* Content Section */}
                    <section className="lg:col-span-9 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 md:p-12 prose dark:prose-invert max-w-none prose-slate">

                        <div className="border-b border-slate-200 dark:border-slate-800 pb-8 mb-8">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-300 mb-4 gap-2">
                                <Calendar className="w-3 h-3" />
                                Last Updated: October 24, 2023
                            </span>
                            <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4 mt-0">
                                Terms of Service <span className="text-slate-400 dark:text-slate-600 font-normal">&</span> Cookie Policy
                            </h1>
                            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
                                Welcome to UrbanSmart-34. Please read these terms carefully before using our travel platform. By accessing or using our services, you agree to be bound by these terms.
                            </p>
                        </div>

                        {/* 1. Intro */}
                        <div id="introduction" className="scroll-mt-28 mb-12">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center">
                                <span className="w-1.5 h-6 bg-blue-600 rounded-full mr-3"></span>
                                1. Introduction
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400">
                                UrbanSmart-34 ("we," "our," or "us") provides an online platform that connects users seeking transportation services with independent third-party providers. These Terms of Service apply to your access and use of our website, mobile application, and related services in South Africa.
                            </p>
                        </div>

                        {/* 2. Responsibilities */}
                        <div id="user-responsibilities" className="scroll-mt-28 mb-12 border-t border-slate-100 dark:border-slate-800 pt-8">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center">
                                <span className="w-1.5 h-6 bg-blue-600 rounded-full mr-3"></span>
                                2. User Responsibilities
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 mb-6">
                                You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to:
                            </p>
                            <ul className="space-y-4 list-none pl-0">
                                <li className="flex items-start bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg">
                                    <CheckCircle className="text-emerald-500 w-5 h-5 mr-3 shrink-0" />
                                    <span className="text-slate-700 dark:text-slate-300">Provide accurate, current, and complete information during registration.</span>
                                </li>
                                <li className="flex items-start bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg">
                                    <CheckCircle className="text-emerald-500 w-5 h-5 mr-3 shrink-0" />
                                    <span className="text-slate-700 dark:text-slate-300">Use the services only for lawful purposes in accordance with these Terms.</span>
                                </li>
                                <li className="flex items-start bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg">
                                    <AlertCircle className="text-red-500 w-5 h-5 mr-3 shrink-0" />
                                    <span className="text-slate-700 dark:text-slate-300">Not engage in any fraudulent, abusive, or illegal activities including manipulating ride prices.</span>
                                </li>
                            </ul>
                        </div>

                        {/* 3. Payments */}
                        <div id="payment-terms" className="scroll-mt-28 mb-12 border-t border-slate-100 dark:border-slate-800 pt-8">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center">
                                <span className="w-1.5 h-6 bg-blue-600 rounded-full mr-3"></span>
                                3. Payment Terms
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 mb-6">
                                Charges for services are due immediately upon booking. Payments are held in Escrow and facilitated through Yoco's secure payment processors until the ride is successfully completed.
                            </p>
                            <div className="bg-slate-50 dark:bg-slate-950 rounded-xl p-6 border border-slate-200 dark:border-slate-800">
                                <h4 className="font-bold text-slate-900 dark:text-white mb-4 mt-0">Accepted Payment Methods</h4>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <span className="px-3 py-1 bg-white dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-700 dark:text-slate-300">Credit/Debit Card</span>
                                    <span className="px-3 py-1 bg-white dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-700 dark:text-slate-300">Instant EFT</span>
                                    <span className="px-3 py-1 bg-white dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-700 dark:text-slate-300">Apple/Google Pay</span>
                                </div>
                                <p className="text-sm text-slate-500 dark:text-slate-500 italic m-0">
                                    * All transactions are processed in South African Rand (ZAR) under POPIA compliant conditions.
                                </p>
                            </div>
                        </div>

                        {/* 4. Cancellations */}
                        <div id="cancellation-policy" className="scroll-mt-28 mb-12 border-t border-slate-100 dark:border-slate-800 pt-8">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center">
                                <span className="w-1.5 h-6 bg-blue-600 rounded-full mr-3"></span>
                                4. Cancellation Policy
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 mb-6">
                                We understand plans change. You may cancel your request for services at any time. However, a cancellation fee may apply to compensate drivers for their time if they have already traveled towards you.
                            </p>
                            <div className="overflow-hidden border border-slate-200 dark:border-slate-800 rounded-lg">
                                <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800 m-0">
                                    <thead className="bg-slate-50 dark:bg-slate-950">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider bg-transparent">Timeframe (Inter-City Trips)</th>
                                            <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider bg-transparent">Fee Applied</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white dark:bg-slate-900 divide-y divide-slate-200 dark:divide-slate-800">
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 dark:text-slate-300">Greater than 24 hours</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-emerald-600 dark:text-emerald-400 font-bold">100% Refund</td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 dark:text-slate-300">Under 24 hours</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 dark:text-slate-300">50% Platform Credit</td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 dark:text-slate-300">Driver Arrived / No Show</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 dark:text-red-400 font-bold">No Refund</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* 6. Cookies */}
                        <div id="cookie-policy" className="scroll-mt-28 mb-12 border-t border-slate-100 dark:border-slate-800 pt-8">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center">
                                <span className="w-1.5 h-6 bg-blue-600 rounded-full mr-3"></span>
                                6. Cookie Policy
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 mb-6">
                                Our website uses cookies to distinguish you from other users. This helps us provide you with a good experience when you browse our website and allows us to improve our site securely.
                            </p>
                            <div className="bg-slate-50 dark:bg-slate-950/50 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
                                <h3 className="font-bold text-slate-900 dark:text-white mt-0 mb-2">Essential Cookies Only</h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm mb-0">
                                    We primarily use essential cookies to manage your secure session tokens (JWT) and application state. Without these, the core booking platform cannot function. You can clear these via your browser settings at any time, but doing so will sign you out.
                                </p>
                            </div>
                        </div>

                    </section>
                </div>
            </main>
        </div>
    );
}
