import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminIssueTracking = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All Categories');
    const [severityFilter, setSeverityFilter] = useState('All');

    const { data: issues, isLoading } = useQuery({
        queryKey: ['adminDisputes'],
        queryFn: async () => {
            try {
                const res = await axios.get('http://localhost:8000/admin/disputes');
                return res.data;
            } catch (error) {
                console.error("Error fetching disputes:", error);
                return [];
            }
        }
    });

    const filteredIssues = issues?.filter(issue => {
        const matchesSearch = issue.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (issue.user_name || '').toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === 'All Categories' || issue.type === categoryFilter;
        // In a real app we'd map status to severity, here we mock it for the UI
        return matchesSearch && matchesCategory;
    }) || [];

    const handleRowClick = (id) => {
        navigate(`/admin/disputes/${id}`);
    };

    return (
        <div className="bg-[#f6f8f8] dark:bg-[#102022] text-slate-900 dark:text-slate-100 min-h-screen flex flex-col font-sans transition-colors duration-200">
            <header className="h-auto flex flex-col bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
                <div className="px-6 py-5 flex items-end justify-between gap-4 bg-gradient-to-r from-white via-white to-blue-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-blue-900/10">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Issue Tracking Queue</h2>
                        <p className="text-slate-500 text-sm">Manage and resolve reported incidents across the platform.</p>
                    </div>
                </div>

                {/* Top KPI Cards (Static for now to match UI) */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-slate-200 dark:bg-slate-700 border-t border-slate-200 dark:border-slate-800">
                    <div className="bg-white dark:bg-slate-900 p-4 flex flex-col gap-1">
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Critical Issues</span>
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold dark:text-white">12</span>
                            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">+2 new</span>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-4 flex flex-col gap-1">
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Avg Response</span>
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold dark:text-white">4m 32s</span>
                            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">-12%</span>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-4 flex flex-col gap-1">
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Open Disputes</span>
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold dark:text-white">8</span>
                            <span className="text-xs font-medium text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded border border-orange-100">Action req</span>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-4 flex flex-col gap-1">
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Resolved Today</span>
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold dark:text-white">45</span>
                            <span className="text-xs font-medium text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100">Target: 50</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Filters Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-6 py-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm z-10">
                <div className="flex flex-1 max-w-2xl gap-2">
                    <div className="relative flex-1">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 material-icons-outlined text-xl">search</span>
                        <input
                            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                            placeholder="Search by Issue ID, User..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="relative w-48 hidden sm:block">
                        <select
                            className="w-full pl-3 pr-10 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 appearance-none"
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                        >
                            <option>All Categories</option>
                            <option value="Safety Incident">Safety</option>
                            <option value="Dispute">Dispute</option>
                            <option value="Technical Issue">Technical</option>
                        </select>
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 material-icons-outlined text-xl pointer-events-none">expand_more</span>
                    </div>
                </div>
            </div>

            {/* Main Table */}
            <main className="flex-1 overflow-auto px-6 py-6">
                <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 text-xs uppercase tracking-wider text-slate-500 font-bold">
                                <th className="px-6 py-4 w-24">ID</th>
                                <th className="px-6 py-4">User</th>
                                <th className="px-6 py-4">Category</th>
                                <th className="px-6 py-4">Severity / Status</th>
                                <th className="px-6 py-4">Time Open</th>
                                <th className="px-6 py-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {isLoading ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-8 text-center text-slate-500">Loading issues...</td>
                                </tr>
                            ) : filteredIssues.length > 0 ? (
                                filteredIssues.map((issue) => (
                                    <tr
                                        key={issue.id}
                                        onClick={() => handleRowClick(issue.id)}
                                        className="group hover:bg-blue-50/30 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
                                    >
                                        <td className="px-6 py-4">
                                            <span className="font-mono text-slate-500 text-sm bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                                                {issue.id.substring(0, 8)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-9 w-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs uppercase">
                                                    {issue.user_initial || 'U'}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                                                        {issue.user_name || 'Unknown User'}
                                                    </span>
                                                    <span className="text-xs text-slate-500">Member</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium text-slate-900 dark:text-white">{issue.type || 'General'}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${issue.status === 'Urgent' || issue.status === 'Under Review' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'
                                                }`}>
                                                {issue.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-mono text-slate-600 dark:text-slate-400">
                                                {issue.created_at || 'Recently'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="bg-gradient-to-r from-blue-500 to-sky-500 hover:from-blue-600 hover:to-sky-600 text-white text-xs font-bold px-4 py-2 rounded-lg transition-all shadow-sm">
                                                Review
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-6 py-8 text-center text-slate-500">No issues found matching criteria.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
};

export default AdminIssueTracking;
