"use client"

import React, {useState} from 'react';
import {
	Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Separator} from "@/components/ui/separator";
import {Minus, Plus} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import {CheckoutForm} from "@/components/CheckoutForm";
import {TicketType} from "@/models/ticket-type.model";

interface Props {
	isOpen: boolean;
	onClose: () => void;
	ticketType: TicketType
	eventId: number
	onSuccess: () => void;
}

export function CheckoutModal({isOpen, onClose, ticketType, eventId, onSuccess}: Props) {
	const [quantity, setQuantity] = useState(1);
	const totalPrice = ticketType.price * quantity;

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="max-w-2xl p-0 overflow-hidden border-none rounded-[2rem] bg-white shadow-2xl">
				<div className="grid grid-cols-1 md:grid-cols-5 h-full">

					<div className="md:col-span-2 bg-indigo-600 p-8 text-white flex flex-col justify-between">
						<div>
							<Badge className="bg-white/20 text-white border-none mb-4">Pregled narudžbe</Badge>
							<h3 className="text-2xl font-black mb-1">{ticketType.name}</h3>
							<p className="text-indigo-100 text-sm italic">Cijena jedne karte: {ticketType.price} KM</p>
							<p className="text-indigo-100 text-sm italic">Preostalo: {ticketType.totalQuantity - ticketType.soldQuantity}</p>
						</div>

						<div className="space-y-6">
							<div className="space-y-3">
								<Label
									className="text-xs font-bold uppercase tracking-widest text-indigo-200">Količina</Label>
								<div
									className="flex items-center gap-4 bg-white/10 p-2 rounded-2xl border border-white/10">
									<Button
										type="button"
										variant="ghost"
										size="icon"
										className="text-white hover:bg-white/20 h-10 w-10"
										onClick={() => setQuantity(Math.max(1, quantity - 1))}
									>
										<Minus className="w-4 h-4"/>
									</Button>
									<span className="text-xl font-bold flex-1 text-center">{quantity}</span>
									<Button
										type="button"
										variant="ghost"
										size="icon"
										className="text-white hover:bg-white/20 h-10 w-10"
										onClick={() => setQuantity(quantity + 1)}
									>
										<Plus className="w-4 h-4"/>
									</Button>
								</div>
							</div>

							<Separator className="bg-white/10"/>

							<div className="pt-2">
								<p className="text-xs text-indigo-200 uppercase font-bold tracking-widest">Ukupno za
									uplatu</p>
								<div className="text-5xl font-black mt-1">
									{totalPrice}<span className="text-lg ml-1 font-bold">KM</span>
								</div>
							</div>
						</div>
					</div>

					<div className="md:col-span-3 p-8">
						<DialogHeader className="mb-6">
							<DialogTitle className="text-2xl font-black text-slate-900">Plaćanje</DialogTitle>
							<DialogDescription>Unesite vaše podatke.</DialogDescription>
						</DialogHeader>
						<CheckoutForm ticketType={ticketType} quantity={quantity} eventId={eventId} onSuccess={onSuccess}/>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}