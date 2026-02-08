"use client"

import React, {useState} from 'react';
import {Formik, Form, ErrorMessage} from "formik";
import * as yup from 'yup';
import {
	Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Separator} from "@/components/ui/separator";
import {LoadingButton} from "@/components/LoadingButton";
import {Minus, Plus, CreditCard, ShieldCheck} from "lucide-react";
import {toast} from "sonner";
import {Badge} from "@/components/ui/badge";


// Validaciona šema
const checkoutSchema = yup.object({
	firstName: yup.string().required("Ime je obavezno"),
	lastName: yup.string().required("Prezime je obavezno"),
	email: yup.string().email("Neispravan email").required("Email je obavezan"),
	cardNumber: yup.string().matches(/^[0-9]{16}$/, "Broj kartice mora imati 16 cifara").required("Obavezno"),
	expiry: yup.string().matches(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, "MM/GG").required("Obavezno"),
	cvv: yup.string().matches(/^[0-9]{3,4}$/, "3-4 cifre").required("Obavezno"),
});

interface Props {
	isOpen: boolean;
	onClose: () => void;
	ticketType: {
		name: string;
		price: number;
	};
}

export function CheckoutModal({isOpen, onClose, ticketType}: Props) {
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
							<DialogDescription>Unesite vaše podatke za isporuku digitalne karte.</DialogDescription>
						</DialogHeader>

						<Formik
							initialValues={{
								firstName: '',
								lastName: '',
								email: '',
								cardNumber: '',
								expiry: '',
								cvv: ''
							}}
							validationSchema={checkoutSchema}
							onSubmit={async (values) => {
								console.log("Podaci za naplatu:", {...values, quantity, totalPrice});
								await new Promise(resolve => setTimeout(resolve, 2000));
								toast.success("Uspješna kupovina! Provjerite vaš email.");
								onClose();
							}}
						>
							{({isSubmitting, handleChange, values}) => (
								<Form className="space-y-5">
									<div className="grid grid-cols-2 gap-4">
										<div className="space-y-1">
											<Label
												className="text-[10px] uppercase font-bold text-slate-400">Ime</Label>
											<Input name="firstName" onChange={handleChange} className="rounded-xl"
												   placeholder="Nikola"/>
											<div className="text-red-500 text-sm h-1">
												<ErrorMessage
													name={"firstName"}
													component="p"
													className="text-red-500 text-[10px]"
												/>
											</div>
										</div>
										<div className="space-y-1">
											<Label
												className="text-[10px] uppercase font-bold text-slate-400">Prezime</Label>
											<Input name="lastName" onChange={handleChange} className="rounded-xl"
												   placeholder="Nikolić"/>
											<div className="text-red-500 text-sm h-1">
												<ErrorMessage
													name={"lastName"}
													component="p"
													className="text-red-500 text-[10px]"
												/>
											</div>
										</div>
									</div>

									<div className="space-y-1">
										<Label className="text-[10px] uppercase font-bold text-slate-400">Email za
											dostavu</Label>
										<Input name="email" type="email" onChange={handleChange} className="rounded-xl"
											   placeholder="ime@email.com"/>
										<div className="text-red-500 text-sm h-1">
											<ErrorMessage
												name={"email"}
												component="p"
												className="text-red-500 text-[10px]"
											/>
										</div>
									</div>

									<div className="pt-2">
										<Label className="text-[10px] uppercase font-bold text-slate-400 mb-2 block">Podaci
											o kartici</Label>
										<div className="space-y-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
											<div className="relative">
												<CreditCard
													className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"/>
												<Input name="cardNumber" onChange={handleChange}
													   className="pl-10 bg-white" placeholder="1234 5678 1234 5678"/>
											</div>
											<div className="grid grid-cols-2 gap-3">
												<Input name="expiry" onChange={handleChange} className="bg-white"
													   placeholder="MM/GG"/>
												<Input name="cvv" onChange={handleChange} className="bg-white"
													   placeholder="CVV"/>
											</div>
										</div>
										<div className="text-red-500 text-sm h-2">
											<ErrorMessage
												name={"cardNumber"}
												component="p"
												className="text-red-500 text-[10px]"
											/>
											<ErrorMessage
												name={"expiry"}
												component="p"
												className="text-red-500 text-[10px]"
											/>
										</div>
									</div>

									<div className="pt-4">
										<LoadingButton
											type="submit"
											loading={isSubmitting}
											className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 text-lg font-bold rounded-2xl shadow-xl shadow-indigo-100"
										>
											POTVRDI KUPOVINU
										</LoadingButton>
										<div className="flex items-center justify-center gap-2 mt-4 text-slate-400">
											<ShieldCheck className="w-4 h-4"/>
											<span className="text-[10px] font-bold uppercase tracking-widest">Sigurna enkriptovana naplata</span>
										</div>
									</div>
								</Form>
							)}
						</Formik>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}