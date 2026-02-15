"use client"

import React, {useEffect, useState} from "react";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {CalendarIcon, Heart, MapPin} from "lucide-react";
import {useRouter} from "next/navigation";
import {cn} from "@/lib/utils"
import {FavoriteEventsService} from "@/services/favorite-events.service";
import {useAuth} from "@/context/auth-context";


type Props = {
	id: string | number;
	title: string;
	image: string;
	category: string;
	date: string;
	location: string;
};

export function EventCard({
							  id,
							  title,
							  image,
							  category,
							  date,
							  location,
						  }: Props) {
	const {user} = useAuth();
	const router = useRouter();
	const [isFavorite, setIsFavorite] = useState(false);
	const [loadingFavorite, setLoadingFavorite] = useState(false);

	useEffect(() => {
		if (!user) return;

		const checkFavorite = async () => {
			try {
				const favorites = await FavoriteEventsService.getMyFavoriteEvents();
				const isFav = favorites.some(
					(event) => String(event.id) === String(id)
				);
				setIsFavorite(isFav);
			} catch (e) {
				console.log("Favorite check failed");
			}
		};

		checkFavorite();

	}, [id]);


	const toggleFavorite = async (e: React.MouseEvent) => {
		e.stopPropagation();
		if (!user) {
			const currentPath = window.location.pathname;
			router.push(`/login?redirect=${encodeURIComponent(currentPath)}`);
			return;
		}

		try {
			setLoadingFavorite(true);
			if (isFavorite) {
				await FavoriteEventsService.removeFromFavoriteEvents(Number(id));
				setIsFavorite(false);
			} else {
				await FavoriteEventsService.addToFavoriteEvents(Number(id));
				setIsFavorite(true);
			}

		} catch (e) {
			console.error(e);
		} finally {
			setLoadingFavorite(false);
		}
	};

	return (
		<Card className="overflow-hidden border-none shadow-lg group">
			<div className="relative h-48 overflow-hidden">
				<img
					src={`${process.env.NEXT_PUBLIC_API_BASE_URL}public/${image}`}
					alt={title}
					className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
				/>
				<Badge className="absolute top-4 left-4 bg-white/90 text-slate-900 hover:bg-white">
					{category}
				</Badge>
				<button
					onClick={toggleFavorite}
					disabled={loadingFavorite}
					className={cn(
						"absolute top-3 right-3 p-2 rounded-full transition-all duration-300 z-10",
						"bg-white/80 backdrop-blur-sm shadow-md hover:scale-110",
						isFavorite
							? "text-red-500"
							: "text-slate-400 hover:text-red-500"
					)}
				>
					<Heart
						className={cn(
							"w-5 h-5 transition-colors",
							isFavorite && "fill-current"
						)}
					/>
				</button>
			</div>
			<CardHeader>
				<div className="flex items-center text-indigo-600 text-sm font-semibold mb-2">
					<CalendarIcon className="w-4 h-4 mr-2"/>
					{date}
				</div>
				<CardTitle className="text-xl">{title}</CardTitle>
			</CardHeader>

			<CardContent className="text-slate-500 flex items-center">
				<MapPin className="w-4 h-4 mr-2"/>
				{location}
			</CardContent>

			<CardFooter className="border-t pt-4 flex justify-end gap-2">
				<Button size="sm" className="bg-indigo-600  hover:bg-indigo-700"
						onClick={() => router.push(`/events/${id}`)}>
					Prikaži detalje
				</Button>
			</CardFooter>
		</Card>
	);
}