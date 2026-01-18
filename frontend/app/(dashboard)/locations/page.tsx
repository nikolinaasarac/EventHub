"use client"

import {Search, MapPin as MapPinIcon} from "lucide-react";
import {LocationCard} from "@/components/LocationCard";
import {useEffect, useState} from "react";
import {Venue} from "@/models/venue.model";
import VenueService from "@/services/venue.service";
import dynamic from "next/dynamic";

const VenueMap = dynamic(
	() => import("@/components/VenueMap"),
	{ ssr: false }
);

export default function LocationsPage() {
	const [venues, setVenues] = useState<Venue[]>([]);
	const [showMap, setShowMap] = useState(false);

	useEffect(() => {
		const fetchVenues = async () => {
			try {
				const response = await VenueService.getVenues();
				setVenues(response);
			} catch (e) {
				console.error(e);
			}
		}
		fetchVenues();
	}, [])

	return (
		<div className="min-h-screen bg-slate-50 py-12">
			<div className="container mx-auto px-4">

				<div className="mb-12">
					<h1 className="text-3xl font-bold text-slate-900 mb-2">Lokacije</h1>
					<p className="text-slate-500">Istražite lokacije</p>
				</div>

				<div className="flex flex-col md:flex-row gap-4 mb-8">
					<div className="relative flex-1">
						<Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/>
						<input
							type="text"
							placeholder="Pretraži dvorane, stadione..."
							className="w-full pl-9 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
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
						<VenueMap venues={venues} />
					</div>
				)}
				<div className="flex flex-col gap-6">
					{venues.map((loc) => (
						<LocationCard key={loc.id} location={loc}/>
					))}
				</div>

			</div>
		</div>
	);
}