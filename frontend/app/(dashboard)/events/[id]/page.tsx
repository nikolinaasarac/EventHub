"use client"

import React, {useEffect, useState} from 'react';
import {
	Calendar,
	MapPin,
	Clock,
	Heart,
	Info,
	CheckCircle2
} from 'lucide-react';
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import BackButton from "@/components/BackButton";
import {useParams} from "next/navigation";
import {Event} from '@/models/event.model'
import EventService from "@/services/event.service";
import {DateTimeHelper} from "@/shared/helpers/date-time.helper";
import {EventMetadata} from "@/models/event-metadata.model";
import {EventMetadataComponent} from "@/components/EventMetadataComponent";

export default function EventDetailsPage() {
	const {id} = useParams();
	const [event, setEvent] = useState<Event | null>(null);


	useEffect(() => {
		if (!id || Array.isArray(id)) return;
		const fetchEvent = async () => {
			try {
				const response = await EventService.getEvent(id);
				console.log(response);
				setEvent(response);
			} catch (e) {
				console.error(e);
			}
		}
		fetchEvent();
	}, [id])

	if (!event) return null;

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
								src={`/${event.imageUrl}`}
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
								{event.eventSubcategory.eventCategory.name}
							</Badge>
							<h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight">
								{event.title}
							</h1>

							<div className="flex flex-wrap gap-6 pt-4 text-slate-600">
								<div className="flex items-center gap-2">
									<Calendar className="w-5 h-5 text-indigo-600"/>
									<span
										className="font-medium">{DateTimeHelper.formatOnlyDate(event.startDate)}</span>
								</div>
								<div className="flex items-center gap-2">
									<Clock className="w-5 h-5 text-indigo-600"/>
									<span
										className="font-medium">{DateTimeHelper.formatOnlyTime(event.startDate)}</span>
								</div>
								<div className="flex items-center gap-2">
									<MapPin className="w-5 h-5 text-indigo-600"/>
									<span className="font-medium">{event.venue.name}</span>
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
							<EventMetadataComponent metadata={event.metadata}/>
						</div>
					</div>

					<div className="lg:col-span-1">
						<div
							className="sticky top-24 p-8 rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-200/50 space-y-6">
							<div>
								<span className="text-slate-400 text-sm font-medium uppercase">Cijena ulaznice</span>
								<div className="text-4xl font-black text-slate-900 mt-1">
									100 KM npr
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