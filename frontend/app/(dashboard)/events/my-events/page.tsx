"use client";

import {EventCard} from "@/components/EventCard";
import {useAuth} from "@/context/auth-context";
import {useRouter} from "next/navigation";
import {DateTimeHelper} from "@/shared/helpers/date-time.helper";
import {useEffect, useState} from "react";
import {QueryParams} from "@/models/query-params.model";
import {PaginationComponent} from "@/components/Pagination";
import {Event} from "@/models/event.model";
import PageHeader from "@/components/PageHeader";
import {CalendarCheckIcon} from "lucide-react";
import {useQueryFilters} from "@/shared/hooks/use-query-filters.hook";
import EventService from "@/services/event.service";

export default function MyEventsPage() {
	const {user} = useAuth();
	const router = useRouter();

	const [myEvents, setMyEvents] = useState<Event[]>([]);
	const [loading, setLoading] = useState(true);
	const {page, urlPage, updatePage} = useQueryFilters();
	const [totalPages, setTotalPages] = useState(1);
	const limit = 2;

	const fetchMyEvents = async (pageNumber = urlPage) => {
		if (!user) return;
		setLoading(true);

		try {
			const params: QueryParams = {
				page: pageNumber,
				limit,
			};

			const response =
				await EventService.getMyOrganizedEvents(params);
			if (response.data.length === 0 && pageNumber > 1) {
				updatePage(pageNumber - 1);
				return;
			}

			setMyEvents(response.data);
			setTotalPages(response.meta.totalPages);

		} catch (e) {
			console.error(e);
			setMyEvents([]);
		} finally {
			setLoading(false);
		}
	};


	useEffect(() => {
		if (!user) {
			router.push(`/login?redirect=/favorites`);
			return;
		}

		fetchMyEvents(urlPage);

	}, [user, urlPage]);

	if (loading) return <p className="text-center py-20">Učitavanje...</p>;

	if (myEvents.length === 0)
		return (
			<div className="text-center py-20">
				<p className="text-lg font-medium">Još uvijek nema organoizovanih događaja.</p>
			</div>
		);

	return (
		<section className="min-h-screen bg-white py-12">
			<div className="container mx-auto px-4">
				<div className="mb-8">
					<PageHeader
						title="Moji događaji"
						subtitle="Pregled događaja koje ste Vi organizovali."
						icon={CalendarCheckIcon}
					/>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{myEvents.map(event => (
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
							onPageChange={updatePage}
						/>
					</div>
				)}

			</div>
		</section>
	);
}