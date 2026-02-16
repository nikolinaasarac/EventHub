"use client";

import React, {useEffect, useState} from "react";
import {EventCard} from "@/components/EventCard";
import {useFavorites} from "@/context/favorite-context";
import EventService from "@/services/event.service";
import {Event} from "@/models/event.model";
import {useAuth} from "@/context/auth-context";
import {useRouter} from "next/navigation";

export default function FavoritesPage() {
	const {user} = useAuth();
	const router = useRouter();
	const {favoriteIds, loading: loadingFavorites} = useFavorites();
	const [events, setEvents] = useState<Event[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!user) {
			router.push(`/login?redirect=/favorites`);
			return;
		}

		const fetchFavorites = async () => {
			setLoading(true);
			try {
				const responses = await Promise.all(
					favoriteIds.map((id) => EventService.getEvent(id.toString()))
				);
				setEvents(responses);
			} catch (e) {
				console.error(e);
			} finally {
				setLoading(false);
			}
		};

		if (favoriteIds.length > 0) {
			fetchFavorites();
		} else {
			setEvents([]);
			setLoading(false);
		}
	}, [user, favoriteIds, router]);

	if (loading || loadingFavorites) return <p className="text-center py-20">Učitavanje...</p>;

	if (events.length === 0)
		return (
			<div className="text-center py-20">
				<p className="text-lg font-medium">Još uvijek nema omiljenih događaja.</p>
			</div>
		);

	return (
		<div className="container mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
			{events.map((event) => (
				<EventCard
					key={event.id}
					id={event.id}
					title={event.title}
					image={event.imageUrl}
					category={event.eventSubcategory.eventCategory.name}
					date={event.startDate}
					location={event.venue.name}
				/>
			))}
		</div>
	);
}