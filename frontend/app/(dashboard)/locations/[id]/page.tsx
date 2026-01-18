"use client"

import React, {useEffect, useState} from 'react';
import {
	MapPin, Users, Phone, Globe, Mail, ChevronLeft, Share2, Facebook,
	Instagram, ExternalLink, Building2
} from 'lucide-react';
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import {Venue} from '@/models/venue.model'
import VenueService from "@/services/venue.service";
import {useParams, useRouter} from "next/navigation";
import Link from "next/link";
import {AMENITY_ICONS, DEFAULT_AMENITY_ICON} from "@/shared/constants/amenity-icons";
import dynamic from "next/dynamic";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";

const VenueMap = dynamic(
	() => import("@/components/VenueMap"),
	{ssr: false}
);
export default function VenueDetailsPage() {
	const [venue, setVenue] = useState<Venue | null>(null);
	const [showMapModal, setShowMapModal] = useState(false);
	const {id} = useParams();
	const router = useRouter();

	useEffect(() => {
		if (!id || Array.isArray(id)) return;
		const fetchVenue = async () => {
			try {
				const response = await VenueService.getVenue(id);
				setVenue(response);
			} catch (e) {
				console.error(e);
			}
		};
		fetchVenue();
	}, [id]);

	if (!venue) return null;

	return (
		<div className="min-h-screen flex flex-col bg-slate-50/50">
			<div className="bg-white top-0 z-40">
				<div className="container mx-auto px-4 py-3 flex justify-between items-center">
					<Button onClick={() => router.back()} variant="ghost" size="sm" className="gap-2 text-slate-500">
						<ChevronLeft className="w-4 h-4"/> Nazad
					</Button>
					<Button variant="outline" size="icon" className="rounded-full w-9 h-9">
						<Share2 className="w-4 h-4 text-slate-600"/>
					</Button>
				</div>
			</div>

			<main className="flex-1 container mx-auto px-4 py-8">
				<div className="max-w-6xl mx-auto">

					<div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden mb-8">
						<div className="grid grid-cols-1 lg:grid-cols-12">

							<div className="lg:col-span-5 p-4">
								<div
									className="relative aspect-[4/3] rounded-[1.5rem] overflow-hidden shadow-inner bg-slate-100">
									<img
										src={`/${venue.imageUrl}`}
										alt={venue.name}
										className="w-full h-full object-cover"
									/>
								</div>
							</div>

							<div className="lg:col-span-7 p-6 lg:p-10 flex flex-col justify-center">
								<div className="space-y-6">
									<div className="space-y-3">
										<Badge
											className="bg-indigo-50 text-indigo-600 border-none px-3 py-1 text-[10px] font-bold uppercase tracking-widest">
											{venue.venueType.name}
										</Badge>
										<h1 className="text-3xl md:text-4xl font-black text-slate-900">
											{venue.name}
										</h1>
									</div>

									<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
										<div className="flex items-start gap-3">
											<MapPin className="w-5 h-5 text-indigo-600 shrink-0 mt-1"/>
											<div>
												<p className="text-[10px] text-slate-400 font-bold uppercase">Adresa i
													Grad</p>
												<p className="text-slate-700 font-semibold leading-tight">{venue.address}, {venue.city.name}</p>
											</div>
										</div>
										<div className="flex items-start gap-3">
											<Users className="w-5 h-5 text-indigo-600 shrink-0 mt-1"/>
											<div>
												<p className="text-[10px] text-slate-400 font-bold uppercase">Maks.
													Kapacitet</p>
												<p className="text-slate-700 font-semibold">{venue.capacity} mjesta</p>
											</div>
										</div>
									</div>

									<div className="pt-4 flex flex-wrap gap-3">
										<Button
											className="bg-indigo-600 hover:bg-indigo-700 h-12 px-8 rounded-xl font-bold transition-all"
											onClick={() => setShowMapModal(true)}
										>
											Prikaži na mapi
										</Button>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-2">

						<div className="lg:col-span-2 space-y-6">
							<div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
								<h2 className="text-xl font-black text-slate-900 flex items-center gap-2 mb-6">
									<Building2 className="w-5 h-5 text-indigo-600"/>
									O objektu
								</h2>
								<p className="text-justify text-slate-600 text-lg leading-relaxed">
									{venue.description}
								</p>
							</div>
						</div>

						<div className="lg:col-span-1">
							<div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
								<h2 className="text-xl font-black text-slate-900 mb-6 uppercase tracking-tight">Sadržaji</h2>
								<div className="space-y-3">
									{venue.amenities.map((item) => (
										<div key={item}
											 className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
											<div className="text-indigo-600">
												{AMENITY_ICONS[item] || DEFAULT_AMENITY_ICON}
											</div>
											<span className="font-bold text-slate-700 text-xs">{item}</span>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
				<Button
					className="bg-indigo-600 hover:bg-indigo-700 h-12 px-8 rounded-xl font-bold transition-all"
					onClick={() => setShowMapModal(true)}
				>
					Prikaži na mapi
				</Button>

				<Dialog open={showMapModal} onOpenChange={setShowMapModal}>
					<DialogContent className="max-w-4xl p-0 overflow-hidden border-none rounded-[2rem]">
						<DialogHeader
							className="p-6 absolute top-0 left-0 z-10 bg-white/80 backdrop-blur-md w-full border-b">
							<DialogTitle className="font-black text-slate-900">{venue.name}</DialogTitle>
						</DialogHeader>

						<div className="mt-16">
							<VenueMap venue={venue} height="500px"/>
						</div>
					</DialogContent>
				</Dialog>
			</main>

			<footer className="bg-slate-900 text-white rounded-t-[3.5rem] mt-12">
				<div className="container mx-auto px-6 md:px-12 py-20">
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
						<div className="space-y-8 lg:col-span-2">
							<div>
								<h3 className="text-indigo-400 font-bold uppercase tracking-widest text-xs mb-8">Kontakt
									centar</h3>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
									<div className="flex items-center gap-5 group">
										<div
											className="p-4 bg-white/5 rounded-2xl group-hover:bg-indigo-600 transition-all duration-300">
											<Phone className="w-6 h-6 text-indigo-400 group-hover:text-white"/>
										</div>
										<div className="flex flex-col">
											<span className="text-xs text-slate-500 uppercase font-bold">Telefon</span>
											<span className="text-xl font-medium tracking-tight">{venue.phone}</span>
										</div>
									</div>

									<div className="flex items-center gap-5 group">
										<div
											className="p-4 bg-white/5 rounded-2xl group-hover:bg-indigo-600 transition-all duration-300">
											<Mail className="w-6 h-6 text-indigo-400 group-hover:text-white"/>
										</div>
										<div className="flex flex-col">
											<span className="text-xs text-slate-500 uppercase font-bold">Email</span>
											<span
												className="text-xl font-medium tracking-tight break-all">{venue.email}</span>
										</div>
									</div>

									{venue.websiteUrl && (
										<a
											href={venue.websiteUrl.startsWith('http') ? venue.websiteUrl : `https://${venue.websiteUrl}`}
											target="_blank" rel="noopener noreferrer"
											className="flex items-center gap-5 group w-fit"
										>
											<div
												className="p-4 bg-white/5 rounded-2xl group-hover:bg-indigo-600 transition-all duration-300">
												<Globe className="w-6 h-6 text-indigo-400 group-hover:text-white"/>
											</div>
											<div className="flex flex-col">
												<span
													className="text-xs text-slate-500 uppercase font-bold">Web sajt</span>
												<span
													className="text-xl font-medium group-hover:text-indigo-400 transition-colors flex items-center gap-2">
                                                    {venue.websiteUrl.replace(/^https?:\/\//, '').split('/')[0]}
													<ExternalLink className="w-4 h-4"/>
                                                </span>
											</div>
										</a>
									)}
								</div>
							</div>
						</div>

						<div className="bg-white/5 p-8 rounded-[2.5rem] space-y-8">
							<div className="space-y-4">
								<h3 className="text-indigo-400 font-bold uppercase tracking-widest text-xs">Pratite
									nas</h3>
								<div className="flex gap-4">
									<Link
										href={venue.instagram ? `https://www.instagram.com/${venue.instagram}` : "#"}
										className="w-14 h-14 flex items-center justify-center bg-white/5 rounded-2xl hover:bg-gradient-to-tr hover:from-orange-500 hover:to-purple-600 transition-all duration-500 shadow-xl"
									>
										<Instagram className="w-7 h-7"/>
									</Link>
									<a
										href={venue.facebook ? `https://www.facebook.com/${venue.facebook}` : "#"}
										className="w-14 h-14 flex items-center justify-center bg-white/5 rounded-2xl hover:bg-blue-600 transition-all duration-500 shadow-xl"
									>
										<Facebook className="w-7 h-7"/>
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
}