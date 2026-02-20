"use client"

import {Button} from "@/components/ui/button";
import React from "react";
import {Ticket as TicketIcon, Zap, Clock, Ban} from "lucide-react";
import {TicketType} from "@/models/ticket-type.model";
import {cn} from "@/lib/utils";

interface Props {
	ticketType: TicketType
	isExpired?: boolean;
	isSoldOut?: boolean;
	onBuy: (ticket: TicketType) => void;
}

export function Ticket({ticketType, isExpired = false, isSoldOut = false, onBuy}: Props) {

	const isDisabled = isExpired || isSoldOut;

	return (
		<div className={cn(
			"group relative w-full max-w-sm mx-auto transition-all duration-300",
			!isDisabled && "hover:-translate-y-2"
		)}>

			{isSoldOut && !isExpired && (
				<div
					className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none overflow-hidden rounded-3xl">
					<div
						className="border-8 border-red-500/80 px-6 py-2 rounded-2xl rotate-[-25deg] scale-125 bg-white/10 backdrop-blur-[1px]">
                        <span className="text-4xl font-black text-red-500/90 tracking-tighter uppercase italic">
                            RASPRODANO
                        </span>
					</div>
				</div>
			)}

			<div
				className={cn(
					"relative overflow-hidden bg-white rounded-3xl border border-slate-200 shadow-xl transition-all border-b-4",
					isExpired && "grayscale opacity-70 border-b-slate-400",
					isSoldOut && !isExpired && "opacity-90 border-b-red-500 shadow-none",
					!isDisabled && "group-hover:shadow-indigo-200/50 border-b-indigo-600"
				)}>

				<div className="p-6 pb-4 bg-slate-50/50">
					<div className="flex justify-between items-start mb-4">
						<div className={cn(
							"p-2 rounded-lg shadow-lg",
							isExpired ? "bg-slate-400" : isSoldOut ? "bg-red-500 shadow-red-200" : "bg-indigo-600 shadow-indigo-200"
						)}>
							<TicketIcon className="w-5 h-5 text-white"/>
						</div>
						<div className="flex flex-col items-end">
							<span
								className={cn(
									"text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded",
									isExpired ? "bg-slate-200 text-slate-500" :
										isSoldOut ? "bg-red-50 text-red-600" : "bg-indigo-50 text-indigo-600"
								)}>
								{isExpired ? "Završeno" : isSoldOut ? "Nema zaliha" : "Dostupno"}
							</span>
						</div>
					</div>
					<h3 className="text-2xl font-black text-slate-900 leading-tight">
						{ticketType.name}
					</h3>
					<p className="text-slate-400 text-xs mt-1 font-medium italic">
						{isExpired ? "Događaj je prošao" : isSoldOut ? "Sva mjesta su popunjena" : "Pristup odabranim zonama"}
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
						<span className="text-slate-400 text-[10px] font-bold uppercase tracking-tighter">
                            Cijena
                        </span>
						<div className="flex items-baseline gap-1">
							<span className={cn(
								"text-4xl font-black",
								isSoldOut && !isExpired ? "text-red-500/50" : "text-slate-900"
							)}>{ticketType.price}</span>
							<span className={cn(
								"text-xl font-bold uppercase",
								isExpired ? "text-slate-400" : isSoldOut ? "text-red-400" : "text-indigo-600"
							)}>KM</span>
						</div>
					</div>

					<Button
						disabled={isDisabled}
						onClick={() => onBuy(ticketType)}
						className={cn(
							"w-full h-14 text-lg font-black rounded-2xl shadow-lg transition-all flex gap-2",
							isExpired && "bg-slate-200 text-slate-500 cursor-not-allowed",
							isSoldOut && !isExpired && "bg-red-50 text-red-500 border-2 border-red-100 hover:bg-red-50 cursor-not-allowed shadow-none",
							!isDisabled && "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-100 group-hover:scale-[1.02]"
						)}
					>
						{isExpired ? (
							<> <Clock className="w-5 h-5"/> ZAVRŠENO </>
						) : isSoldOut ? (
							<> <Ban className="w-5 h-5"/></>
						) : (
							<> <Zap className="w-5 h-5 fill-white"/> KUPI KARTU </>
						)}
					</Button>
				</div>
			</div>
		</div>
	);
}