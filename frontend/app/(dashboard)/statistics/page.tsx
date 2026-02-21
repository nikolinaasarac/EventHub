"use client"

import React, {useEffect, useState} from 'react';
import {TrendingUp, Ticket, DollarSign, Calendar, CheckCircle2} from 'lucide-react';
import {Card, CardContent, CardTitle} from "@/components/ui/card";
import PageHeader from "@/components/PageHeader";
import {XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area} from 'recharts';
import {OrganizersService} from "@/services/organizers.service";
import {OrganizerStatistics} from "@/models/organizer-statistics.model";
import {StatCard} from "@/components/StatCard";
import {cn} from "@/lib/utils";

export default function OrganizerStatsPage() {
	const [stats, setStats] = useState<OrganizerStatistics | null>(null);
	const [loading, setLoading] = useState(true);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	useEffect(() => {
		const fetchStats = async () => {
			try {
				const response = await OrganizersService.getMyStatistics();
				setStats(response);
			} catch (err) {
				console.error(err);
			} finally {
				setLoading(false);
			}
		};
		fetchStats();
	}, []);

	if (loading || !stats) return <div
		className="flex min-h-screen items-center justify-center bg-white text-indigo-600 font-black animate-pulse uppercase tracking-widest">Sistem
		se učitava...</div>;

	const chartData = stats.ticketsPerDay.map(item => ({
		name: new Date(item.date).toLocaleDateString('sr-Latn-RS', {day: '2-digit', month: 'short'}),
		tickets: Number(item.ticketsSold)
	}));

	return (
		<div className="min-h-screen bg-[#FDFDFF] py-12 px-4 selection:bg-indigo-100">
			<div className="max-w-7xl mx-auto space-y-12">
				<div
					className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 pb-10">
					<PageHeader
						title="Statistika"
						subtitle="Pregled uspješnosti događaja."
						icon={TrendingUp}
					/>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
					<StatCard title="Ukupan Prihod" value={`${stats.totalRevenue} KM`} variant="emerald"
							  icon={<DollarSign/>}/>
					<StatCard title="Prodate Karte" value={stats.totalTicketsSold.toString()} variant="indigo"
							  change="Live" icon={<Ticket/>}/>
					<StatCard title="Aktivni" value={stats.activeEvents.toString()} variant="amber" change="U toku"
							  icon={<Calendar/>}/>
					<StatCard title="Završeni" value={stats.finishedEvents.toString()} variant="rose" change="Arhiva"
							  icon={<CheckCircle2/>}/>
				</div>

				<Card
					className="rounded-[3rem] border-none bg-white p-8 shadow-2xl shadow-slate-200/60 ring-1 ring-slate-100">
					<div className="mb-10 flex items-center justify-between">
						<div className="space-y-1">
							<CardTitle className="text-2xl font-black text-slate-900 tracking-tight">Prodaja karata po
								danima</CardTitle>
							<p className="text-sm text-slate-400 font-medium italic"></p>
						</div>
						<div
							className="bg-indigo-50 text-indigo-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
							Posljednjih 30 dana
						</div>
					</div>

					<CardContent className="w-full p-0">
						{mounted && (
							<ResponsiveContainer width="100%" height={380}>
								<AreaChart data={chartData} margin={{top: 10, right: 10, left: -20, bottom: 20}}>
									<defs>
										<linearGradient id="colorTickets" x1="0" y1="0" x2="0" y2="1">
											<stop offset="5%" stopColor="#4f46e5" stopOpacity={0.2}/>
											<stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
										</linearGradient>
									</defs>
									<CartesianGrid strokeDasharray="6 6" vertical={false} stroke="#F1F5F9"/>
									<XAxis dataKey="name" axisLine={false} tickLine={false}
										   tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} dy={15}/>
									<YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}}/>
									<Tooltip
										contentStyle={{
											borderRadius: '20px',
											border: 'none',
											boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'
										}}
									/>
									<Area
										type="monotone"
										name="Prodate karte"
										dataKey="tickets"
										stroke="#4f46e5"
										strokeWidth={4}
										fill="url(#colorTickets)"
										animationDuration={2000}
									/>
								</AreaChart>
							</ResponsiveContainer>
						)}
					</CardContent>
				</Card>

				<Card className="p-8 rounded-[2.5rem] border-none shadow-xl shadow-slate-200/50 bg-white">
					<h2 className="text-2xl font-black text-slate-900 mb-6">Najviše prodatih karata</h2>
					<div className="space-y-4">
						{stats.ticketsPerEvent.map((item, i) => (
							<div key={item.eventId}
								 className="flex items-center justify-between p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-slate-100 transition-colors">
								<div className="flex items-center gap-4">
									<div
										className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center font-black">
										#{i + 1}
									</div>
									<div>
										<p className="font-bold text-slate-900">{item.eventTitle}</p>
										<p className="text-xs text-slate-500">Broj prodatih karata: <span
											className="font-bold text-indigo-600">{item.ticketsSold}</span></p>
									</div>
								</div>
							</div>
						))}
					</div>
				</Card>
			</div>
		</div>
	)
}