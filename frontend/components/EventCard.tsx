"use client"

import React from "react";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {CalendarIcon, MapPin} from "lucide-react";
import {useRouter} from "next/navigation";

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
	const router = useRouter();
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