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
import {Calendar as CalendarIcon, ChevronRight, FilterX, Plus, TicketIcon} from "lucide-react";
import PageHeader from "@/components/PageHeader";
import {DateTimePicker} from "@/components/DateTimePicker";
import {EventStatusesMultiSelect} from "@/components/EventStatusesMultiSelect";
import {Card} from "@/components/ui/card";
import {Label} from "@/components/ui/label";

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
	const [loading, setLoading] = useState(true);
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
			setLoading(true);
			const params: QueryParams = {page: urlPage, limit: 5, search: urlSearch};
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
			} finally {
				setLoading(false);
			}
		}
		fetchEvents();
	}, [urlPage, urlSearch, filters.categories, filters.cities, filters.status, filters.from, filters.to])
	return (
		<main className="min-h-screen bg-white">
			<section className="relative h-[300px] md:h-[400px] flex items-center bg-slate-900 overflow-hidden">
				<div className="absolute inset-0 z-0">
					<img
						src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1600"
						className="w-full h-full object-cover opacity-40"
						alt="Hero background"
					/>
					<div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/60 to-transparent"/>
				</div>

				<div className="container mx-auto px-4 relative z-10">
					<div className="max-w-2xl">
						<div
							className="flex items-center gap-2 text-indigo-400 text-xs font-black uppercase tracking-[0.3em] mb-4">
							<span>Početna</span>
							<ChevronRight className="w-3 h-3"/>
							<span className="text-white">Događaji</span>
						</div>
						<h1 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter mb-6">
							Događaji
						</h1>
						<Button
							onClick={() => router.push('/events/add-event')}
							className="bg-indigo-600 hover:bg-indigo-700 h-12 px-8 rounded-full font-bold gap-2 shadow-lg shadow-indigo-500/20"
						>
							<Plus className="w-5 h-5"/>
							Dodaj novi događaj
						</Button>
					</div>
				</div>
			</section>

			<div className="container mx-auto px-4 -mt-12 relative z-20">
				<Card className="p-6 rounded-[2rem] border-none shadow-2xl bg-white">
					<div className="flex flex-col gap-6">
						<div className="flex flex-col md:flex-row gap-4 items-center">
							<div className="flex-1 w-full">
								<SearchInput
									value={search}
									onChange={setSearch}
									placeholder="Pretražite događaje po nazivu..."
									className="h-14 border-slate-100 bg-slate-50/50 rounded-2xl focus:ring-indigo-500/20 transition-all"
								/>
							</div>
							<Button
								variant="ghost"
								onClick={() => {
									setCategories([]);
									setCities([]);
									setSearch("");
									setFrom(null);
									setTo(null);
								}}
								className="h-14 px-6 rounded-2xl text-slate-400 hover:text-red-500 hover:bg-red-50 font-bold gap-2"
							>
								<FilterX className="w-5 h-5"/>
								Očisti
							</Button>
						</div>

						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
							<div className="space-y-1.5">
								<Label
									className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Kategorija</Label>
								<EventCategoriesMultiSelect handleSelectChange={setCategories}
															selectedCategories={filters.categories}/>
							</div>
							<div className="space-y-1.5">
								<Label
									className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Lokacija</Label>
								<CitiesMultiSelect handleSelectChange={setCities} selectedCities={filters.cities}/>
							</div>
							<div>
								<Label
									className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Status događaja</Label>
								<EventStatusesMultiSelect
									selectedStatuses={filters.status}
									handleSelectChange={setStatuses}
								/>
							</div>
							<div className="space-y-1.5">
								<Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Od
									datuma</Label>
								<DateTimePicker value={fromDate} maxDate={toDate}
												onChange={(d) => setFrom(d?.toISOString() || null)}
												placeholder="Izaberite datum"/>
							</div>
							<div className="space-y-1.5">
								<Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Do
									datuma</Label>
								<DateTimePicker value={toDate} minDate={fromDate}
												onChange={(d) => setTo(d?.toISOString() || null)}
												placeholder="Izaberite datum"/>
							</div>
						</div>
					</div>
				</Card>
			</div>

			<section className="container mx-auto px-4 py-20">
				{loading ? (
					<div className="flex flex-col items-center justify-center py-20 gap-4">
						<div
							className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
						<p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Učitavanje...</p>
					</div>
				) : events.length > 0 ? (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
						{events.map((event) => (
							<EventCard
								key={event.id}
								id={event.id}
								title={event.title}
								image={event.imageUrl}
								category={event.eventSubcategory.eventCategory.name}
								date={DateTimeHelper.formatDate(event.startDate)}
								location={event.venue.name}
								description={event.description}
							/>
						))}
					</div>
				) : (
					<div className="text-center py-20">
						<TicketIcon className="w-16 h-16 text-slate-100 mx-auto mb-4"/>
						<h3 className="text-xl font-bold text-slate-400">Nema pronađenih događaja</h3>
					</div>
				)}

				{!loading && events.length > 0 && (
					<div className="mt-24 flex justify-center">
						<div className="bg-slate-50 p-2 rounded-2xl border border-slate-100 shadow-sm">
							<PaginationComponent currentPage={urlPage} totalPages={totalPages}
												 onPageChange={updatePage}/>
						</div>
					</div>
				)}
			</section>
		</main>
	)
}