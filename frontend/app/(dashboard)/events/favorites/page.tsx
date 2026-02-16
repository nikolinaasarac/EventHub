"use client";

import {EventCard} from "@/components/EventCard";
import {useAuth} from "@/context/auth-context";
import {useRouter} from "next/navigation";
import {DateTimeHelper} from "@/shared/helpers/date-time.helper";
import {useFavorites} from "@/context/favorite-context";
import {useEffect, useState} from "react";
import {QueryParams} from "@/models/query-params.model";
import {FavoriteEventsService} from "@/services/favorite-events.service";
import {PaginationComponent} from "@/components/Pagination";
import {Event} from "@/models/event.model";

export default function FavoritesPage() {
	const {user} = useAuth();
	const router = useRouter();

	const [favorites, setFavorites] = useState<Event[]>([]);
	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const limit = 3;

	const fetchFavorites = async (pageNumber = page) => {
		if (!user) return;

		setLoading(true);

		try {
			const params: QueryParams = {page: pageNumber, limit};
			const response = await FavoriteEventsService.getMyFavoriteEventsPaginated(params);

			if (response.data.length === 0 && pageNumber > 1) {
				setPage(pageNumber - 1);
				return;
			}

			setFavorites(response.data);
			setTotalPages(response.meta.totalPages);

		} catch (e) {
			console.error(e);
			setFavorites([]);
		} finally {
			setLoading(false);
		}
	};

	const {favoriteIds} = useFavorites();

	useEffect(() => {
		if (!user) {
			router.push(`/login?redirect=/favorites`);
			return;
		}

		fetchFavorites(page);

	}, [user, page, favoriteIds]);

	if (loading) return <p className="text-center py-20">Učitavanje...</p>;

	if (favorites.length === 0)
		return (
			<div className="text-center py-20">
				<p className="text-lg font-medium">Još uvijek nema omiljenih događaja.</p>
			</div>
		);

	return (
		<section className="container mx-auto px-4 py-10">
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{favorites.map(event => (
					<EventCard
						key={event.id}
						id={event.id}
						title={event.title}
						image={event.imageUrl}
						category={event.eventSubcategory.eventCategory.name}
						date={DateTimeHelper.formatDate(event.startDate)}
						location={event.venue.name}
					/>
				))}
			</div>

			{totalPages > 1 && (
				<div className="py-6 flex justify-center">
					<PaginationComponent
						currentPage={page}
						totalPages={totalPages}
						onPageChange={(p) => setPage(p)}
					/>
				</div>
			)}
		</section>
	);
}