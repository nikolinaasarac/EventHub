// app/events/edit/[id]/page.tsx
"use client"

import {useParams, useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {Event} from "@/models/event.model";
import EventService from "@/services/event.service";
import {EventForm} from "@/components/EventForm";
import {useAuth} from "@/context/auth-context";

export default function EditEventPage() {
	const {id} = useParams();
	const {user} = useAuth();
	const [event, setEvent] = useState<Event | null>(null);
	const router = useRouter();

	useEffect(() => {
		const checkOwnership = async () => {
			const data = await EventService.getEvent(id as string);

			if (data.organizer.user.id !== user?.id) {
				router.push("/home");
				return;
			}
			setEvent(data);
		};

		checkOwnership();
	}, [id, user]);

	if (!event) return null;

	return <EventForm event={event}/>;
}