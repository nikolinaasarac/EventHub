"use client"

import React, {useEffect, useState} from "react";
import EventService from "@/services/event.service";
import {Event} from "@/models/event.model";
import {useRouter} from "next/navigation";
import {EventInput} from "@fullcalendar/core";
import {Card} from "@/components/ui/card";
import {Calendar as CalendarIcon, Info} from "lucide-react";
import PageHeader from "@/components/PageHeader";
import {EventsCalendar} from "@/components/EventsCalendar";

export default function CalendarPage() {
	const [events, setEvents] = useState<EventInput[]>([]);
	const router = useRouter();

	useEffect(() => {
		const fetchEvents = async () => {
			try {
				const response = await EventService.getAllEvents();
				const formattedEvents: EventInput[] = response.map((event: Event) => ({
					id: String(event.id),
					title: event.title,
					start: event.startDate,
					end: event.endDate || event.startDate,
					backgroundColor: '#4f46e5',
					borderColor: '#4338ca',
					textColor: '#ffffff',
					extendedProps: {
						category: event.eventSubcategory?.eventCategory?.name
					}
				}));
				setEvents(formattedEvents);
			} catch (err) {
				console.error("Greška prilikom učitavanja događaja:", err);
			}
		};

		fetchEvents();
	}, []);

	const handleEventClick = (info: EventInput) => {
		router.push(`/events/${info.event.id}`);
	};

	return (
		<div className="min-h-screen bg-slate-50 py-12 px-4">
			<div className="mx-10 space-y-8">
				<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
					<PageHeader title={"Kalendar događaja"}
								subtitle={"Pregledajte sve zakazane termine i manifestacije."}
								icon={CalendarIcon}/>
					<div className="flex items-center gap-2 bg-indigo-50 px-4 py-2 rounded-xl border border-indigo-100">
						<Info className="w-4 h-4 text-indigo-600"/>
						<span className="text-xs font-bold text-indigo-700 uppercase tracking-wider">Klikni na događaj za detalje</span>
					</div>
				</div>

				<Card
					className="p-4 md:p-8 rounded-[2.5rem] border-none shadow-2xl shadow-slate-200/50 bg-white overflow-hidden">
					<div className="calendar-container">
						<EventsCalendar events={events} handleEventClick={handleEventClick}/>
					</div>
				</Card>
			</div>
		</div>
	);
}