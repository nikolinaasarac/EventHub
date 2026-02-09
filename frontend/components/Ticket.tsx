"use client"

import {Button} from "@/components/ui/button";
import React, {useState} from "react";
import {Ticket as TicketIcon, Zap} from "lucide-react";
import {CheckoutModal} from "@/components/CheckoutModal";
import {TicketType} from "@/models/ticket-type.model";

interface Props {
	ticketType: TicketType
	eventId: number
}

export function Ticket({ticketType, eventId}: Props) {
	const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
	return (
		<div className="group relative w-full max-w-sm mx-auto transition-all duration-300 hover:-translate-y-2">
			<div
				className="relative overflow-hidden bg-white rounded-3xl border border-slate-200 shadow-xl group-hover:shadow-indigo-200/50 transition-all border-b-4 border-b-indigo-600">

				<div className="p-6 pb-4 bg-slate-50/50">
					<div className="flex justify-between items-start mb-4">
						<div className="p-2 bg-indigo-600 rounded-lg shadow-lg shadow-indigo-200">
							<TicketIcon className="w-5 h-5 text-white"/>
						</div>
						<div className="flex flex-col items-end">
							<span
								className="text-[10px] font-black text-indigo-600 uppercase tracking-widest bg-indigo-50 px-2 py-1 rounded">
								Ulaznica
							</span>
						</div>
					</div>
					<h3 className="text-2xl font-black text-slate-900 leading-tight">
						{ticketType.name}
					</h3>
					<p className="text-slate-400 text-xs mt-1 font-medium italic">
						Pristup odabranim zonama događaja
					</p>
				</div>

				<div className="relative flex items-center px-2 py-2">
					<div
						className="absolute -left-3 w-6 h-6 bg-white border border-slate-200 rounded-full z-10 shadow-inner"/>
					<div className="w-full border-t-2 border-dashed border-slate-200"/>
					<div
						className="absolute -right-3 w-6 h-6 bg-white border border-slate-200 rounded-full z-10 shadow-inner"/>
				</div>

				<div className="p-6 pt-4 space-y-6">
					<div className="flex flex-col items-center text-center">
						<span
							className="text-slate-400 text-[10px] font-bold uppercase tracking-tighter">Ukupna cijena</span>
						<div className="flex items-baseline gap-1">
							<span className="text-4xl font-black text-slate-900">{ticketType.price}</span>
							<span className="text-xl font-bold text-indigo-600 uppercase">KM</span>
						</div>
					</div>

					<Button
						onClick={() => setIsCheckoutOpen(true)}
						className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 text-lg font-black rounded-2xl shadow-lg shadow-indigo-200 transition-all group-hover:scale-[1.02] flex gap-2"
					>
						<Zap className="w-5 h-5 fill-white"/>
						KUPI KARTU
					</Button>
					<p className="text-[10px] text-center text-slate-400 font-medium">
						* Instant digitalna isporuka na e-mail
					</p>
				</div>

				<div
					className="absolute -bottom-10 -right-10 w-32 h-32 bg-indigo-50 rounded-full opacity-50 blur-3xl pointer-events-none group-hover:bg-indigo-100 transition-colors"/>
			</div>
			<CheckoutModal
				isOpen={isCheckoutOpen}
				onClose={() => setIsCheckoutOpen(false)}
				ticketType={ticketType}
				eventId={eventId}
			/>
		</div>
	);
}