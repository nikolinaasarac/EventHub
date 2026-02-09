import {checkoutSchema} from "@/schemas/checkout.schema";
import {toast} from "sonner";
import {ErrorMessage, Form, Formik} from "formik";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {CreditCard, ShieldCheck} from "lucide-react";
import {LoadingButton} from "@/components/LoadingButton";
import React from "react";
import {TicketType} from "@/models/ticket-type.model";
import TicketsService from "@/services/tickets.service";

interface Props {
	ticketType: TicketType;
	quantity: number;
	eventId: number;
}

export function CheckoutForm({ticketType, quantity, eventId}: Props) {

	return (
		<Formik
			initialValues={{
				firstName: '',
				lastName: '',
				cardNumber: '',
				expiry: '',
				cvv: ''
			}}
			validationSchema={checkoutSchema}
			onSubmit={async (values) => {
				try {
					const payload = {
						eventId: eventId,
						ticketTypeId: ticketType.id,
						quantity: quantity,
					};
					console.log('Payload type check:', payload, {
						eventId: typeof payload.eventId,
						ticketTypeId: typeof payload.ticketTypeId,
						quantity: typeof payload.quantity
					});

					await TicketsService.buyTickets(payload);
					toast.success("Uspješna kupovina! Provjerite vaš email.");
				} catch (error) {
					console.error(error);
					toast.error("Greška prilikom kupovine karata!");
				}
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
	)
}