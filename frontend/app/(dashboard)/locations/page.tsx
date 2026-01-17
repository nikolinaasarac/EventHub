"use client"

import {Search, MapPin as MapPinIcon} from "lucide-react";
import {LocationCard} from "@/components/LocationCard";
import {useEffect, useState} from "react";
import {Venue} from "@/models/venue.model";
import VenueService from "@/services/venue.service";

export default function LocationsPage() {
	const [venues, setVenues] = useState<Venue[]>([]);

	useEffect(() => {
		const fetchVenues = async () => {
			try {
				const response = await VenueService.getVenues();
				console.log(response);
				setVenues(response);
			} catch (e) {
				console.error(e);
			}
		}
		fetchVenues();
	}, [])

	const locations = [
		{
			id: 1,
			name: "Dvorana Peki",
			type: "Sportska dvorana",
			address: "Majke Jugovića bb, Pale",
			capacity: "2.500 mjesta",
			description: "Moderna sportska dvorana na Palama, idealna za košarkaške utakmice, koncerte i sajmove. Posjeduje vrhunsku akustiku i parking.",
			image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=600"
		},
		{
			id: 2,
			name: "Stadion FK Slavija",
			type: "Stadion",
			address: "Istočno Sarajevo",
			capacity: "6.000 mjesta",
			description: "Glavni gradski stadion sa prirodnom travom. Često domaćin velikih muzičkih koncerata na otvorenom.",
			image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=600"
		}
	];

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
						className="flex items-center justify-center px-6 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
						<MapPinIcon className="w-4 h-4 mr-2"/>
						Prikaži na mapi
					</button>
				</div>
				<div className="flex flex-col gap-6">
					{venues.map((loc) => (
						<LocationCard key={loc.id} location={loc}/>
					))}
				</div>

			</div>
		</div>
	);
}