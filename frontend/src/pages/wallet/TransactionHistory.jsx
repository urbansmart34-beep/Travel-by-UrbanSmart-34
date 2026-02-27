import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function TransactionHistory() {
    const [filterType, setFilterType] = useState('All Types');
    const [filterStatus, setFilterStatus] = useState('All Status');

    // Fetch all transactions
    const { data: transactions, isLoading } = useQuery({
        queryKey: ['walletTransactions', 'all'],
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

    return (
        <div className="flex-1 w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans">
            <nav className="flex mb-6 text-sm font-medium text-slate-500 dark:text-slate-400">
                <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</Link>
                <span className="mx-2">/</span>
                <Link to="/wallet" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Wallet</Link>
                <span className="mx-2">/</span>
                <span className="text-slate-900 dark:text-white">History</span>
            </nav>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                    <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white mb-2">Transaction History & Records</h2>
                    <p className="text-slate-500 dark:text-slate-400 max-w-2xl">
                        View and manage your payments, refunds, and payouts. Keep track of all financial activities associated with your account.
                    </p>
                </div>
                <button className="flex items-center gap-2 h-10 px-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400 transition-all shadow-sm">
                    <span className="material-symbols-outlined text-[20px]">download</span>
                    Export to CSV
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col gap-2 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-600"></div>
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Current Balance</p>
                        <div className="p-1.5 rounded-md bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300">
                            <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
                        </div>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <p className="text-2xl font-bold text-slate-900 dark:text-white">R 2,450.00</p>
                    </div>
                </div>
                <div className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col gap-2 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-slate-400 dark:bg-slate-600"></div>
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Spent (Oct)</p>
                        <div className="p-1.5 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-300">
                            <span className="material-symbols-outlined text-[20px]">shopping_cart</span>
                        </div>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <p className="text-2xl font-bold text-slate-900 dark:text-white">R 1,100.00</p>
                        <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-1.5 py-0.5 rounded">-5%</span>
                    </div>
                </div>
                <div className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col gap-2 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Earned (Oct)</p>
                        <div className="p-1.5 rounded-md bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300">
                            <span className="material-symbols-outlined text-[20px]">payments</span>
                        </div>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <p className="text-2xl font-bold text-slate-900 dark:text-white">R 5,200.00</p>
                        <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-1.5 py-0.5 rounded">+12.5%</span>
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm mb-6">
                <div className="flex flex-col lg:flex-row gap-4">
                    <div className="flex-1 relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                            <span className="material-symbols-outlined text-[20px]">search</span>
                        </div>
                        <input className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 dark:border-slate-600 rounded-lg leading-5 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-600 dark:focus:ring-blue-400 focus:border-blue-600 dark:focus:border-blue-400 sm:text-sm transition-shadow" placeholder="Search by Reference ID (e.g., TR-8821)" type="text" />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="relative min-w-[160px]">
                            <button className="flex items-center justify-between w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded-lg text-sm text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-600 dark:focus:ring-blue-400">
                                <span>Last 30 Days</span>
                                <span className="material-symbols-outlined text-[18px] text-slate-400">calendar_today</span>
                            </button>
                        </div>
                        <div className="relative min-w-[140px]">
                            <select
                                className="appearance-none block w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded-lg text-sm text-slate-600 dark:text-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-600 dark:focus:ring-blue-400 focus:border-blue-600 dark:focus:border-blue-400 cursor-pointer"
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                            >
                                <option>All Types</option>
                                <option>Earnings</option>
                                <option>Spending</option>
                                <option>Deposit</option>
                                <option>Withdrawal</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                                <span className="material-symbols-outlined text-[18px]">expand_more</span>
                            </div>
                        </div>
                        <div className="relative min-w-[140px]">
                            <select
                                className="appearance-none block w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded-lg text-sm text-slate-600 dark:text-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-600 dark:focus:ring-blue-400 focus:border-blue-600 dark:focus:border-blue-400 cursor-pointer"
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                            >
                                <option>All Status</option>
                                <option>Completed</option>
                                <option>Pending</option>
                                <option>Failed</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                                <span className="material-symbols-outlined text-[18px]">expand_more</span>
                            </div>
                        </div>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg text-sm transition-colors shadow-sm dark:bg-blue-500 dark:text-slate-900 dark:hover:bg-blue-400">
                            Filter
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                        <thead className="bg-gradient-to-r from-slate-50 to-blue-50/30 dark:from-slate-900 dark:to-slate-800/50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider" scope="col">Date</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider" scope="col">Type</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider" scope="col">Reference ID</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider" scope="col">Status</th>
                                <th className="px-6 py-4 text-right text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider" scope="col">Amount</th>
                                <th className="px-6 py-4 text-right text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider" scope="col"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-white dark:bg-slate-800">
                            {isLoading ? (
                                <tr>
                                    <td colSpan="6" className="p-8 text-center text-slate-500">Loading transactions...</td>
                                </tr>
                            ) : transactions && transactions.length > 0 ? (
                                transactions.map((tx) => (
                                    <tr key={tx.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-slate-200">
                                            <div className="font-medium">{tx.date}</div>
                                            <div className="text-xs text-slate-500">{tx.time}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className={`flex-shrink-0 size-8 rounded-full flex items-center justify-center mr-3 ${tx.icon_color === 'blue' ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' :
                                                        tx.icon_color === 'slate' ? 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400' :
                                                            tx.icon_color === 'teal' ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' :
                                                                tx.icon_color === 'orange' ? 'bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400' :
                                                                    tx.icon_color === 'red' ? 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400' :
                                                                        'bg-slate-50 dark:bg-slate-900/30 text-slate-600 dark:text-slate-400'
                                                    }`}>
                                                    <span className="material-symbols-outlined text-[18px]">{tx.icon}</span>
                                                </div>
                                                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{tx.type}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <a className="text-blue-600 hover:text-blue-800 font-medium font-mono dark:text-blue-400" href="#">{tx.id}</a>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${tx.status === 'Completed' || tx.status === 'Success' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400' : tx.status === 'Pending' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'}`}>
                                                {tx.status}
                                            </span>
                                        </td>
                                        <td className={`px-6 py-4 whitespace-nowrap text-right text-sm font-bold ${tx.amount.startsWith('+') ? 'text-emerald-600 dark:text-emerald-400' : tx.amount.startsWith('-') ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>
                                            {tx.amount}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                                                <span className="material-symbols-outlined text-[20px]">more_vert</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="p-8 text-center text-slate-500">No transactions found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="bg-white dark:bg-slate-800 px-4 py-3 flex items-center justify-between border-t border-slate-200 dark:border-slate-700 sm:px-6">
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-slate-700 dark:text-slate-300">
                                Showing
                                <span className="font-medium mx-1">1</span>
                                to
                                <span className="font-medium mx-1">{transactions?.length || 0}</span>
                                of
                                <span className="font-medium mx-1">{transactions?.length || 0}</span>
                                results
                            </p>
                        </div>
                        <div>
                            <nav aria-label="Pagination" className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                <a className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm font-medium text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700" href="#">
                                    <span className="sr-only">Previous</span>
                                    <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                                </a>
                                <a aria-current="page" className="z-10 bg-blue-50 border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-400 dark:bg-blue-900/20 relative inline-flex items-center px-4 py-2 border text-sm font-medium" href="#">
                                    1
                                </a>
                                <a className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm font-medium text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700" href="#">
                                    <span className="sr-only">Next</span>
                                    <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                                </a>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
