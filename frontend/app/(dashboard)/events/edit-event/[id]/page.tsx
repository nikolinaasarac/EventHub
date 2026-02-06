"use client"

import {useParams} from "next/navigation";
import {useEffect, useState} from "react";
import {Event} from "@/models/event.model";
import EventService from "@/services/event.service";
import {EventForm} from "@/components/EventForm";

export default function Page() {
	const {id} = useParams();
	const [event, setEvent] = useState<Event | null>(null);

	useEffect(() => {
		if (!id || Array.isArray(id)) return;
		const fetchEvent = async () => {
			try {
				const response = await EventService.getEvent(id);
				setEvent(response);
			} catch (e) {
				console.error(e);
			}
		};
		fetchEvent();
	}, [id]);

	if (!event) return null;

	return (
		<EventForm event={event}/>
	)
}