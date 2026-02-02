"use client"

import React, {useEffect, useState} from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import EventService from "@/services/event.service";
import srLocale from "@fullcalendar/core/locales/sr";
import {Event} from "@/models/event.model";
import {useRouter} from "next/navigation";
import {EventInput} from "@fullcalendar/core";

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
				}));
				console.log(formattedEvents);
				setEvents(formattedEvents);
			} catch (err) {
				console.error("Greška prilikom učitavanja događaja:", err);
			}
		};

		fetchEvents();
	}, []);

	const handleDateClick = (info: EventInput) => {
		alert("Odabrali ste datum: " + info.dateStr);
	};

	const handleEventClick = (info: EventInput) => {
		router.push(`/events/${info.event.id}`);
	};

	return (
		<div className="min-h-screen p-8 bg-slate-50">
			<h1 className="text-3xl font-bold mb-6">Kalendar događaja</h1>
			<FullCalendar
				plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
				initialView="dayGridMonth"
				locale={srLocale}
				headerToolbar={{
					left: "prev,next today",
					center: "title",
					right: "dayGridMonth,timeGridWeek,timeGridDay",
				}}
				events={events}
				dateClick={handleDateClick}
				eventClick={handleEventClick}
				editable={false}
				height="auto"
			/>
		</div>
	);
}