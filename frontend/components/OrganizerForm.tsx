"use client"

import React from 'react';
import {Form, Formik} from "formik";
import {organizerSchema} from '@/schemas/organizer.schema';
import {Card} from "@/components/ui/card";
import {InputField} from "@/components/InputField";
import {LoadingButton} from "@/components/LoadingButton";
import {
	Briefcase,
	Lock,
	Mail,
	Phone,
	UserCircle,
	AlignLeft,
	ShieldCheck
} from 'lucide-react';
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import {OrganizersService} from "@/services/organizers.service";

export function OrganizerForm() {
	const router = useRouter();

	return (
		<div className="min-h-screen bg-slate-50/50 py-12 px-4">
			<div className="max-w-4xl mx-auto space-y-8">
				<div className="flex items-center gap-4">
					<div className="bg-indigo-600 p-3 rounded-2xl shadow-lg shadow-indigo-200">
						<Briefcase className="w-8 h-8 text-white"/>
					</div>
					<div>
						<h1 className="text-3xl font-black text-slate-900 tracking-tight">Novi Organizator</h1>
						<p className="text-slate-500">Kreirajte nalog za kompaniju ili pojedinca koji organizuje
							događaje.</p>
					</div>
				</div>

				<Formik
					initialValues={{
						email: '',
						password: '',
						displayName: '',
						description: '',
						contactEmail: undefined,
						phone: '',
					}}
					validationSchema={organizerSchema}
					onSubmit={async (values) => {
						try {
							await OrganizersService.createOrganizer(values);
							toast.success("Organizator uspješno kreiran!");
							router.push("/users");
						} catch (e) {
							console.error(e);
							toast.error("Greška prilikom kreiranja organizatora.");
						}
					}}
				>
					{({isSubmitting}) => (
						<Form className="space-y-8">

							<Card className="p-8 rounded-[2rem] border-none shadow-xl shadow-slate-200/40 bg-white">
								<div className="flex items-center gap-3 mb-8">
									<div className="p-2 bg-indigo-50 rounded-xl text-indigo-600">
										<ShieldCheck className="w-5 h-5"/>
									</div>
									<h2 className="text-xl font-bold text-slate-800">Podaci za prijavu</h2>
								</div>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<InputField
										name="email"
										label="Email naloga"
										placeholder="organizator@email.com"
										labelIcon={<Mail className="w-4 h-4 text-slate-400"/>}
									/>
									<InputField
										name="password"
										label="Lozinka"
										type="password"
										placeholder="••••••••"
										labelIcon={<Lock className="w-4 h-4 text-slate-400"/>}
									/>
								</div>
								<p className="mt-4 text-xs text-slate-400 italic">
									* Ovi podaci će se koristiti za pristup administratorskom panelu.
								</p>
							</Card>

							<Card className="p-8 rounded-[2rem] border-none shadow-xl shadow-slate-200/40 bg-white">
								<div className="flex items-center gap-3 mb-8">
									<div className="p-2 bg-indigo-50 rounded-xl text-indigo-600">
										<UserCircle className="w-5 h-5"/>
									</div>
									<h2 className="text-xl font-bold text-slate-800">Javni profil organizatora</h2>
								</div>

								<div className="space-y-6">
									<InputField
										name="displayName"
										label="Naziv organizacije / Ime"
										placeholder="npr. SkyMusic Entertainment"
										className="h-12 text-lg font-semibold"
									/>

									<InputField
										as="textarea"
										name="description"
										label="Opis (Biografija)"
										placeholder="Kratak opis organizatora i dosadašnjih projekata..."
										className="min-h-[120px] resize-none"
										labelIcon={<AlignLeft className="w-4 h-4 text-slate-400"/>}
									/>

									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
										<InputField
											name="contactEmail"
											label="Javni email za kontakt"
											placeholder="info@organizacija.com"
											labelIcon={<Mail className="w-4 h-4 text-slate-400"/>}
										/>
										<InputField
											name="phone"
											label="Kontakt telefon"
											placeholder="+387 6x xxx xxx"
											labelIcon={<Phone className="w-4 h-4 text-slate-400"/>}
										/>
									</div>
								</div>
							</Card>

							<div className="flex justify-end pt-4">
								<LoadingButton
									type="submit"
									loading={isSubmitting}
									className="w-full md:w-[280px] h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-lg shadow-xl shadow-indigo-200 transition-all active:scale-95"
								>
									KREIRAJ PROFIL
								</LoadingButton>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
}