import React from 'react';
import { Shield, Clock, UserCog, Map, Share2, Download, Trash, Mail, Phone, ExternalLink } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

export default function PrivacyPolicy() {
    return (
        <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950">
            {/* Header Section */}
            <section className="relative bg-white dark:bg-slate-900 py-12 lg:py-20 px-6 lg:px-40 border-b border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 h-[300px] w-[300px] rounded-full bg-blue-600 blur-[100px] opacity-10"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-[300px] w-[300px] rounded-full bg-indigo-600 blur-[100px] opacity-10"></div>

                <div className="relative z-10 max-w-[960px] mx-auto flex flex-col gap-6">
                    <div className="inline-flex items-center gap-2 self-start rounded-full bg-blue-100 dark:bg-blue-900/30 px-3 py-1 text-xs font-bold uppercase tracking-wide text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                        <Shield className="w-4 h-4" />
                        Legal Documentation
                    </div>
                    <h1 className="text-4xl font-black leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
                        Privacy Policy & <br className="hidden sm:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">POPIA Compliance</span>
                    </h1>
                    <p className="max-w-[720px] text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                        Last updated: October 24, 2023. Ensuring your data rights under South African Law. We are committed to transparency in how we collect, use, and protect your travel data.
                    </p>
                </div>
            </section>

            <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-10 px-6 py-10 lg:flex-row lg:px-10">
                {/* Sidebar */}
                <aside className="w-full lg:w-64 lg:shrink-0">
                    <div className="sticky top-28 flex flex-col gap-2 rounded-2xl bg-white dark:bg-slate-900 p-4 border border-slate-200 dark:border-slate-800 shadow-sm">
                        <span className="mb-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Contents</span>
                        <a href="#rights" className="flex items-center gap-3 rounded-lg bg-blue-50 dark:bg-slate-800/80 px-3 py-2 text-sm font-semibold text-blue-700 dark:text-blue-400 border-l-4 border-blue-600">
                            <Shield className="w-4 h-4" /> Your Rights
                        </a>
                        <a href="#compliance" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                            <Clock className="w-4 h-4" /> POPIA Details
                        </a>
                        <a href="#controls" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                            <UserCog className="w-4 h-4" /> Privacy Controls
                        </a>
                        <a href="#contact" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                            <Mail className="w-4 h-4" /> Contact Officer
                        </a>
                    </div>
                </aside>

                {/* Main Content */}
                <div className="flex flex-1 flex-col gap-12 pb-24">
                    {/* Rights Section */}
                    <div className="flex flex-col gap-6" id="rights">
                        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white md:text-3xl">Your Rights & Our Commitment</h2>
                        <p className="text-slate-600 dark:text-slate-400">
                            We align strictly with the Protection of Personal Information Act (POPIA) and the Data Protection Act to ensure your commute data remains yours.
                        </p>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mt-4">
                            <div className="flex flex-col gap-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
                                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                                    <Shield className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">POPIA Compliant</h3>
                                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Fully aligned with South Africa's regulatory framework for personal information.</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
                                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                                    <Clock className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">2-Year Retention</h3>
                                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Travel data is retained for max 24 months before irreversible anonymization.</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
                                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                                    <UserCog className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">User Control</h3>
                                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Right to data portability and the "Right to be Forgotten" are directly accessible.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Controls Preview */}
                    <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-1 shadow-lg" id="controls">
                        <div className="rounded-xl bg-white dark:bg-slate-950 p-6 md:p-8">
                            <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
                                <div>
                                    <div className="mb-2 inline-flex items-center gap-2 rounded bg-green-100 dark:bg-green-900/30 px-2 py-0.5 text-xs font-bold text-green-700 dark:text-green-400">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                        </span>
                                        DASHBOARD PREVIEW
                                    </div>
                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Privacy Controls</h2>
                                    <p className="text-slate-500 mt-1">Manage your data preferences effectively from the App Settings.</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex shadow-sm items-center justify-between rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-4">
                                    <div className="flex items-start gap-4">
                                        <Map className="w-5 h-5 text-slate-400 mt-0.5" />
                                        <div>
                                            <h4 className="font-bold text-slate-900 dark:text-white">Location History</h4>
                                            <p className="text-sm text-slate-500">Allow UrbanSmart to store your routes for easier future bookings.</p>
                                        </div>
                                    </div>
                                    <Switch checked={true} />
                                </div>

                                <div className="flex shadow-sm items-center justify-between rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-4">
                                    <div className="flex items-start gap-4">
                                        <Share2 className="w-5 h-5 text-slate-400 mt-0.5" />
                                        <div>
                                            <h4 className="font-bold text-slate-900 dark:text-white">Third-Party Analytics</h4>
                                            <p className="text-sm text-slate-500">Share anonymized commute habits to improve city traffic systems.</p>
                                        </div>
                                    </div>
                                    <Switch checked={false} />
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 pt-4 mt-2 border-t border-slate-200 dark:border-slate-800">
                                    <Button variant="outline" className="flex-1 gap-2">
                                        <Download className="w-4 h-4" /> Download My Data
                                    </Button>
                                    <Button variant="destructive" className="flex-1 gap-2 border-none">
                                        <Trash className="w-4 h-4" /> Request Deletion
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Detailed Compliance */}
                    <div className="flex flex-col gap-4" id="compliance">
                        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Detailed Policies</h2>
                        <div className="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                                <span className="bg-slate-100 dark:bg-slate-800 text-sm px-2 py-0.5 rounded text-blue-600 dark:text-blue-400 font-bold">01</span>
                                Information Collection
                            </h3>
                            <p className="mb-6">
                                We collect only the minimum amount of data required to provide our transport services. This includes GPS location data during active trips, payment information for fare processing, and contact details for service notifications. We do not sell your personal data to advertisers.
                            </p>

                            <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                                <span className="bg-slate-100 dark:bg-slate-800 text-sm px-2 py-0.5 rounded text-blue-600 dark:text-blue-400 font-bold">02</span>
                                Third-Party Sharing
                            </h3>
                            <p>
                                We may share data with vetted third-party processors who assist in payment facilitation (e.g., Yoco Payments) and cloud hosting (e.g., AWS Region). All third parties are bound by strict data processing agreements that align with POPIA.
                            </p>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="flex flex-col gap-6 rounded-2xl bg-slate-100 dark:bg-slate-900/50 p-6 md:p-8 border border-slate-200 dark:border-slate-800" id="contact">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Contact our Information Officer</h3>
                                <p className="mt-2 text-slate-600 dark:text-slate-400">
                                    If you have concerns about your privacy or wish to exercise your rights under POPIA.
                                </p>
                            </div>
                            <div className="flex flex-col gap-3 min-w-[200px]">
                                <a href="mailto:privacy@urbansmart34.co.za" className="flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline">
                                    <Mail className="w-4 h-4" /> privacy@urbansmart34.co.za
                                </a>
                                <div className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400">
                                    <Phone className="w-4 h-4" /> +27 11 123 4567
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
