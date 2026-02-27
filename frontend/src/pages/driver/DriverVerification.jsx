import React from 'react';
import { Link } from 'react-router-dom';
import {
    Car,
    Upload,
    Check,
    ShieldCheck,
    Trash2,
    ArrowRight,
    Award,
    Headset,
    IdCard
} from 'lucide-react';

export default function DriverVerification() {
    return (
        <div className="bg-slate-50 min-h-screen font-sans text-slate-900 pb-20">

            {/* Main Content */}
            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

                {/* Header Title */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900">Become a Verified Driver</h1>
                    <p className="mt-2 text-slate-600">Complete these 3 steps to start earning by sharing your ride. We value safety and trust above all.</p>
                </div>

                {/* Progress Bar */}
                <div className="mb-10">
                    <div className="relative">
                        <div aria-hidden="true" className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-300"></div>
                        </div>
                        <div className="relative flex justify-between px-2 sm:px-10">

                            <div className="flex flex-col items-center group bg-slate-50 px-2">
                                <span className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center ring-8 ring-slate-50 shadow-md">
                                    <Check className="text-white w-5 h-5" />
                                </span>
                                <span className="mt-3 text-sm font-medium text-blue-600">Personal ID</span>
                            </div>

                            <div className="flex flex-col items-center group relative bg-slate-50 px-2">
                                <span className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center ring-8 ring-slate-50 z-10 shadow-lg shadow-blue-500/20">
                                    <span className="text-white font-bold">2</span>
                                </span>
                                <span className="mt-3 text-sm font-bold text-blue-600">Vehicle Verification</span>
                            </div>

                            <div className="flex flex-col items-center group bg-slate-50 px-2">
                                <span className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center ring-8 ring-slate-50">
                                    <span className="text-slate-500 font-medium">3</span>
                                </span>
                                <span className="mt-3 text-sm font-medium text-slate-500">Background Check</span>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column: Form Forms */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Vehicle Details Card */}
                        <div className="bg-white shadow-sm border border-slate-200 rounded-xl p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                                    <Car className="text-blue-600 w-5 h-5" />
                                    Vehicle Details
                                </h2>
                                <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-md font-medium border border-blue-100">Step 2 of 3</span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="license-plate">License Plate Number</label>
                                    <input className="w-full rounded-lg border-slate-300 bg-white text-slate-900 focus:ring-blue-600 focus:border-blue-600 shadow-sm" id="license-plate" placeholder="e.g. ABC 123 GP" type="text" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="vehicle-model">Vehicle Model & Make</label>
                                    <input className="w-full rounded-lg border-slate-300 bg-white text-slate-900 focus:ring-blue-600 focus:border-blue-600 shadow-sm" id="vehicle-model" placeholder="e.g. Toyota Corolla 2020" type="text" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="vehicle-color">Color</label>
                                    <select className="w-full rounded-lg border-slate-300 bg-white text-slate-900 focus:ring-blue-600 focus:border-blue-600 shadow-sm" id="vehicle-color">
                                        <option>Select color</option>
                                        <option>White</option>
                                        <option>Black</option>
                                        <option>Silver</option>
                                        <option>Red</option>
                                        <option>Blue</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="seat-capacity">Seat Capacity</label>
                                    <select className="w-full rounded-lg border-slate-300 bg-white text-slate-900 focus:ring-blue-600 focus:border-blue-600 shadow-sm" id="seat-capacity">
                                        <option>4 Seats</option>
                                        <option>6 Seats</option>
                                        <option>7+ Seats</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Upload Documents Card */}
                        <div className="bg-white shadow-sm border border-slate-200 rounded-xl p-6">
                            <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                                <Upload className="text-blue-600 w-5 h-5" />
                                Upload Documents
                            </h2>
                            <p className="text-sm text-slate-500 mb-6">Please upload clear photos of your vehicle documents. We accept JPG, PNG, or PDF.</p>

                            <div className="space-y-4">

                                {/* Upload Item 1 */}
                                <div className="border border-dashed border-slate-300 rounded-lg p-4 hover:bg-slate-50 transition-colors cursor-pointer group relative">
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mr-4 group-hover:bg-blue-100 transition-colors">
                                            <IdCard className="w-5 h-5" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-sm font-medium text-slate-900">Driver's License Card</h3>
                                            <p className="text-xs text-slate-500">Front and back required</p>
                                        </div>
                                        <button className="text-sm text-blue-600 font-medium hover:underline group-hover:text-blue-700">Upload</button>
                                    </div>
                                </div>

                                {/* Upload Item 2 */}
                                <div className="border border-dashed border-slate-300 rounded-lg p-4 hover:bg-slate-50 transition-colors cursor-pointer group">
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mr-4 group-hover:bg-blue-100 transition-colors">
                                            <ShieldCheck className="w-5 h-5" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-sm font-medium text-slate-900">Proof of Insurance</h3>
                                            <p className="text-xs text-slate-500">Must be valid for at least 3 months</p>
                                        </div>
                                        <button className="text-sm text-blue-600 font-medium hover:underline group-hover:text-blue-700">Upload</button>
                                    </div>
                                </div>

                                {/* Upload Item 3 (Success State) */}
                                <div className="border border-solid border-green-200 bg-green-50 rounded-lg p-4 flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white mr-4">
                                            <Check className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium text-slate-900">Vehicle License Disc</h3>
                                            <p className="text-xs text-blue-600">Uploaded successfully</p>
                                        </div>
                                    </div>
                                    <button className="text-slate-400 hover:text-red-500 transition-colors">
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>

                            </div>
                        </div>

                        {/* Action Button */}
                        <div className="flex justify-end pt-4">
                            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-blue-600 text-white px-8 py-3 rounded-lg font-semibold shadow-lg shadow-blue-500/30 transition-all transform hover:-translate-y-0.5 flex items-center gap-2">
                                Next: Background Check
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>

                    </div>

                    {/* Right Column: Sidebar */}
                    <div className="space-y-6">

                        {/* Verification Status */}
                        <div className="bg-white shadow-sm border border-slate-200 rounded-xl p-6">
                            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Verification Status</h3>
                            <div className="relative pl-4 border-l-2 border-slate-200 space-y-6">

                                <div className="relative">
                                    <div className="absolute -left-[21.5px] bg-blue-500 h-4 w-4 rounded-full border-2 border-white shadow-sm"></div>
                                    <p className="text-sm font-medium text-slate-900">ID Verification</p>
                                    <p className="text-xs text-slate-500 mt-1">Completed on Oct 24, 10:30 AM</p>
                                </div>

                                <div className="relative">
                                    <div className="absolute -left-[21.5px] bg-blue-600 h-4 w-4 rounded-full border-2 border-white animate-pulse shadow-sm"></div>
                                    <p className="text-sm font-medium text-blue-600">Vehicle Details</p>
                                    <p className="text-xs text-slate-500 mt-1">In progress...</p>
                                </div>

                                <div className="relative">
                                    <div className="absolute -left-[21.5px] bg-slate-300 h-4 w-4 rounded-full border-2 border-white"></div>
                                    <p className="text-sm font-medium text-slate-400">Background Check</p>
                                    <p className="text-xs text-slate-500 mt-1">Pending submission</p>
                                </div>

                                <div className="relative">
                                    <div className="absolute -left-[21.5px] bg-slate-300 h-4 w-4 rounded-full border-2 border-white"></div>
                                    <p className="text-sm font-medium text-slate-400">Final Approval</p>
                                    <p className="text-xs text-slate-500 mt-1">Usually takes 24h</p>
                                </div>

                            </div>
                        </div>

                        {/* Why Verify Banner */}
                        <div className="bg-gradient-to-br from-blue-50 to-blue-50 border border-blue-100 rounded-xl p-6 shadow-sm">
                            <div className="flex items-start gap-4">
                                <Award className="text-yellow-500 w-8 h-8 flex-shrink-0" />
                                <div>
                                    <h4 className="font-bold text-slate-900">Why verify?</h4>
                                    <p className="text-sm text-slate-600 mt-1 leading-relaxed">Verified drivers get <span className="font-semibold text-blue-600">3x more bookings</span> and earn a "Trusted Driver" badge on their profile.</p>
                                </div>
                            </div>
                        </div>

                        {/* Contact Support */}
                        <div className="bg-white border border-slate-200 rounded-xl p-6 text-center">
                            <div className="flex justify-center mb-2">
                                <Headset className="text-slate-400 w-10 h-10" />
                            </div>
                            <h4 className="font-medium text-slate-900">Need help?</h4>
                            <p className="text-sm text-slate-500 mt-1 mb-4">Our support team can help you with your documents.</p>
                            <button className="text-blue-600 text-sm font-semibold hover:text-blue-700 hover:underline">Contact Support</button>
                        </div>

                    </div>

                </div>
            </main>

        </div>
    );
}
