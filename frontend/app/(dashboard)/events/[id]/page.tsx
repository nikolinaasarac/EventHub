"use client"

import React, {useEffect, useState} from 'react';
import {
	Calendar,
	ChevronLeft,
	Clock,
	Heart,
	MapPin,
	MessageSquare,
	ShieldCheck, Star,
	Trash
} from 'lucide-react';
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import {useParams, usePathname, useRouter} from "next/navigation";
import {Event} from '@/models/event.model'
import EventService from "@/services/event.service";
import {DateTimeHelper} from "@/shared/helpers/date-time.helper";
import {EventMetadataComponent} from "@/components/EventMetadataComponent";
import {ConfirmDialog} from "@/components/ConfirmDialog";
import {toast} from "sonner";
import ReviewsService from "@/services/reviews.service";
import {ReviewItem} from "@/components/ReviewItem";
import {AddReviewForm} from "@/components/AddReviewForm";
import {Ticket} from "@/components/Ticket";
import {cn} from "@/lib/utils";
import {useFavorites} from "@/context/favorite-context";
import {useAuth} from "@/context/auth-context";
import {TicketType} from "@/models/ticket-type.model";
import {CheckoutModal} from "@/components/CheckoutModal";
import {Card} from "@/components/ui/card";
import {EventStatus} from "@/shared/enums/event-status.enum";
import {UserRole} from "@/shared/enums/user-role.enum";
import {EVENT_STATUS_STYLES} from "@/shared/constants/event-status-ui";
import {AlertMessage} from "@/components/AlertMessage";
import {ReviewData} from "@/models/review-data.model";
import {EventInfoItem} from "@/components/EventInfoItem";


export default function EventDetailsPage() {
	const {id} = useParams();
	const [event, setEvent] = useState<Event | null>(null);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showCancelModal, setShowCancelModal] = useState(false);
	const router = useRouter();
	const eventId = Array.isArray(id) ? id[0] : id;

	const [reviewsData, setReviewsData] = useState<ReviewData>({
		reviews: [],
		averageRating: 0,
		starsCount: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0},
	});

	const {isFavorite, toggleFavorite, loading: loadingFavorite} = useFavorites();
	const {user} = useAuth();
	const isVisitor = user?.roles?.some(role => role.name === UserRole.VISITOR);
	const isAdmin = user?.roles?.some(role => role.name === UserRole.ADMIN);
	const isOrganizer = user?.roles?.some(role => role.name === UserRole.ORGANIZER);
	const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
	const [selectedTicket, setSelectedTicket] = useState<TicketType | null>(null);
	const pathname = usePathname();

	const handleBuyClick = (ticket: TicketType) => {
		if (!user)
			router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
		if (!isVisitor) {
			toast.error("Kupovina ulaznica je omogućena samo posjetiocima.");
			return;
		}
		setSelectedTicket(ticket);
		setIsCheckoutOpen(true);
	};

	const handleToggleFavorite = async () => {
		if (!user) {
			const currentPath = window.location.pathname;
			router.push(`/login?redirect=${encodeURIComponent(currentPath)}`);
			return;
		}
		await toggleFavorite(Number(eventId));
	};


	const getStarPercentage = (star: number) => {
		const count = reviewsData.starsCount[star] || 0;
		return reviewsData.reviews.length ? (count / reviewsData.reviews.length) * 100 : 0;
	};

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
				setReviewsData(response);
				console.log(response);
			} catch (e) {
				console.error(e);
			}
		}
		fetchEvent();
		fetchReviews();
	}, [id])

	const refreshData = async () => {
		if (!eventId) return;
		try {
			const response = await EventService.getEvent(eventId);
			setEvent(response);
		} catch (e) {
			console.error(e);
		}
	};

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

	const handleCancel = async () => {
		if (!eventId) return;
		try {
			await EventService.cancelEvent(eventId);
			toast.success("Događaj uspješno otkazan!")
		} catch (e) {
			console.error(e);
			toast.error("Greška prilikom otkazivanja događaja!")
		} finally {
			router.back();
		}
	}

	const refreshReviews = async () => {
		try {
			const response = await ReviewsService.getReviewsByEventId(Number(id));
			setReviewsData(response);
		} catch (e) {
			console.error(e);
		}
	};


	if (!event) return null;

	const hasAlreadyReviewed = reviewsData.reviews.some(r => r.user.id === user?.id);
	const hasStarted = new Date() > new Date(event.startDate);

	const now = new Date();
	const eventEndTime = event.endDate ? new Date(event.endDate) : new Date(event.startDate);
	const isExpired = now > eventEndTime;

	return (
		<div className="min-h-screen bg-[#FDFDFF]">
			<section className="relative h-[300px] md:h-[500px] w-full overflow-hidden bg-slate-900">
				<img
					src={`${process.env.NEXT_PUBLIC_API_BASE_URL}public/${event.imageUrl}`}
					className="w-full h-full object-cover opacity-60"
					alt={event.title}
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent"/>

				<div className="absolute top-0 left-0 w-full z-20">
					<div className="container mx-auto px-4 py-4 md:py-6 flex justify-between items-center">
						<Button onClick={() => router.back()} variant="ghost"
								className="text-white hover:bg-white/10 gap-2 font-bold px-2 md:px-4">
							<ChevronLeft className="w-5 h-5"/> <span className="hidden sm:inline">Nazad</span>
						</Button>
						<div className="flex gap-2 md:gap-3">
							{isAdmin &&
                                <Button variant="outline" size="icon"
                                        className="rounded-full bg-white/10 border-white/20 text-white hover:bg-red-500 hover:text-white transition-all w-9 h-9 md:w-11 md:h-11"
                                        onClick={() => setShowDeleteModal(true)}>
                                    <Trash className="w-4 h-4 md:w-5 md:h-5"/>
                                </Button>
							}
							{isOrganizer && event.status !== EventStatus.OTKAZAN && (
								<Button variant="outline"
										className="rounded-full bg-white/10 border-white/20 text-white hover:bg-red-500 hover:text-white transition-all"
										onClick={() => setShowCancelModal(true)}>
									Otkaži događaj
								</Button>
							)}

							<Button
								size="icon"
								variant="secondary"
								onClick={handleToggleFavorite}
								className={cn("rounded-full shadow-lg transition-all w-9 h-9 md:w-11 md:h-11", isFavorite(Number(eventId)) ? "bg-white text-red-500" : "bg-white/10 border-white/20 text-white")}
							>
								<Heart
									className={cn("w-4 h-4 md:w-5 md:h-5", isFavorite(Number(eventId)) && "fill-current")}/>
							</Button>
						</div>
					</div>
				</div>

				<div className="absolute bottom-12 md:bottom-20 w-full z-10 px-4">
					<div className="container mx-auto">
						<div className="max-w-4xl space-y-4 md:space-y-6">
							<div className="flex items-center gap-3">
								<Badge
									className="bg-indigo-600 text-white border-none px-4 py-1 font-black uppercase tracking-widest text-[10px]">
									{event.eventSubcategory.eventCategory.name}
								</Badge>
								<div className="h-[1px] w-8 md:w-12 bg-white/30"/>
								<span
									className="text-white/80 text-[10px] md:text-xs font-bold uppercase tracking-widest truncate">
									{event.organizer?.displayName}
								</span>
							</div>
							<h1 className="text-3xl md:text-6xl font-black text-white leading-[1.1] tracking-tighter uppercase italic drop-shadow-2xl">
								{event.title}
							</h1>
						</div>
					</div>
				</div>
			</section>

			<div className="container mx-auto px-4 relative z-30 -mt-8 md:-mt-10">
				<Card
					className="p-2 md:p-4 rounded-[1.5rem] md:rounded-[2rem] border-none shadow-2xl bg-white overflow-hidden">
					<div
						className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
						<EventInfoItem
							icon={<Calendar className="w-5 h-5 md:w-6 md:h-6"/>}
							label="Datum"
							value={DateTimeHelper.formatOnlyDate(event.startDate)}
							variant="default"
						/>
						<EventInfoItem
							icon={<Clock className="w-5 h-5 md:w-6 md:h-6"/>}
							label="Vrijeme"
							value={`${DateTimeHelper.formatOnlyTime(event.startDate)} h`}
							variant="success"
						/>
						<EventInfoItem
							icon={<MapPin className="w-5 h-5 md:w-6 md:h-6"/>}
							label="Lokacija"
							value={event.venue.name}
							variant="error"
						/>
					</div>
				</Card>
			</div>

			<main className="container mx-auto px-4 py-12 md:py-20">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16">

					<div className="lg:col-span-8 space-y-12 md:space-y-16">
						<section className="space-y-6">
							<div className="flex items-center gap-3">
								<div className="w-1.5 h-8 bg-indigo-600 rounded-full"/>
								<h2 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight">O
									događaju</h2>
							</div>
							<Badge className={cn(
								"border-none px-4 py-1 font-black uppercase tracking-widest text-[10px] shadow-lg",
								EVENT_STATUS_STYLES[event.status].color
							)}>
								{EVENT_STATUS_STYLES[event.status].label}
							</Badge>
							<p className="text-slate-600 text-base md:text-xl leading-relaxed font-light text-justify">
								{event.description}
							</p>
						</section>

						<section
							className="p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] bg-slate-50 border border-slate-100 space-y-8">
							<div className="flex items-center justify-between">
								<h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight">Detalji</h2>
								<ShieldCheck className="hidden sm:block w-8 h-8 text-indigo-600 opacity-20"/>
							</div>
							<div className="w-full overflow-hidden">
								<EventMetadataComponent metadata={event.metadata}/>
							</div>
						</section>

						<section className="space-y-10 pt-10 border-t border-slate-100">
							<div className="flex items-center justify-between">
								<h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
									<MessageSquare className="w-6 h-6 md:w-8 md:h-8 text-indigo-600"/>
									Utisci posjetilaca
								</h2>
								<Badge
									className="bg-slate-900 text-white rounded-lg px-3">{reviewsData.reviews.length}</Badge>
							</div>

							<div
								className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-slate-50/50 p-8 rounded-[2.5rem] border border-slate-100">
								<div
									className="md:col-span-4 text-center md:text-left space-y-2 border-r-0 md:border-r border-slate-200">
									<h3 className="text-6xl font-black text-slate-900 tracking-tighter">
										{reviewsData.averageRating ? reviewsData.averageRating.toFixed(1) : "0.0"}
									</h3>
									<div className="flex justify-center md:justify-start gap-1 text-yellow-400">
										{[...Array(5)].map((_, i) => (
											<Star
												key={i}
												className={cn(
													"w-5 h-5",
													i < Math.round(reviewsData.averageRating) ? "fill-current" : "text-slate-200"
												)}
											/>
										))}
									</div>
									<p className="text-slate-400 text-xs font-bold uppercase tracking-widest pt-2">
										Ostavljeno {reviewsData.reviews.length} ocjena
									</p>
								</div>

								<div className="md:col-span-8 space-y-3">
									{[5, 4, 3, 2, 1].map((star) => (
										<div key={star}
											 className="flex items-center gap-4 text-sm font-bold text-slate-500">
											<span className="w-4">{star}</span>
											<Star className="w-3 h-3 fill-slate-300 text-slate-300"/>
											<div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
												<div
													className="h-full bg-indigo-600 rounded-full transition-all duration-1000"
													style={{width: `${getStarPercentage(star)}%`}}
												/>
											</div>
											<span className="w-10 text-right text-[10px] text-slate-400">
												{Math.round(getStarPercentage(star))}%
											</span>
										</div>
									))}
								</div>
							</div>
							<div className="grid grid-cols-1 gap-6">
								{reviewsData.reviews.length > 0 ? (
									reviewsData.reviews.map((review) => <ReviewItem key={review.id} review={review}/>)
								) : (
									hasStarted && (
										<p className="text-slate-400 italic text-center py-10 border-2 border-dashed rounded-[2rem]">
											Još uvijek nema komentara. Budite prvi koji će ostaviti utisak!
										</p>
									)
								)}
							</div>

							{isVisitor && hasStarted && !hasAlreadyReviewed && event.status !== EventStatus.OTKAZAN ? (
								<AddReviewForm eventId={Number(eventId)} onReviewAdded={refreshReviews}/>
							) : isVisitor && event.status === EventStatus.OTKAZAN ? (
								<AlertMessage
									variant="error"
									description="Ne možete ostaviti recenziju jer je događaj otkazan."
								/>
							) : isVisitor && !hasStarted ? (
								<AlertMessage
									variant="warning"
									description="Ostavljanje recenzija će biti dostupno nakon početka događaja."
								/>
							) : hasAlreadyReviewed ? (
								<AlertMessage
									variant="success"
									description="Hvala vam što ste podijelili svoje mišljenje!"
								/>
							) : !user ? (
								<div
									className="p-10 rounded-[2.5rem] bg-indigo-600 text-white text-center shadow-xl shadow-indigo-100 relative overflow-hidden group">
									<div
										className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10"/>
									<h4 className="text-xl font-black mb-2 uppercase italic">Vaše iskustvo nam je
										bitno</h4>
									<p className="text-indigo-100 mb-6 text-sm">Prijavite se kao posjetilac da biste
										ocijenili događaje.</p>
									<Button
										onClick={() => router.push(`/login?redirect=${encodeURIComponent(pathname)}`)}
										className="bg-white text-indigo-600 hover:bg-slate-50 font-black px-10 rounded-xl uppercase tracking-widest text-xs"
									>
										Prijavite se
									</Button>
								</div>
							) : null}
						</section>
					</div>

					<div className="lg:col-span-4">
						<aside className="lg:sticky lg:top-28 space-y-6">
							<h2 className="text-lg md:text-xl font-black text-slate-900 uppercase tracking-widest justify-center">
								Ulaznice</h2>
							{event.ticketTypes && event.ticketTypes.length > 0 ? (
								<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
									{event.ticketTypes.map(ticketType => (
										<Ticket
											key={ticketType.id}
											ticketType={ticketType}
											onBuy={handleBuyClick}
											isExpired={isExpired}
											isCancelled={event.status === EventStatus.OTKAZAN}
											isSoldOut={ticketType.soldQuantity >= ticketType.totalQuantity}
										/>
									))}
								</div>
							) : (
								<Card className="p-8 rounded-[2rem] bg-indigo-600 text-white text-center shadow-2xl">
									<p className="font-black text-xl italic uppercase tracking-tighter">Ulaz
										slobodan</p>
								</Card>
							)}
						</aside>
					</div>
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
			<ConfirmDialog
				open={showCancelModal}
				title="Želite li da otkažete ovaj događaj?"
				description="Nakon što otkažete događaj nećete ga moći ponovo aktivirati."
				confirmText="Otkaži"
				cancelText="Odustani"
				confirmColor="bg-red-600 hover:bg-red-700"
				onConfirm={handleCancel}
				onCancel={() => setShowCancelModal(false)}
			/>
			{selectedTicket && (
				<CheckoutModal
					isOpen={isCheckoutOpen}
					onClose={() => setIsCheckoutOpen(false)}
					ticketType={selectedTicket}
					eventId={Number(eventId)}
					onSuccess={() => {
						setIsCheckoutOpen(false);
						refreshData();
					}}
				/>
			)}
		</div>
	);
}