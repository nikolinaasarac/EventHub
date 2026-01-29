"use client"

import {VenueForm} from "@/components/VenueForm";
import {useParams} from "next/navigation";
import {useEffect, useState} from "react";
import VenueService from "@/services/venue.service";
import {Venue} from "@/models/venue.model";

export default function Page() {
	const {id} = useParams();
	const [venue, setVenue] = useState<Venue | null>(null);

	useEffect(() => {
		if (!id || Array.isArray(id)) return;
		const fetchVenue = async () => {
			try {
				const response = await VenueService.getVenue(id);
				setVenue(response);
			} catch (e) {
				console.error(e);
			}
		};
		fetchVenue();
	}, [id]);

	if (!venue) return null;

	return (
		<VenueForm venue={venue}/>
	)
}