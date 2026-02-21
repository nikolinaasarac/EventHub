"use client"

import React, {useEffect, useState} from 'react';
import {
	TrendingUp,
	Ticket,
	DollarSign,
	Calendar,
	CheckCircle2
} from 'lucide-react';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import PageHeader from "@/components/PageHeader";
import {
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	AreaChart,
	Area
} from 'recharts';
import {OrganizersService} from "@/services/organizers.service";
import {OrganizerStatistics} from "@/models/organizer-statistics.model";
import {StatCard} from "@/components/StatCard";

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
				console.error("Greška pri učitavanju statistike:", err);
			} finally {
				setLoading(false);
			}
		};
		fetchStats();
	}, []);

	if (loading) {
		return <div className="p-12 text-center text-slate-500">Učitavanje statistike...</div>;
	}

	if (!stats) return null;

	const chartData = stats.ticketsPerDay.map(item => ({
		name: new Date(item.date).toLocaleDateString('sr-Latn-RS', {day: '2-digit', month: 'short'}),
		tickets: Number(item.ticketsSold)
	}));

	return (
		<div className="min-h-screen bg-slate-50/50 py-12 px-4">
			<div className="max-w-7xl mx-auto space-y-10">

				<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
					<PageHeader
						title="Statistika"
						subtitle="Pregled uspješnosti događaja."
						icon={TrendingUp}
					/>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
					<StatCard
						title="Ukupan prihod"
						value={`${stats.totalRevenue} KM`}
						icon={<DollarSign className="w-6 h-6"/>}
					/>
					<StatCard
						title="Prodate karte"
						value={stats.totalTicketsSold.toString()}
						icon={<Ticket className="w-6 h-6"/>}
					/>
					<StatCard
						title="Aktivni događaji"
						value={stats.activeEvents.toString()}
						change="U toku"
						icon={<Calendar className="w-6 h-6"/>}
					/>
					<StatCard
						title="Završeni događaji"
						value={stats.finishedEvents.toString()}
						change="Arhiva"
						icon={<CheckCircle2 className="w-6 h-6"/>}
					/>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
					<Card
						className="lg:col-span-12 p-6 rounded-[2.5rem] border-none shadow-xl shadow-slate-200/50 bg-white">
						<CardHeader className="px-2">
							<CardTitle className="text-xl font-black text-slate-900">Prodaja karata po
								danima</CardTitle>
						</CardHeader>
						<CardContent className="w-full pt-4">
							{mounted && (
								<ResponsiveContainer width="100%" height={350}>
									<AreaChart
										data={chartData}
										margin={{top: 10, right: 10, left: -20, bottom: 0}}
									>
										<defs>
											<linearGradient id="colorTickets" x1="0" y1="0" x2="0" y2="1">
												<stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
												<stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
											</linearGradient>
										</defs>
										<CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9"/>
										<XAxis
											dataKey="name"
											axisLine={false}
											tickLine={false}
											tick={{fill: '#94a3b8', fontSize: 12}}
										/>
										<YAxis
											axisLine={false}
											tickLine={false}
											tick={{fill: '#94a3b8', fontSize: 12}}
										/>
										<Tooltip/>
										<Area
											type="monotone"
											name="Prodate karte"
											dataKey="tickets"
											stroke="#4f46e5"
											strokeWidth={3}
											fill="url(#colorTickets)"
										/>

									</AreaChart>
								</ResponsiveContainer>
							)}
						</CardContent>
					</Card>
				</div>

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
	);
}
