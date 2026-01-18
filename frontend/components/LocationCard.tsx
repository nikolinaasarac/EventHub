"use client"

import React from 'react';
import { MapPin, Users, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle
} from "@/components/ui/card";
import { Venue } from "@/models/venue.model";
import {useRouter} from "next/navigation";

interface Props {
	location: Venue
}

export function LocationCard({ location }: Props) {

	const router = useRouter();
	return (
		<Card className="group overflow-hidden border-slate-200 hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row p-0">

			<div className="relative w-full md:w-72 h-48 md:h-auto overflow-hidden">
				<img
					src={location.imageUrl}
					alt={location.name}
					className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
			</div>

			<div className="flex flex-col flex-1 p-6 justify-center">
				<CardHeader className="pb-2">
					<div className="flex justify-between items-start">
						<CardTitle className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
							{location.name}
						</CardTitle>
						<span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded uppercase tracking-wider">
							{location.venueType.name}
						</span>
					</div>
				</CardHeader>

				<CardContent className="space-y-4">
					<p className="text-slate-500 text-sm line-clamp-2">
						{location.description}
					</p>

					<div className="space-y-2">
						<div className="flex items-center text-sm text-slate-600">
							<MapPin className="w-4 h-4 mr-2 text-indigo-500 shrink-0" />
							<span className="truncate">{location.address}</span>
						</div>
						<div className="flex items-center text-sm text-slate-600">
							<Users className="w-4 h-4 mr-2 text-indigo-500 shrink-0" />
							<span>Kapacitet: <span className="font-semibold">{location.capacity}</span></span>
						</div>
					</div>
				</CardContent>

				<CardFooter className="mt-auto pt-4 border-t border-slate-50 flex justify-end">
					<Button
						onClick={() => router.push(`/locations/${location.id}`)}
						variant="outline"
						size="sm"
						className="group/btn border-indigo-100 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all"
					>
						Pogledaj detalje
						<ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover/btn:translate-x-1" />
					</Button>
				</CardFooter>
			</div>
		</Card>
	);
}