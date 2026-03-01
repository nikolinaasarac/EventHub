"use client"

import React from "react";
import {Card} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Heart, MapPin, ArrowUpRight, Clock} from "lucide-react";
import {useRouter} from "next/navigation";
import {cn} from "@/lib/utils"
import {useAuth} from "@/context/auth-context";
import {useFavorites} from "@/context/favorite-context";
import {EventStatus} from "@/shared/enums/event-status.enum";

type Props = {
	id: string | number;
	title: string;
	image: string;
	category: string;
	date: string;
	location: string;
	description: string;
	status: EventStatus;
};

const STATUS_CONFIG = {
	[EventStatus.ZAKAZAN]: {label: "Zakazan", color: "bg-blue-500/90"},
	[EventStatus.OTKAZAN]: {label: "Otkazan", color: "bg-red-500/90"},
	[EventStatus.ZAVRSEN]: {label: "Završen", color: "bg-slate-600/90"},
};

export function EventCard({id, title, image, category, date, location, description, status}: Props) {
	const {user} = useAuth();
	const router = useRouter();
	const {isFavorite, toggleFavorite, loading: loadingFavorite} = useFavorites();

	const isCancelled = status === EventStatus.OTKAZAN;

	const handleToggleFavorite = async (e: React.MouseEvent) => {
		e.stopPropagation();
		if (!user) {
			const currentPath = window.location.pathname;
			router.push(`/login?redirect=${encodeURIComponent(currentPath)}`);
			return;
		}
		await toggleFavorite(Number(id));
	};

	return (
		<Card
			onClick={() => router.push(`/events/${id}`)}
			className={cn(
				"group relative overflow-hidden rounded-[2.5rem] p-5 bg-white border-none shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-500 hover:shadow-[0_20px_60px_rgba(79,70,229,0.15)] hover:-translate-y-2 cursor-pointer",
				isCancelled && "opacity-90"
			)}
		>
			<div className="relative h-56 w-full overflow-hidden rounded-[1.8rem]">
				{isCancelled && (
					<div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
						<div
							className="border-8 border-red-500/80 px-6 py-2 rounded-2xl rotate-[-20deg] scale-110 bg-white/10 backdrop-blur-[1px]">
							<span className="text-4xl font-black text-red-500/90 tracking-tighter uppercase italic">
								OTKAZANO
							</span>
						</div>
					</div>
				)}

				<img
					src={`${process.env.NEXT_PUBLIC_API_BASE_URL}public/${image}`}
					alt={title}
					className={cn(
						"w-full h-full object-cover transition-transform duration-700 group-hover:scale-110",
						isCancelled && "grayscale"
					)}
				/>

				<div className="absolute bottom-4 left-4 flex flex-col gap-2">
					<Badge
						className="w-fit bg-white/95 backdrop-blur-sm text-slate-900 border-none px-4 py-1.5 font-bold rounded-xl shadow-lg uppercase text-[10px] tracking-wider">
						{category}
					</Badge>
					<Badge className={cn(
						"w-fit text-white border-none px-4 py-1.5 font-bold rounded-xl shadow-lg uppercase text-[10px] tracking-wider",
						STATUS_CONFIG[status].color
					)}>
						{STATUS_CONFIG[status].label}
					</Badge>
				</div>

				<button
					onClick={handleToggleFavorite}
					disabled={loadingFavorite}
					className={cn(
						"absolute top-4 right-4 p-2.5 rounded-full transition-all duration-300 z-10",
						"bg-slate-900/10 backdrop-blur-md border border-white/30 shadow-xl hover:scale-110",
						isFavorite(Number(id)) ? "bg-white text-red-500" : "text-white hover:bg-white hover:text-red-500"
					)}
				>
					<Heart className={cn("w-4 h-4", isFavorite(Number(id)) && "fill-current")}/>
				</button>
			</div>

			<div className="mt-6 px-2 space-y-4">
				<div className="flex items-center gap-4 text-slate-400">
					<div className="flex items-center gap-1.5">
						<Clock className="w-3.5 h-3.5 text-indigo-500"/>
						<span className="text-[11px] font-bold uppercase tracking-wide">{date}</span>
					</div>
				</div>

				<h3 className={cn(
					"text-xl font-black text-slate-900 leading-tight tracking-tight group-hover:text-indigo-600 transition-colors line-clamp-2 min-h-[3.5rem]",
					isCancelled && "line-through text-slate-400"
				)}>
					{title}
				</h3>

				<p className="text-sm text-slate-500 line-clamp-2 font-medium leading-relaxed">
					{description}
				</p>

				<div className="pt-4 flex items-center justify-between border-t border-slate-50">
					<div className="flex items-center gap-3">
						<div
							className="w-9 h-9 rounded-full bg-indigo-50 flex items-center justify-center border border-indigo-100">
							<MapPin className="w-4 h-4 text-indigo-600"/>
						</div>
						<div className="flex flex-col">
							<span
								className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Lokacija</span>
							<span className="text-xs font-bold text-slate-700 truncate max-w-[120px]">{location}</span>
						</div>
					</div>

					<Button
						variant="ghost"
						className={cn(
							"h-10 px-4 rounded-xl font-bold text-xs transition-all flex gap-2 shadow-sm",
							isCancelled
								? "bg-slate-100 text-slate-400"
								: "bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white"
						)}
					>
						Detalji
						<ArrowUpRight className="w-3.5 h-3.5"/>
					</Button>
				</div>
			</div>
		</Card>
	);
}