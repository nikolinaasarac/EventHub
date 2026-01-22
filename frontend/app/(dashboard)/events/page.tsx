"use client"
import {EventCard} from "@/components/EventCard";
import {useEffect, useState} from "react";
import EventService from "@/services/event.service";
import {Event} from "@/models/event.model"
import {DateTimeHelper} from "@/shared/helpers/date-time.helper";
import {useQueryFilters} from "@/shared/hooks/use-query-filters.hook";
import {PaginationComponent} from "@/components/Pagination";
import {SearchInput} from "@/components/SearchInput";
import {EventCategoriesMultiSelect} from "@/components/EventCategorySelect";
import {QueryParams} from "@/models/query-params.model";

export default function EventsPage() {
	const {search, setSearch, page, updatePage, urlSearch, urlPage, filters, setCategories} = useQueryFilters();
	const [events, setEvents] = useState<Event[]>([]);
	const [totalPages, setTotalPages] = useState(1);


	useEffect(() => {
		const fetchEvents = async (
			eventCategories: string[] = filters.categories,
		) => {
			const params: QueryParams = {page: urlPage, limit: 10, search: urlSearch};
			try {
				if (eventCategories.length) params.categories = eventCategories.join(",");
				const response = await EventService.getEvents(params);
				console.log(filters.categories);
				setEvents(response.data);
				setTotalPages(response.meta.totalPages);
				console.log(response);
			} catch (e) {
				console.error(e);
			}
		}
		fetchEvents();
	}, [urlPage, urlSearch, filters.categories])
	return (
		<section className="py-16 bg-white">
			<div className="container mx-auto px-4">
				<div className="flex justify-between items-end mb-8">
					<div className="relative flex-1 min-w-[200px]">
						<SearchInput value={search} onChange={setSearch} placeholder="Šta tražite?"/>
					</div>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
						<EventCategoriesMultiSelect handleSelectChange={setCategories}
													selectedCategories={filters.categories}/>
					</div>
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
					{events.map((event) => (
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
			</div>
			<div className="py-6 flex justify-center">
				<PaginationComponent
					currentPage={page}
					totalPages={totalPages}
					onPageChange={updatePage}
				/>
			</div>
		</section>
	)
}