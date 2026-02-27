import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const AdminCommandCenter = () => {
    // We will fetch these from our new FastAPI endpoints
    const { data: stats, isLoading: statsLoading } = useQuery({
        queryKey: ['adminStats'],
        queryFn: async () => {
            try {
                const res = await axios.get('http://localhost:8000/admin/dashboard/stats');
                return res.data;
            } catch (e) {
                return {
                    activeTrips: 0, activeTripsTrend: 0, todaysBookings: 0, todaysBookingsTrend: 0, revenueEst: 0, revenueTrend: 0, pendingIssues: 0
                }
            }
        }
    });

    const { data: issues, isLoading: issuesLoading } = useQuery({
        queryKey: ['adminIssues'],
        queryFn: async () => {
            try {
                const res = await axios.get('http://localhost:8000/admin/issues');
                return res.data;
            } catch (e) {
                return [];
            }
        }
    });

    const { data: logs, isLoading: logsLoading } = useQuery({
        queryKey: ['adminLogs'],
        queryFn: async () => {
            try {
                const res = await axios.get('http://localhost:8000/admin/logs');
                return res.data;
            } catch (e) {
                return [];
            }
        }
    });

    return (
        <div className="bg-[#f0f7fa] dark:bg-[#0f172a] text-slate-800 dark:text-slate-100 min-h-screen transition-colors duration-200">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-gray-200/60 dark:border-gray-700/60">
                    <div>
                        <h1 className="text-3xl font-bold">Admin Command Center</h1>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">
                            Welcome back, <span className="font-medium text-blue-700 dark:text-blue-400">Admin</span>
                        </p>
                    </div>
                    <div className="mt-4 md:mt-0 flex items-center gap-3">
                        <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                            <span className="w-2 h-2 mr-2 bg-emerald-500 rounded-full animate-pulse"></span>
                            System Healthy
                        </span>
                        <button className="flex items-center gap-2 bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-gray-600 px-4 py-2 rounded-lg text-sm font-medium hover:border-blue-500 transition-all shadow-sm">
                            <span className="material-icons-outlined text-sm text-blue-600 dark:text-blue-400">calendar_today</span>
                            Today
                        </button>
                    </div>
                </div>

                {/* KPIs */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {/* Active Trips Card */}
                    <div className="bg-white dark:bg-[#1e293b] p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 group hover:border-blue-200 dark:hover:border-blue-800 transition-all">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Active Trips</p>
                                <p className="text-4xl font-bold mt-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    {statsLoading ? '...' : stats.activeTrips}
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 group-hover:bg-blue-100 transition-colors">
                                <span className="material-icons-outlined text-2xl">directions_car</span>
                            </div>
                        </div>
                    </div>

                    {/* Bookings Card */}
                    <div className="bg-white dark:bg-[#1e293b] p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 group hover:border-purple-200 dark:hover:border-purple-800 transition-all">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Today's Bookings</p>
                                <p className="text-4xl font-bold mt-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                                    {statsLoading ? '...' : stats.todaysBookings}
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 group-hover:bg-purple-100 transition-colors">
                                <span className="material-icons-outlined text-2xl">confirmation_number</span>
                            </div>
                        </div>
                    </div>

                    {/* Revenue Score Card */}
                    <div className="bg-white dark:bg-[#1e293b] p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 group hover:border-blue-200 dark:hover:border-blue-800 transition-all">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Revenue (Est)</p>
                                <p className="text-4xl font-bold mt-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    ${statsLoading ? '...' : (stats.revenueEst / 1000).toFixed(1)}k
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 group-hover:bg-blue-100 transition-colors">
                                <span className="material-icons-outlined text-2xl">payments</span>
                            </div>
                        </div>
                    </div>

                    {/* Pending Issues Card */}
                    <div className="bg-white dark:bg-[#1e293b] p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 relative overflow-hidden group hover:border-orange-200 dark:hover:border-orange-800 transition-all">
                        <div className="absolute right-0 top-0 h-full w-1.5 bg-orange-500/80"></div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Pending Issues</p>
                                <p className="text-4xl font-bold mt-3 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                                    {statsLoading ? '...' : stats.pendingIssues}
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 group-hover:bg-orange-100 transition-colors">
                                <span className="material-icons-outlined text-2xl">warning_amber</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Lower Layout Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column (Modules & Priority Items) */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Modules Hub */}
                        <div className="bg-white dark:bg-[#1e293b] rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
                            <h2 className="text-lg font-bold mb-6 flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400">
                                    <span className="material-icons-outlined">dashboard</span>
                                </div>
                                Management Modules
                            </h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                                {/* We will route these to the other missing pages later */}
                                <button className="group flex flex-col items-center justify-center p-6 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800 hover:shadow-md transition-all border border-transparent hover:border-blue-100 h-32">
                                    <span className="material-icons-outlined text-4xl text-gray-400 group-hover:text-blue-500 mb-3 transition-colors">gavel</span>
                                    <span className="text-sm font-semibold text-slate-500 group-hover:text-blue-700 transition-colors">Disputes</span>
                                </button>
                                <button className="group flex flex-col items-center justify-center p-6 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800 hover:shadow-md transition-all border border-transparent hover:border-blue-100 h-32">
                                    <span className="material-icons-outlined text-4xl text-gray-400 group-hover:text-blue-500 mb-3 transition-colors">bar_chart</span>
                                    <span className="text-sm font-semibold text-slate-500 group-hover:text-blue-700 transition-colors">Analytics</span>
                                </button>
                                <button className="group flex flex-col items-center justify-center p-6 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800 hover:shadow-md transition-all border border-transparent hover:border-blue-100 h-32">
                                    <span className="material-icons-outlined text-4xl text-gray-400 group-hover:text-indigo-500 mb-3 transition-colors">alt_route</span>
                                    <span className="text-sm font-semibold text-slate-500 group-hover:text-indigo-700 transition-colors">Route Mgr</span>
                                </button>
                            </div>
                        </div>

                        {/* Priority Items Table */}
                        <div className="bg-white dark:bg-[#1e293b] rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/30">
                                <h2 className="text-lg font-bold flex items-center gap-2">
                                    <span className="material-icons-outlined text-red-500">priority_high</span>
                                    Priority Issues
                                </h2>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-gray-100 dark:border-gray-700 text-sm text-slate-500 dark:text-slate-400">
                                            <th className="px-6 py-4 font-medium">Issue ID</th>
                                            <th className="px-6 py-4 font-medium">User</th>
                                            <th className="px-6 py-4 font-medium">Type</th>
                                            <th className="px-6 py-4 font-medium">Status</th>
                                            <th className="px-6 py-4 text-right font-medium">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm">
                                        {issuesLoading ? (
                                            <tr><td colSpan="5" className="text-center py-8 text-slate-500">Loading issues...</td></tr>
                                        ) : issues && issues.length > 0 ? (
                                            issues.map((issue) => (
                                                <tr key={issue.id} className="border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                                                    <td className="px-6 py-4 font-mono text-slate-500 text-xs">{issue.id}</td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 flex items-center justify-center font-bold text-xs">
                                                                {issue.user_initial || "U"}
                                                            </div>
                                                            <span className="font-medium text-slate-700 dark:text-slate-300">{issue.user_name || "Unknown"}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">{issue.type || 'General Issue'}</td>
                                                    <td className="px-6 py-4">
                                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${issue.status === 'Urgent' ? 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400' :
                                                                issue.status === 'Reviewing' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400' :
                                                                    'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400'
                                                            }`}>
                                                            {issue.status || 'New'}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium">Resolve</button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr><td colSpan="5" className="text-center py-8 text-slate-500">No pending issues.</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Right Column (Activity Feed) */}
                    <div className="lg:col-span-1">
                        <div className="bg-white dark:bg-[#1e293b] rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 h-full p-6">
                            <h2 className="text-lg font-bold flex items-center gap-3 mb-6">
                                <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                                    <span className="material-icons-outlined">history</span>
                                </div>
                                Real-time Activity
                            </h2>
                            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 dark:before:via-slate-700 before:to-transparent">
                                {logsLoading ? (
                                    <div className="text-center py-8 text-slate-500">Loading feeds...</div>
                                ) : logs && logs.length > 0 ? (
                                    logs.map((log, index) => (
                                        <div key={log.id || index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white dark:border-slate-900 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                                                <span className="material-icons-outlined text-sm">
                                                    {log.event_type === 'Booking' ? 'airplane_ticket' :
                                                        log.event_type === 'Trip' ? 'local_taxi' :
                                                            log.event_type === 'Support' ? 'contact_support' : 'info'}
                                                </span>
                                            </div>
                                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white dark:bg-slate-800/50 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
                                                <div className="flex items-center justify-between mb-1">
                                                    <span className="font-bold text-slate-700 dark:text-slate-200 text-sm">{log.event_type}</span>
                                                    <span className="text-xs text-slate-400 font-mono">
                                                        {new Date(log.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-slate-500 dark:text-slate-400">{log.message}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-8 text-slate-500">No recent activity.</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminCommandCenter;
