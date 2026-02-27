import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function WalletDashboard() {
    const navigate = useNavigate();

    // Fetch wallet balance and stats
    const { data: balanceData, isLoading: isLoadingBalance } = useQuery({
        queryKey: ['walletBalance'],
        queryFn: async () => {
            try {
                const res = await axios.get('http://localhost:8000/wallet/balance');
                return res.data;
            } catch (error) {
                console.error("Error fetching balance:", error);
                return null;
            }
        }
    });

    // Fetch recent transactions (limit to a few for preview)
    const { data: transactions, isLoading: isLoadingTx } = useQuery({
        queryKey: ['walletTransactions', 'preview'],
        queryFn: async () => {
            try {
                const res = await axios.get('http://localhost:8000/wallet/transactions');
                return res.data;
            } catch (error) {
                console.error("Error fetching transactions:", error);
                return [];
            }
        }
    });

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR' }).format(amount);
    };

    return (
        <div className="flex-1 w-full max-w-[1280px] mx-auto px-4 md:px-10 py-8 font-sans">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                <div className="flex flex-col gap-2">
                    <h1 className="text-slate-900 dark:text-white text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">My Wallet</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-base font-normal max-w-2xl">
                        Manage your ride earnings, top-up for upcoming trips, and track your financial history securely.
                    </p>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm">
                    <span className="material-symbols-outlined text-[18px] text-blue-600">lock</span>
                    <span>Payments secured by 256-bit encryption</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
                {/* Main Balance Card */}
                <div className="lg:col-span-7 flex flex-col justify-between bg-white dark:bg-slate-800 rounded-xl p-0 border border-slate-200 dark:border-slate-700 shadow-sm relative overflow-hidden group">
                    <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-6 relative overflow-hidden">
                        <div className="absolute -right-10 -top-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                        <div className="relative z-10 text-white">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="font-medium text-sm uppercase tracking-wider opacity-90">Available Balance</span>
                                <span className="material-symbols-outlined text-white/70 text-[18px] cursor-help" title="Funds available for immediate use">info</span>
                            </div>
                            <h2 className="text-5xl font-bold tracking-tight text-white">
                                {isLoadingBalance ? '...' : formatCurrency(balanceData?.available_balance || 0)}
                            </h2>
                        </div>
                    </div>
                    <div className="p-6">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center text-orange-600 dark:text-orange-400">
                                    <span className="material-symbols-outlined">pending</span>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-900 dark:text-white">Escrowed Funds</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                        {isLoadingBalance ? '...' : formatCurrency(balanceData?.escrowed_funds || 0)} pending completion of trips
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="lg:col-span-5 bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-center gap-4">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-4 h-full">
                        <button className="flex flex-col items-center justify-center gap-3 p-4 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-blue-600 text-white transition-all shadow-md hover:shadow-lg group">
                            <div className="p-2 bg-white/20 rounded-full group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-[28px]">add</span>
                            </div>
                            <span className="font-bold text-sm">Top Up Wallet</span>
                        </button>
                        <button className="flex flex-col items-center justify-center gap-3 p-4 rounded-lg bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-600 transition-all group">
                            <div className="p-2 bg-white dark:bg-slate-600 rounded-full shadow-sm group-hover:scale-110 transition-transform text-slate-700 dark:text-slate-200">
                                <span className="material-symbols-outlined text-[28px]">account_balance</span>
                            </div>
                            <span className="font-bold text-sm">Withdraw</span>
                        </button>
                    </div>
                </div>
            </div>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Account Overview</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {/* Total Earned KPI */}
                <div className="bg-white dark:bg-slate-800 p-5 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col gap-1 hover:border-blue-500/30 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                        <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg text-green-600 dark:text-green-400">
                            <span className="material-symbols-outlined">trending_up</span>
                        </div>
                        {balanceData?.earned_change && (
                            <span className="text-xs font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded">
                                +{balanceData.earned_change}%
                            </span>
                        )}
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Total Earned</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">
                        {isLoadingBalance ? '...' : formatCurrency(balanceData?.total_earned || 0)}
                    </p>
                </div>

                {/* Total Spent KPI */}
                <div className="bg-white dark:bg-slate-800 p-5 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col gap-1 hover:border-blue-500/30 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                        <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-lg text-red-600 dark:text-red-400">
                            <span className="material-symbols-outlined">trending_down</span>
                        </div>
                        {balanceData?.spent_change && (
                            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">vs last month</span>
                        )}
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Total Spent</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">
                        {isLoadingBalance ? '...' : formatCurrency(balanceData?.total_spent || 0)}
                    </p>
                </div>

                {/* Trips Completed KPI */}
                <div className="bg-white dark:bg-slate-800 p-5 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col gap-1 hover:border-blue-500/30 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                        <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600">
                            <span className="material-symbols-outlined">directions_car</span>
                        </div>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Trips Completed</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">
                        {isLoadingBalance ? '...' : balanceData?.trips_completed || 0}
                    </p>
                </div>

                {/* Upcoming Trips KPI */}
                <div className="bg-white dark:bg-slate-800 p-5 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col gap-1 hover:border-blue-500/30 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                        <div className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg text-orange-600 dark:text-orange-400">
                            <span className="material-symbols-outlined">schedule</span>
                        </div>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Upcoming Trips</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">
                        {isLoadingBalance ? '...' : balanceData?.upcoming_trips || 0}
                    </p>
                </div>
            </div>

            {/* Recent Transactions Preview */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden mb-6">
                <div className="flex flex-wrap items-center justify-between gap-4 p-5 border-b border-slate-100 dark:border-slate-700">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Recent Transactions</h3>
                    <div className="flex gap-2">
                        <button onClick={() => navigate('/wallet/transactions')} className="px-4 py-2 text-sm font-medium rounded-lg text-blue-600 bg-blue-50 hover:bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 transition-colors">
                            View All History
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[600px]">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-700">
                                <th className="p-4 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 whitespace-nowrap">Date & Time</th>
                                <th className="p-4 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 whitespace-nowrap">Description</th>
                                <th className="p-4 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 whitespace-nowrap">Type</th>
                                <th className="p-4 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 whitespace-nowrap">Status</th>
                                <th className="p-4 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 text-right whitespace-nowrap">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-700 text-sm">
                            {isLoadingTx ? (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-slate-500">Loading transactions...</td>
                                </tr>
                            ) : transactions && transactions.length > 0 ? (
                                transactions.slice(0, 5).map((tx) => (
                                    <tr key={tx.id} className="group hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                                        <td className="p-4 text-slate-600 dark:text-slate-300 whitespace-nowrap">
                                            <div className="flex flex-col">
                                                <span className="font-medium text-slate-900 dark:text-white">{tx.date}</span>
                                                <span className="text-xs text-slate-500">{tx.time}</span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-8 h-8 rounded flex items-center justify-center shrink-0 ${tx.icon_color === 'blue' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600' :
                                                        tx.icon_color === 'slate' ? 'bg-slate-100 dark:bg-slate-800 text-slate-600' :
                                                            tx.icon_color === 'teal' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600' :
                                                                tx.icon_color === 'orange' ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-600' :
                                                                    'bg-slate-50 dark:bg-slate-900/20 text-slate-600'
                                                    }`}>
                                                    <span className="material-symbols-outlined text-[18px]">{tx.icon}</span>
                                                </div>
                                                <div>
                                                    <p className="font-medium text-slate-900 dark:text-white">{tx.description}</p>
                                                    <p className="text-xs text-slate-500">{tx.sub_description}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 text-slate-600 dark:text-slate-300">{tx.type}</td>
                                        <td className="p-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${tx.status === 'Completed' || tx.status === 'Success' ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'}`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${tx.status === 'Completed' || tx.status === 'Success' ? 'bg-green-600' : 'bg-orange-500'}`}></span> {tx.status}
                                            </span>
                                        </td>
                                        <td className={`p-4 text-right font-bold whitespace-nowrap ${tx.amount.startsWith('+') ? 'text-green-600 dark:text-green-400' : tx.amount.startsWith('-') ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-500'}`}>
                                            {tx.amount}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-slate-500">No recent transactions found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
