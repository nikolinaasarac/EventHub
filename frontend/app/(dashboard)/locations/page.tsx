"use client"

import {MapPin as MapPinIcon, ChevronRight, Plus} from "lucide-react";
import {LocationCard} from "@/components/LocationCard";
import React, {useEffect, useState} from "react";
import {Venue} from "@/models/venue.model";
import VenueService from "@/services/venue.service";
import dynamic from "next/dynamic";
import {PaginationComponent} from "@/components/Pagination";
import {SearchInput} from "@/components/SearchInput";
import {useQueryFilters} from "@/shared/hooks/use-query-filters.hook";
import {CitiesMultiSelect} from "@/components/CitiesMultiSelect";
import {QueryParams} from "@/models/query-params.model";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {VenueTypesMultiSelect} from "@/components/VenueTypesMultiSelect";
import {Card} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {useAuth} from "@/context/auth-context";
import {UserRole} from "@/shared/enums/user-role.enum";
import {cn} from "@/lib/utils";

const VenueMap = dynamic(
	() => import("@/components/VenueMap"),
	{ssr: false}
);

export default function LocationsPage() {
	const router = useRouter();
	const {user} = useAuth();
	const {
		search, setSearch, updatePage, urlSearch, urlPage,
		filters, setCities, setVenueTypes
	} = useQueryFilters();

	const [venues, setVenues] = useState<Venue[]>([]);
	const [showMap, setShowMap] = useState(false);
	const [totalPages, setTotalPages] = useState(1);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchVenues = async () => {
			setLoading(true);
			const params: QueryParams = {page: urlPage, limit: 10, search: urlSearch};
			try {
				const cityParam = filters.cities.length > 0 ? filters.cities.join(",") : undefined;
				const typeParam = filters.venueTypes.length > 0 ? filters.venueTypes.join(",") : undefined;

				const response = await VenueService.getVenues({
					...params,
					cities: cityParam,
					venueTypes: typeParam
				});
				setVenues(response.data);
				setTotalPages(response.meta.totalPages);
			} catch (e) {
				console.error(e);
			} finally {
				setLoading(false);
			}
		};
		fetchVenues();
	}, [urlPage, urlSearch, filters.cities, filters.venueTypes]);

	return (
		<main className="min-h-screen bg-white">
			<section className="relative h-[300px] md:h-[400px] flex items-center bg-slate-900 overflow-hidden">
				<div className="absolute inset-0 z-0">
					<img
						src="/locations.png"
						className="w-full h-full object-cover opacity-40"
						alt="Venues background"
					/>
					<div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/60 to-transparent"/>
				</div>

				<div className="container mx-auto px-4 relative z-10">
					<div className="max-w-2xl">
						<div
							className="flex items-center gap-2 text-indigo-400 text-xs font-black uppercase tracking-[0.3em] mb-4">
							<ChevronRight className="w-3 h-3"/>
							<span>Lokacije</span>
						</div>
						<h1 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter mb-6">
							Lokacije
						</h1>
						{user && user.roles.some(role => role.name === UserRole.ADMIN) && (
							<Button
								onClick={() => router.push('/locations/add-location')}
								className="bg-indigo-600 hover:bg-indigo-700 h-12 px-8 rounded-full font-bold gap-2 shadow-lg shadow-indigo-500/20"
							>
								<Plus className="w-5 h-5"/>
								Dodaj novu lokaciju
							</Button>
						)}
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
									placeholder="Pretražite dvorane, stadione, klubove..."
									className="h-14 border-slate-100 bg-slate-50/50 rounded-2xl focus:ring-indigo-500/20 transition-all w-full"
								/>
							</div>
							<div className="flex gap-2 items-center w-full md:w-auto">
								<Button
									onClick={() => setShowMap(!showMap)}
									variant={showMap ? "default" : "outline"}
									className={cn(
										"px-6 rounded-2xl font-bold flex-1 md:flex-none gap-2 transition-all",
										showMap ? "bg-indigo-600 shadow-indigo-200" : "border-slate-200 text-slate-600"
									)}
								>
									<MapPinIcon className="w-4 h-4"/>
									{showMap ? "Sakrij mapu" : "Prikaži mapu"}
								</Button>
							</div>
						</div>

						<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
							<div className="space-y-1.5">
								<Label
									className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Opština</Label>
								<CitiesMultiSelect handleSelectChange={setCities} selectedCities={filters.cities}/>
							</div>
							<div className="space-y-1.5">
								<Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Tip
									objekta</Label>
								<VenueTypesMultiSelect handleSelectChange={setVenueTypes}
													   selectedVenueTypes={filters.venueTypes}/>
							</div>
						</div>
					</div>
				</Card>
			</div>

			<section className="container mx-auto px-4 py-16">
				{showMap && (
					<div className="mb-16 animate-in fade-in zoom-in-95 duration-500">
						<div
							className="rounded-[2.5rem] overflow-hidden border-8 border-slate-50 shadow-2xl shadow-indigo-100">
							<VenueMap venues={venues}/>
						</div>
					</div>
				)}

				{loading ? (
					<div className="flex flex-col items-center justify-center py-20 gap-4">
						<div
							className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
						<p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Učitavanje
							lokacija...</p>
					</div>
				) : venues.length > 0 ? (
					<div className="grid grid-cols-1 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
						{venues.map((loc) => (
							<LocationCard key={loc.id} location={loc}/>
						))}
					</div>
				) : (
					<div
						className="text-center py-24 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
						<MapPinIcon className="w-16 h-16 text-slate-200 mx-auto mb-4"/>
						<h3 className="text-xl font-bold text-slate-400">Nema pronađenih lokacija</h3>
					</div>
				)}

				{!loading && venues.length > 0 && (
					<div className="mt-20 flex justify-center pb-10">
						<div className="bg-slate-50 p-2 rounded-2xl border border-slate-100 shadow-sm">
							<PaginationComponent currentPage={urlPage} totalPages={totalPages}
												 onPageChange={updatePage}/>
						</div>
					</div>
				)}
			</section>
		</main>
	);
}