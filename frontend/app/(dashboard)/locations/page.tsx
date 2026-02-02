"use client"

import {MapPin as MapPinIcon} from "lucide-react";
import {LocationCard} from "@/components/LocationCard";
import {useEffect, useState} from "react";
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

const VenueMap = dynamic(
	() => import("@/components/VenueMap"),
	{ssr: false}
);

export default function LocationsPage() {
	const router = useRouter();
	const {
		search,
		setSearch,
		page,
		updatePage,
		urlSearch,
		urlPage,
		filters,
		setCities,
		setVenueTypes
	} = useQueryFilters();

	const [venues, setVenues] = useState<Venue[]>([]);
	const [showMap, setShowMap] = useState(false);
	const [totalPages, setTotalPages] = useState(1);

	useEffect(() => {
		const fetchVenues = async (cities: string[] = filters.cities, venueTypes: string[] = filters.venueTypes) => {
			const params: QueryParams = {page: urlPage, limit: 10, search: urlSearch};
			try {
				if (cities.length > 0) params.cities = cities.join(",");
				if (venueTypes.length > 0) params.venueTypes = venueTypes.join(",");
				const response = await VenueService.getVenues(params);
				setVenues(response.data);
				setTotalPages(response.meta.totalPages);
			} catch (e) {
				console.error(e);
			}
		};
		fetchVenues();
	}, [urlPage, urlSearch, filters.cities, filters.venueTypes]);

	return (
		<div className="min-h-screen bg-slate-50 py-12">
			<div className="container mx-auto px-4">
				<div className="mb-3">
					<div className="flex items-center justify-between">
						<h1 className="text-3xl font-bold text-slate-900 mb-2">Lokacije</h1>
						<Button className="bg-indigo-600 hover:bg-indigo-700"
								onClick={() => router.push('/locations/add-location')}>Dodaj lokaciju</Button>
					</div>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 my-2">
						<CitiesMultiSelect handleSelectChange={setCities} selectedCities={filters.cities}/>
						<VenueTypesMultiSelect handleSelectChange={setVenueTypes}
											   selectedVenueTypes={filters.venueTypes}/>
					</div>
				</div>

				<div className="flex flex-col md:flex-row gap-4 mb-8">
					<div className="flex-1">
						<SearchInput
							value={search}
							onChange={setSearch}
							placeholder="Pretraži dvorane, stadione..."
						/>
					</div>
					<button
						onClick={() => setShowMap(!showMap)}
						className="flex items-center justify-center px-6 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
					>
						<MapPinIcon className="w-4 h-4 mr-2"/>
						{showMap ? "Sakrij mapu" : "Prikaži na mapi"}
					</button>
				</div>
				{showMap && (
					<div className="mb-10">
						<VenueMap venues={venues}/>
					</div>
				)}
				<div className="flex flex-col gap-6">
					{venues.map((loc) => (
						<LocationCard key={loc.id} location={loc}/>
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
		</div>
	);
}