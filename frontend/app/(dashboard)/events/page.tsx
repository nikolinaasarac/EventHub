"use client"
import {EventCard} from "@/components/EventCard";
import React, {useEffect, useState} from "react";
import EventService from "@/services/event.service";
import {Event} from "@/models/event.model"
import {DateTimeHelper} from "@/shared/helpers/date-time.helper";
import {useQueryFilters} from "@/shared/hooks/use-query-filters.hook";
import {PaginationComponent} from "@/components/Pagination";
import {SearchInput} from "@/components/SearchInput";
import {EventCategoriesMultiSelect} from "@/components/EventCategoriesMultiSelect";
import {QueryParams} from "@/models/query-params.model";
import {CitiesMultiSelect} from "@/components/CitiesMultiSelect";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {Calendar as CalendarIcon, TicketIcon} from "lucide-react";
import PageHeader from "@/components/PageHeader";
import {DateTimePicker} from "@/components/DateTimePicker";
import {EventStatusesMultiSelect} from "@/components/EventStatusesMultiSelect";

export default function EventsPage() {
	const {
		search,
		setSearch,
		page,
		updatePage,
		urlSearch,
		urlPage,
		filters,
		setCategories,
		setCities,
		setFrom,
		setTo,
		setStatuses
	} = useQueryFilters();
	const [events, setEvents] = useState<Event[]>([]);
	const [totalPages, setTotalPages] = useState(1);
	const fromDate = filters.from ? new Date(filters.from) : undefined;
	const toDate = filters.to ? new Date(filters.to) : undefined;
	const router = useRouter();


	useEffect(() => {
		const fetchEvents = async (
			eventCategories: string[] = filters.categories,
			cities: string[] = filters.cities,
			status: string[] = filters.status
		) => {
			const params: QueryParams = {page: urlPage, limit: 10, search: urlSearch};
			if (filters.from) params.from = filters.from;
			if (filters.to) params.to = filters.to;
			try {
				if (eventCategories.length) params.categories = eventCategories.join(",");
				if (cities.length > 0) params.cities = cities.join(",");
				if (status.length > 0) params.status = status.join(",");
				const response = await EventService.getEvents(params);
				setEvents(response.data);
				setTotalPages(response.meta.totalPages);
			} catch (e) {
				console.error(e);
			}
		}
		fetchEvents();
	}, [urlPage, urlSearch, filters.categories, filters.cities, filters.status, filters.from, filters.to])
	return (
		<section className="min-h-screen bg-white py-12">
			<div className="container mx-auto px-4">
				<div className="flex flex-col mb-8">
					<div className="flex items-center justify-between mb-2">
						<PageHeader title={"Događaji"}
									subtitle={"Pregledajte sve događaje."}
									icon={TicketIcon}/>
						<Button className="bg-indigo-600 hover:bg-indigo-700"
								onClick={() => router.push('/events/add-event')}>Dodaj događaj</Button>
					</div>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-2">
						<EventCategoriesMultiSelect handleSelectChange={setCategories}
													selectedCategories={filters.categories}/>
						<CitiesMultiSelect handleSelectChange={setCities} selectedCities={filters.cities}/>
						<EventStatusesMultiSelect
							selectedStatuses={filters.status}
							handleSelectChange={setStatuses}
						/>
					</div>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
						<DateTimePicker
							value={fromDate}
							maxDate={toDate}
							onChange={(date) =>
								setFrom(date ? date.toISOString() : null)
							}
							placeholder="Od datuma"
						/>

						<DateTimePicker
							value={toDate}
							minDate={fromDate}
							onChange={(date) =>
								setTo(date ? date.toISOString() : null)
							}
							placeholder="Do datuma"
						/>
					</div>
					<div className="flex-1 min-w-[200px] mb-4">
						<SearchInput value={search} onChange={setSearch} placeholder="Šta tražite?"/>
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