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

type Props = {
	id: string | number;
	title: string;
	image: string;
	category: string;
	date: string;
	location: string;
	description: string;
};

export function EventCard({id, title, image, category, date, location, description}: Props) {
	const {user} = useAuth();
	const router = useRouter();
	const {isFavorite, toggleFavorite, loading: loadingFavorite} = useFavorites();

	const handleToggleFavorite = async (e: React.MouseEvent) => {
		e.stopPropagation();
		if (!user) {
			router.push(`/login?redirect=${encodeURIComponent(window.location.pathname)}`);
			return;
		}
		await toggleFavorite(Number(id));
	};

	return (
		<Card
			onClick={() => router.push(`/events/${id}`)}
			className="group relative overflow-hidden rounded-[2.5rem] p-5 bg-white border-none shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-500 hover:shadow-[0_20px_60px_rgba(79,70,229,0.15)] hover:-translate-y-2 cursor-pointer"
		>
			<div className="relative h-56 w-full overflow-hidden rounded-[1.8rem]">
				<img
					src={`${process.env.NEXT_PUBLIC_API_BASE_URL}public/${image}`}
					alt={title}
					className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
				/>

				<div className="absolute bottom-4 left-4">
					<Badge
						className="bg-white/95 backdrop-blur-sm text-slate-900 border-none px-4 py-1.5 font-bold rounded-xl shadow-lg uppercase text-[10px] tracking-wider">
						{category}
					</Badge>
				</div>

				<button
					onClick={handleToggleFavorite}
					disabled={loadingFavorite}
					className={cn(
						"absolute top-4 right-4 p-2.5 rounded-full transition-all duration-300",
						"bg-slate-900/10 backdrop-blur-md border border-white/20 shadow-xl hover:scale-110",
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

				<h3 className="text-xl font-black text-slate-900 leading-tight tracking-tight group-hover:text-indigo-600 transition-colors line-clamp-2 min-h-[3.5rem]">
					{title}
				</h3>

				<p className="text-sm text-slate-500 line-clamp-2 font-medium leading-relaxed">
					{description.length > 100 ? `${description.substring(0, 100)}...` : description}
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
						className="h-10 px-4 rounded-xl bg-indigo-50 text-indigo-600 font-bold text-xs hover:bg-indigo-600 hover:text-white transition-all flex gap-2"
					>
						Detalji
						<ArrowUpRight className="w-3.5 h-3.5"/>
					</Button>
				</div>
			</div>
		</Card>
	);
}