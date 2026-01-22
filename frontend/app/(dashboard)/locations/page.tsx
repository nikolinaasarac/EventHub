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

const VenueMap = dynamic(
	() => import("@/components/VenueMap"),
	{ssr: false}
);

export default function LocationsPage() {
	const {search, setSearch, page, updatePage, urlSearch, urlPage} = useQueryFilters();

	const [venues, setVenues] = useState<Venue[]>([]);
	const [showMap, setShowMap] = useState(false);
	const [totalPages, setTotalPages] = useState(1);

	useEffect(() => {
		const fetchVenues = async () => {
			try {
				const response = await VenueService.getVenues({
					page: urlPage,
					limit: 2,
					search: urlSearch
				});
				setVenues(response.data);
				setTotalPages(response.meta.totalPages);
			} catch (e) {
				console.error(e);
			}
		};
		fetchVenues();
	}, [urlPage, urlSearch]);

	return (
		<div className="min-h-screen bg-slate-50 py-12">
			<div className="container mx-auto px-4">

				<div className="mb-12">
					<h1 className="text-3xl font-bold text-slate-900 mb-2">Lokacije</h1>
					<p className="text-slate-500">Istražite lokacije</p>
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