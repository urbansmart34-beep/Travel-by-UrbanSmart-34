import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useToast } from "@/components/ui/use-toast";

const AdminDisputeDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { toast } = useToast();
    const [resolutionNote, setResolutionNote] = useState('');
    const [resolving, setResolving] = useState(false);

    const { data: dispute, isLoading } = useQuery({
        queryKey: ['adminDisputeDetail', id],
        queryFn: async () => {
            try {
                const res = await axios.get(`http://localhost:8000/admin/disputes/${id}`);
                return res.data;
            } catch (error) {
                console.error("Error fetching dispute details:", error);
                return null;
            }
        }
    });

    const handleResolve = async (actionType) => {
        if (!resolutionNote) {
            toast({
                title: "Error",
                description: "Please enter a resolution note before resolving.",
                variant: "destructive"
            });
            return;
        }

        setResolving(true);
        try {
            await axios.post(`http://localhost:8000/admin/disputes/${id}/resolve`, {
                action: actionType,
                note: resolutionNote
            });
            toast({
                title: "Dispute Resolved",
                description: `Successfully applied action: ${actionType.replace('_', ' ')}`,
            });
            navigate('/admin/disputes');
        } catch (error) {
            toast({
                title: "Resolution Failed",
                description: "There was an error saving the resolution.",
                variant: "destructive"
            });
        } finally {
            setResolving(false);
        }
    };

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center p-8 bg-[#f0fdfa] dark:bg-[#042f2e] text-slate-500">Loading dispute details...</div>;
    }

    if (!dispute) {
        return <div className="min-h-screen flex items-center justify-center p-8 bg-[#f0fdfa] dark:bg-[#042f2e] text-slate-500">Dispute not found.</div>;
    }

    return (
        <div className="bg-[#f0fdfa] dark:bg-[#042f2e] font-sans text-slate-900 dark:text-slate-100 min-h-screen flex flex-col transition-colors duration-200">
            <main className="flex-1 flex justify-center py-8 px-4 lg:px-8 bg-slate-50/50 dark:bg-slate-900/50">
                <div className="max-w-[1400px] w-full flex flex-col lg:flex-row gap-6">

                    {/* Left Column (Main Details) */}
                    <div className="flex-1 flex flex-col gap-6 min-w-0">

                        {/* Header Details */}
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-wrap items-center gap-2 text-sm">
                                <button onClick={() => navigate('/admin/disputes')} className="text-slate-500 hover:text-blue-600 font-medium transition-colors">Disputes</button>
                                <span className="material-symbols-outlined text-slate-500 text-[16px]">chevron_right</span>
                                <span className="font-semibold">Case #{dispute.id}</span>
                            </div>
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="flex flex-col gap-1">
                                    <h1 className="text-3xl font-bold tracking-tight">{dispute.type}</h1>
                                    <div className="flex items-center gap-3">
                                        <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${dispute.status === 'Under Review' ? 'bg-amber-50 text-amber-700 ring-amber-600/20' : 'bg-blue-50 text-blue-700 ring-blue-600/20'
                                            }`}>
                                            <span className={`size-1.5 rounded-full ${dispute.status === 'Under Review' ? 'bg-amber-600' : 'bg-blue-600'}`}></span>
                                            {dispute.status}
                                        </span>
                                        <span className="text-slate-500 text-sm">Created {dispute.created_at}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm">
                                        <span className="material-symbols-outlined text-[18px] text-slate-500">gavel</span>
                                        View Policy
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Dispute Summary Card */}
                        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                            <div className="p-6">
                                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                    <div className="size-8 rounded-full bg-gradient-to-br from-blue-500 to-sky-500 flex items-center justify-center text-white shadow-md">
                                        <span className="material-symbols-outlined text-[18px]">info</span>
                                    </div>
                                    Dispute Summary
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    {/* Driver Info */}
                                    <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 relative group hover:border-blue-500/30 transition-colors">
                                        <div className="absolute top-4 right-4 text-xs font-bold text-slate-500 uppercase tracking-wider bg-white dark:bg-slate-900 px-2 py-1 rounded border border-slate-200 dark:border-slate-700">Driver</div>
                                        <div className="flex items-start gap-4">
                                            <div className="size-12 rounded-full bg-slate-300 dark:bg-slate-700 border-2 border-white dark:border-slate-900 shadow-md flex items-center justify-center text-slate-500 font-bold">
                                                {dispute.driver.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-bold text-lg">{dispute.driver.name}</p>
                                                <div className="flex items-center gap-1 text-sm text-slate-500 mt-1">
                                                    <span className="material-symbols-outlined text-amber-400 text-[16px]">star</span>
                                                    <span className="font-bold">{dispute.driver.rating}</span>
                                                    <span>({dispute.driver.trips} trips)</span>
                                                </div>
                                                <p className="text-xs text-slate-500 mt-2 font-medium">{dispute.driver.vehicle}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Commuter Info */}
                                    <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 relative group hover:border-blue-500/30 transition-colors">
                                        <div className="absolute top-4 right-4 text-xs font-bold text-slate-500 uppercase tracking-wider bg-white dark:bg-slate-900 px-2 py-1 rounded border border-slate-200 dark:border-slate-700">Commuter</div>
                                        <div className="flex items-start gap-4">
                                            <div className="size-12 rounded-full bg-slate-300 dark:bg-slate-700 border-2 border-white dark:border-slate-900 shadow-md flex items-center justify-center text-slate-500 font-bold">
                                                {dispute.commuter.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-bold text-lg">{dispute.commuter.name}</p>
                                                <div className="flex items-center gap-1 text-sm text-slate-500 mt-1">
                                                    <span className="material-symbols-outlined text-amber-400 text-[16px]">star</span>
                                                    <span className="font-bold">{dispute.commuter.rating}</span>
                                                    <span>({dispute.commuter.trips} trips)</span>
                                                </div>
                                                <p className="text-xs text-slate-500 mt-2 font-medium text-blue-600 dark:text-blue-400">Membership: {dispute.commuter.membership}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col md:flex-row gap-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                                    <div className="flex-1 space-y-4">
                                        <div>
                                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Trip ID</p>
                                            <p className="text-sm font-bold text-sky-600 dark:text-sky-400 font-mono">#{dispute.trip_id}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Dispute Reason</p>
                                            <p className="text-sm font-medium bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 px-3 py-2 rounded-md border border-red-100 dark:border-red-800/30 inline-block">
                                                "{dispute.reason}"
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Trip Cost</p>
                                            <p className="text-sm font-bold">${dispute.trip_cost.toFixed(2)} <span className="text-xs font-normal text-slate-500 ml-1">(Held in Escrow)</span></p>
                                        </div>
                                    </div>
                                    <div className="md:w-1/3">
                                        <div className="w-full aspect-video rounded-lg bg-slate-200 dark:bg-slate-700 flex items-center justify-center shadow-md relative overflow-hidden group">
                                            <span className="material-icons-outlined text-4xl text-slate-400">map</span>
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                                            <div className="absolute bottom-3 left-3">
                                                <span className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm px-3 py-1.5 rounded-md text-xs font-bold shadow-sm flex items-center gap-1">
                                                    <span className="material-icons-outlined text-[14px]">map</span> Map Preview
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Timeline & Chat Transcript */}
                        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
                            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                                <div className="size-8 rounded-full bg-gradient-to-br from-blue-500 to-sky-500 flex items-center justify-center text-white shadow-md">
                                    <span className="material-symbols-outlined text-[18px]">history</span>
                                </div>
                                Event Timeline
                            </h3>
                            <div className="relative pl-4 space-y-8 before:absolute before:inset-y-0 before:left-[19px] before:w-0.5 before:bg-gradient-to-b before:from-blue-500/20 before:to-sky-500/20">
                                {dispute.timeline.map((event, idx) => (
                                    <div key={idx} className="relative pl-8">
                                        <div className={`absolute left-0 top-1 size-10 rounded-full flex items-center justify-center border-4 border-white dark:border-slate-900 shadow-sm ${event.icon === 'cancel' ? 'bg-red-50 text-red-500' :
                                                event.icon === 'chat' ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                                            }`}>
                                            <span className="material-symbols-outlined text-[18px]">{event.icon}</span>
                                        </div>
                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
                                            <h4 className="text-sm font-bold">{event.title}</h4>
                                            <span className="text-xs text-slate-500 font-mono bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">{event.time}</span>
                                        </div>
                                        <p className="text-sm text-slate-500 mt-1">{event.desc}</p>
                                    </div>
                                ))}

                                {/* Insert Chat Box as special timeline event */}
                                <div className="relative pl-8">
                                    <div className="absolute left-0 top-1 size-10 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center border-4 border-white dark:border-slate-900 shadow-sm">
                                        <span className="material-symbols-outlined text-blue-600 text-[18px]">chat</span>
                                    </div>
                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 mb-3">
                                        <h4 className="text-sm font-bold">Chat Session Transcript</h4>
                                    </div>
                                    <div className="bg-slate-50/80 dark:bg-slate-800/50 rounded-lg p-4 space-y-3 border border-slate-200 dark:border-slate-700 max-w-2xl">
                                        {dispute.chat_logs.map((msg, idx) => (
                                            <div key={idx} className={`flex items-start gap-3 ${msg.sender === 'driver' ? 'flex-row-reverse' : ''}`}>
                                                <div className="size-8 rounded-full bg-slate-200 dark:bg-slate-700 shrink-0 ring-2 ring-white dark:ring-slate-900 shadow-sm flex items-center justify-center text-xs font-bold text-slate-500 uppercase">
                                                    {msg.sender.charAt(0)}
                                                </div>
                                                <div className={`p-3 text-sm shadow-sm border ${msg.sender === 'driver'
                                                        ? 'bg-blue-50 dark:bg-blue-900/20 text-slate-900 dark:text-slate-100 border-blue-500/10 rounded-2xl rounded-tr-none'
                                                        : 'bg-white dark:bg-slate-900 rounded-2xl rounded-tl-none border-slate-200 dark:border-slate-700'
                                                    }`}>
                                                    <p>{msg.message}</p>
                                                    <span className={`text-[10px] block mt-1 ${msg.sender === 'driver' ? 'text-blue-600/80' : 'text-slate-500'}`}>{msg.time}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Right Column (Admin Actions) */}
                    <aside className="lg:w-[380px] shrink-0 flex flex-col gap-6">
                        <div className="lg:sticky lg:top-24 space-y-6">
                            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg shadow-sky-500/5 border border-slate-200 dark:border-slate-800 p-6 relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-sky-500"></div>
                                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-blue-600">verified_user</span>
                                    Admin Actions
                                </h3>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Resolution Note (Internal)</label>
                                        <textarea
                                            className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm p-3 focus:ring-blue-500 focus:border-blue-500 resize-none h-24 placeholder:text-slate-400"
                                            placeholder="Enter justification for decision..."
                                            value={resolutionNote}
                                            onChange={(e) => setResolutionNote(e.target.value)}
                                        ></textarea>
                                    </div>
                                    <hr className="border-slate-200 dark:border-slate-700" />
                                    <div className="space-y-3">
                                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Financial Resolution</p>
                                        <button
                                            onClick={() => handleResolve('force_refund')}
                                            disabled={resolving}
                                            className="w-full flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-500 to-sky-500 hover:opacity-90 text-white rounded-lg shadow-md group transition-all duration-300 disabled:opacity-50"
                                        >
                                            <span className="font-bold text-sm">Force Refund to Commuter</span>
                                            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">keyboard_return</span>
                                        </button>
                                        <button
                                            onClick={() => handleResolve('release_payment')}
                                            disabled={resolving}
                                            className="w-full flex items-center justify-between px-4 py-3 bg-white dark:bg-slate-900 border-2 border-blue-500/20 text-slate-900 dark:text-slate-100 rounded-lg hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all group disabled:opacity-50"
                                        >
                                            <span className="font-bold text-sm text-blue-600 dark:text-blue-400">Release Payment to Driver</span>
                                            <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">payments</span>
                                        </button>
                                        <button
                                            onClick={() => handleResolve('partial_refund')}
                                            disabled={resolving}
                                            className="w-full flex items-center justify-between px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-all group disabled:opacity-50"
                                        >
                                            <span className="font-bold text-sm text-slate-600 dark:text-slate-400">Partial Refund (50/50)</span>
                                            <span className="material-symbols-outlined text-slate-400 group-hover:text-slate-600 transition-colors">pie_chart</span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
                                <h3 className="text-lg font-bold mb-4">Communication</h3>
                                <p className="text-sm text-slate-500 mb-4">Send a formal resolution message to both parties via email and in-app notification.</p>
                                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border border-blue-500/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-all font-bold text-sm">
                                    <span className="material-symbols-outlined">mail</span>
                                    Message Both Parties
                                </button>
                            </div>
                        </div>
                    </aside>
                </div>
            </main>
        </div>
    );
};

export default AdminDisputeDetail;
