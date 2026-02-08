"use client"

import React, {useEffect, useState} from 'react';
import {
	Calendar,
	MapPin,
	Clock,
	Heart,
	Info,
	CheckCircle2, ChevronLeft, Trash, MessageSquare
} from 'lucide-react';
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import {useParams, useRouter} from "next/navigation";
import {Event} from '@/models/event.model'
import EventService from "@/services/event.service";
import {DateTimeHelper} from "@/shared/helpers/date-time.helper";
import {EventMetadataComponent} from "@/components/EventMetadataComponent";
import {ConfirmDialog} from "@/components/ConfirmDialog";
import {toast} from "sonner";
import {Review} from "@/models/review.model";
import ReviewsService from "@/services/reviews.service";
import {ReviewItem} from "@/components/ReviewItem";
import {AddReviewForm} from "@/components/AddReviewForm";

export default function EventDetailsPage() {
	const {id} = useParams();
	const [event, setEvent] = useState<Event | null>(null);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const router = useRouter();
	const eventId = Array.isArray(id) ? id[0] : id;
	const [reviews, setReviews] = useState<Review[]>([])


	useEffect(() => {
		if (!id || Array.isArray(id)) return;
		const fetchEvent = async () => {
			try {
				const response = await EventService.getEvent(id);
				setEvent(response);
			} catch (e) {
				console.error(e);
			}
		}
		const fetchReviews = async () => {
			try {
				const response = await ReviewsService.getReviewsByEventId(Number(id));
				setReviews(response);
			} catch (e) {
				console.error(e);
			}
		}
		fetchEvent();
		fetchReviews();
	}, [id])

	const handleDelete = async () => {
		if (!eventId) return;
		try {
			await EventService.deleteEvent(eventId);
			toast.success("Događaj uspješno obrisan!")
		} catch (e) {
			console.error(e);
			toast.error("Greška prilikom brisanja događaja!")
		} finally {
			router.back();
		}
	}

	const refreshReviews = async () => {
		try {
			const response = await ReviewsService.getReviewsByEventId(Number(id));
			setReviews(response);
		} catch (e) {
			console.error(e);
		}
	};

	if (!event) return null;

	return (
		<div className="min-h-screen bg-white">
			<div className="bg-white top-0 z-40">
				<div className="container mx-auto px-4 py-3 flex justify-between items-center">
					<Button onClick={() => router.back()} variant="ghost" size="sm" className="gap-2 text-slate-500">
						<ChevronLeft className="w-4 h-4"/> Nazad
					</Button>
					<Button variant="outline" size="icon" className="rounded-full w-9 h-9 bg-red-500 hover:bg-red-600"
							onClick={() => setShowDeleteModal(true)}>
						<Trash className="w-4 h-4 text-white"/>
					</Button>
				</div>
			</div>

			<main className="container mx-auto px-4 pb-20">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

					<div className="lg:col-span-2 space-y-8">

						<div className="relative h-[350px] md:h-[500px] overflow-hidden shadow-xl">
							<img
								src={`${process.env.NEXT_PUBLIC_API_BASE_URL}public/${event.imageUrl}`}
								className="w-full h-full object-cover"
								alt={event.title}
							/>
							<div className="absolute top-4 right-4 flex gap-2">
								<Button size="icon" variant="secondary"
										className="rounded-full shadow-lg bg-white/90 text-red-500">
									<Heart className="w-4 h-4"/>
								</Button>
							</div>
						</div>
						<div className="space-y-4">
							<Badge className="bg-indigo-100 text-indigo-700 hover:bg-indigo-100 border-none px-4 py-1">
								{event.eventSubcategory.eventCategory.name}
							</Badge>
							<h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight">
								{event.title}
							</h1>

							<div className="flex flex-wrap gap-6 pt-4 text-slate-600">
								<div className="flex items-center gap-2">
									<Calendar className="w-5 h-5 text-indigo-600"/>
									<span
										className="font-medium">{DateTimeHelper.formatOnlyDate(event.startDate)}</span>
								</div>
								<div className="flex items-center gap-2">
									<Clock className="w-5 h-5 text-indigo-600"/>
									<span
										className="font-medium">{DateTimeHelper.formatOnlyTime(event.startDate)}</span>
								</div>
								<div className="flex items-center gap-2">
									<MapPin className="w-5 h-5 text-indigo-600"/>
									<span className="font-medium">{event.venue.name}</span>
								</div>
							</div>
						</div>

						<hr className="border-slate-100"/>
						<div className="space-y-4">
							<h2 className="text-2xl font-bold flex items-center gap-2">
								<Info className="w-5 h-5 text-indigo-600"/> O događaju
							</h2>
							<p className="text-slate-600 leading-relaxed text-lg text-justify">
								{event.description}
							</p>
						</div>
						<div className="space-y-4">
							<h2 className="text-2xl font-bold flex items-center gap-2">
								<CheckCircle2 className="w-5 h-5 text-indigo-600"/> Detalji
							</h2>
							<EventMetadataComponent metadata={event.metadata}/>
						</div>
						<hr className="border-slate-100"/>
						<div className="space-y-8">
							<div className="flex items-center justify-between">
								<h2 className="text-2xl font-bold flex items-center gap-2">
									<MessageSquare className="w-5 h-5 text-indigo-600"/> Utisci posjetilaca
								</h2>
								<Badge variant="secondary" className="bg-slate-100 text-slate-600">
									{reviews.length} {reviews.length === 1 ? 'komentar' : 'komentara'}
								</Badge>
							</div>
							<AddReviewForm
								eventId={Number(eventId)}
								onReviewAdded={refreshReviews}
							/>

							{reviews.length > 0 ? (
								<div className="grid gap-6">
									{reviews.map((review) => (
										<ReviewItem key={review.id} review={review}/>
									))}
								</div>
							) : (
								<div
									className="text-center py-12 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
									<div
										className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
										<MessageSquare className="w-6 h-6 text-slate-300"/>
									</div>
									<p className="text-slate-500 font-medium">Još uvijek nema komentara za ovaj
										događaj.</p>
									<p className="text-sm text-slate-400">Budite prvi koji će podijeliti utiske!</p>
								</div>
							)}
						</div>
					</div>
					{event.ticketTypes && event.ticketTypes.length > 0 ? (
						<div className="lg:col-span-1">
							<div
								className="sticky top-24 p-8 rounded-3xl shadow-slate-200/50 space-y-6">
								{event.ticketTypes.map(ticketType => (
									<div key={ticketType.id}
										 className="flex flex-col items-center gap-4 p-6 rounded-xl shadow-lg  border border-indigo-100 hover:shadow-xl transition-all">
										<span
											className="text-slate-400 text-sm font-medium uppercase">Cijena ulaznice</span>
										<div className="text-4xl font-black text-slate-900 mt-1">{ticketType.name}</div>
										<div className="text-4xl font-black text-slate-900 mt-1">{ticketType.price} KM
										</div>
										<div className="space-y-3 mt-4">
											<Button
												className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 text-lg font-bold rounded-2xl shadow-lg shadow-indigo-100">
												Kupi kartu
											</Button>
										</div>
									</div>
								))}
							</div>
						</div>
					) : (
						<div className="lg:col-span-1">
							<div
								className="sticky top-24 p-8 rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-200/50 text-center text-slate-700 font-medium space-y-2">
								<p>Događaj je besplatan!</p>
								<p>Nema dostupnih ulaznica za kupovinu.</p>
							</div>
						</div>
					)}
				</div>
			</main>
			<ConfirmDialog
				open={showDeleteModal}
				title="Želite li da obrišete ovaj događaj?"
				description="Ova akcija se neće moći opozvati."
				confirmText="Obriši"
				cancelText="Odustani"
				confirmColor="bg-red-600 hover:bg-red-700"
				onConfirm={handleDelete}
				onCancel={() => setShowDeleteModal(false)}
			/>
		</div>
	);
}