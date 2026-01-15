import React from 'react';
import {
	Calendar,
	MapPin,
	Clock,
	Heart,
	Ticket,
	Info,
	CheckCircle2
} from 'lucide-react';
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import BackButton from "@/components/BackButton";

type EventMetadataProps = {
	metadata: Record<string, string>;
};

const EventMetadata = ({metadata}:EventMetadataProps) => {
	if (!metadata) return null;

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
			{Object.entries(metadata).map(([key, value]) => (
				<div key={key} className="flex flex-col p-3 bg-slate-50 rounded-lg border border-slate-100">
					<span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{key}</span>
					<span className="text-slate-700 font-medium">{value}</span>
				</div>
			))}
		</div>
	);
};

export default function EventDetailsPage() {
	const event = {
		title: "Derbi Utakmica: FK Slavija vs FK Borac",
		category: "Sport",
		date: "12. Maj 2025",
		time: "18:00",
		location: "Stadion SRC Slavija, Istočno Sarajevo",
		price: "10 KM",
		image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=1200",
		description: "Očekuje nas uzbudljiv sportski spektakl na domaćem terenu. Dođite da podržite momke u borbi za važne bodove u okviru Prve lige. Obezbijedite svoje karte na vrijeme i budite dio atmosfere o kojoj će se pričati.",
		organizer: "FK Slavija Istočno Sarajevo",
		metadata: {
			"Takmičenje": "Prva liga RS",
			"Kolo": "24. Kolo",
			"Domaćin": "FK Slavija",
			"Gost": "FK Borac",
			"Kapije se otvaraju": "16:30 h"
		}
	};

	return (
		<div className="min-h-screen bg-white">
			<div className="container mx-auto px-4 py-6">
				<BackButton href='/events' text='Nazad'/>
			</div>

			<main className="container mx-auto px-4 pb-20">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

					<div className="lg:col-span-2 space-y-8">

						<div className="relative h-[350px] md:h-[500px] overflow-hidden shadow-xl">
							<img
								src={event.image}
								className="w-full h-full object-cover"
								alt={event.title}
							/>
							<div className="absolute top-4 right-4 flex gap-2">
								<Button size="icon" variant="secondary"
										className="rounded-full shadow-lg bg-white/90 text-red-500">
									<Heart className="w-4 h-4"/>
								</Button>
							</div>
						</div>
						<div className="space-y-4">
							<Badge className="bg-indigo-100 text-indigo-700 hover:bg-indigo-100 border-none px-4 py-1">
								{event.category}
							</Badge>
							<h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight">
								{event.title}
							</h1>

							<div className="flex flex-wrap gap-6 pt-4 text-slate-600">
								<div className="flex items-center gap-2">
									<Calendar className="w-5 h-5 text-indigo-600"/>
									<span className="font-medium">{event.date}</span>
								</div>
								<div className="flex items-center gap-2">
									<Clock className="w-5 h-5 text-indigo-600"/>
									<span className="font-medium">{event.time}</span>
								</div>
								<div className="flex items-center gap-2">
									<MapPin className="w-5 h-5 text-indigo-600"/>
									<span className="font-medium">{event.location}</span>
								</div>
							</div>
						</div>

						<hr className="border-slate-100"/>
						<div className="space-y-4">
							<h2 className="text-2xl font-bold flex items-center gap-2">
								<Info className="w-5 h-5 text-indigo-600"/> O događaju
							</h2>
							<p className="text-slate-600 leading-relaxed text-lg">
								{event.description}
							</p>
						</div>

						<div className="space-y-4">
							<h2 className="text-2xl font-bold flex items-center gap-2">
								<CheckCircle2 className="w-5 h-5 text-indigo-600"/> Detalji
							</h2>
							<EventMetadata metadata={event.metadata}/>
						</div>
					</div>

					<div className="lg:col-span-1">
						<div
							className="sticky top-24 p-8 rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-200/50 space-y-6">
							<div>
								<span className="text-slate-400 text-sm font-medium uppercase">Cijena ulaznice</span>
								<div className="text-4xl font-black text-slate-900 mt-1">
									{event.price}
								</div>
							</div>

							<div className="space-y-3">
								<Button
									className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 text-lg font-bold rounded-2xl shadow-lg shadow-indigo-100">
									Kupi kartu
								</Button>
							</div>
						</div>
					</div>

				</div>
			</main>
		</div>
	);
}