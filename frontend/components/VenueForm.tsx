"use client"

import React, {useEffect, useState} from 'react';
import {Form, Formik, ErrorMessage} from "formik";
import {venueSchema} from '@/schemas/venue.schema';
import {Label} from "@/components/ui/label";
import {Card} from "@/components/ui/card";
import {ImagePlus, MapPin, Globe, Instagram, Facebook, Phone, Mail, X} from 'lucide-react';
import dynamic from 'next/dynamic';
import {InputField} from "@/components/InputField";
import {SelectBox} from "@/components/SelectBox";
import {City} from "@/models/city.model";
import {VenueType} from "@/models/venue-type.model";
import CitiesService from "@/services/cities.service";
import VenueTypesService from "@/services/venue-types.service";
import VenueService from "@/services/venue.service";
import {CreateVenueDto} from "@/models/dto/create-venue.dto";
import {LoadingButton} from "@/components/LoadingButton";
import {Field} from "@/components/ui/field";

const MapPicker = dynamic(() => import("./MapPicker").then(mod => mod.MapPicker), {ssr: false});

export function VenueForm({}: React.ComponentProps<"form">) {
	const [imagePreview, setImagePreview] = useState<string | null>(null);
	const [cities, setCities] = useState<City[]>([]);
	const [venueTypes, setVenueTypes] = useState<VenueType[]>([])

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, setFieldValue: any) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				const url = reader.result as string;
				setImagePreview(url);
				setFieldValue("imageUrl", file.name);
			};
			reader.readAsDataURL(file);
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [citiesRes, venueTypesRes] = await Promise.all([CitiesService.getCities(), VenueTypesService.getVenueTypes()]);
				setVenueTypes(venueTypesRes);
				setCities(citiesRes);
			} catch (e) {
				console.error(e);
			}
		}
		fetchData();
	}, []);

	return (
		<div className="min-h-screen bg-slate-50/50 py-12 px-4">
			<div className="max-w-4xl mx-auto space-y-8">
				<div>
					<h1 className="text-3xl font-black text-slate-900">Nova lokacija</h1>
					<p className="text-slate-500">Unesite podatke o novoj lokaciji.</p>
				</div>

				<Formik
					initialValues={{
						name: '',
						description: '',
						address: '',
						cityId: undefined,
						venueTypeId: undefined,
						latitude: undefined,
						longitude: undefined,
						capacity: "",
						imageUrl: 'No image',
						phone: '',
						email: '',
						websiteUrl: '',
						instagram: '',
						facebook: ''
					}}
					validationSchema={venueSchema}
					onSubmit={async (values) => {
						console.log("Finalni podaci:", values)
						try {
							await VenueService.createVenue(values as CreateVenueDto)
						} catch (e) {
							console.error(e);
						}
					}}
				>
					{({isSubmitting, errors, setFieldValue, values}) => (
						<Form className="space-y-8">

							<Card className="p-8 rounded-[2rem] border-none shadow-xl shadow-slate-200/50">
								<div className="grid grid-cols-1 md:grid-cols-12 gap-10">
									<div className="md:col-span-4 space-y-4">

										<Label className="text-xs font-bold uppercase tracking-wider text-slate-400">Slika
											objekta</Label>
										<div
											className="relative group aspect-square rounded-[2rem] border-2 border-dashed border-slate-200 bg-slate-50 flex items-center justify-center overflow-hidden transition-all hover:border-indigo-400">
											{imagePreview ? (
												<>
													<img src={imagePreview} className="w-full h-full object-cover"
														 alt="Preview"/>
													<button
														type="button"
														onClick={() => setImagePreview(null)}
														className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full text-red-500 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
													>
														<X className="w-4 h-4"/>
													</button>
												</>
											) : (
												<div className="text-center p-4">
													<ImagePlus className="w-10 h-10 text-slate-300 mx-auto mb-2"/>
													<span className="text-xs text-slate-400 font-medium italic">Klikni za odabir slike</span>
												</div>
											)}
											<input
												type="file"
												accept="image/*"
												className="absolute inset-0 opacity-0 cursor-pointer"
												onChange={(e) => handleImageChange(e, setFieldValue)}
											/>
										</div>
										<div className="text-[10px] text-red-500 italic"><ErrorMessage name="imageUrl"/>
										</div>
									</div>

									<InputField
										name="name"
										label="Naziv lokacije"
										placeholder="Unesite naziv lokacije..."
										type="text"
									/>
									<div className="space-y-2">
										<InputField
											as="textarea"
											name="description"
											label="Opis lokacije"
											placeholder="Unesite opis lokacije..."
											className="w-full h-[240px] border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 outline-none"
										/>
									</div>
									<div className="flex flex-col md:flex-row gap-4 md:gap-8 items-start justify-between md:justify-start">
										<div className="space-y-2">
											<Label className="mb-2 font-medium flex items-center gap-2">Grad</Label>
											<SelectBox
												name="cityId"
												options={cities.map(c => ({
													key: c.id,
													value: c.id,
													label: c.name,
												}))}
												value={values.cityId || null}
												setFieldValue={setFieldValue}
												placeholder="Izaberite grad"
											/>
											<div className="text-red-500 text-sm h-2">
												<ErrorMessage
													name="cityId"
													component="p"
													className="text-red-500 text-sm h-2"
												/>
											</div>
										</div>
										<div className="space-y-2">
											<Label className="mb-2 font-medium flex items-center gap-2">Tip
												lokacije</Label>
											<SelectBox
												name="venueTypeId"
												options={venueTypes.map(vt => ({
													key: vt.id,
													value: vt.id,
													label: vt.name,
												}))}
												value={values.venueTypeId || null}
												setFieldValue={setFieldValue}
												placeholder="Izaberite vrstu lokacije"/>
											<div className="text-red-500 text-sm h-2">
												<ErrorMessage
													name="venueTypeId"
													component="p"
													className="text-red-500 text-sm h-2"
												/>
											</div>
										</div>
									</div>
									<div className="space-y-2 md:col-span-2">
										<InputField
											name="address"
											label="Adresa"
											placeholder="Unesite adresu..."
											type="text"
										/>
									</div>
									<div className="space-y-2">
										<InputField
											name="capacity"
											label="Kapacitet"
											placeholder="Broj mjesta..."
											type="number"
										/>
									</div>
								</div>
							</Card>

							<Card className="p-8 rounded-[2rem] border-none shadow-xl shadow-slate-200/50 space-y-6">
								<h2 className="text-xl font-bold flex items-center gap-2"><MapPin
									className="w-5 h-5 text-indigo-600"/>Маpa</h2>
								<div className="space-y-4 pt-4">
									<Label className="text-slate-500 italic">Kliknite na mapu da postavite marker na
										tačnu lokaciju objekta</Label>
									<MapPicker setFieldValue={setFieldValue} lat={values.latitude}
											   lng={values.longitude}/>
									<div className="flex gap-4 text-xs font-mono text-slate-400">
										<span>Lat: {values.latitude || 'N/A'}</span>
										<span>Lng: {values.longitude || 'N/A'}</span>
									</div>
									{(errors.latitude || errors.longitude) &&
                                        <div className="text-red-500 text-xs font-bold">Morate izabrati lokaciju na
                                            mapi.</div>}
								</div>
							</Card>

							<Card className="p-8 rounded-[2rem] border-none shadow-xl shadow-slate-200/50">
								<h2 className="text-xl font-bold mb-8">Kontakt i društvene mreže</h2>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
									<div className="space-y-4">
										<div className="space-y-2">
											<InputField
												labelIcon={<Phone className="w-4 h-4"/>}
												name="phone"
												label="Telefon"
												type="text"
												className={"rounded-xl"}
											/>
										</div>
										<div className="space-y-2">
											<InputField
												labelIcon={<Mail className="w-4 h-4"/>}
												name="email"
												label="Email"
												type="email"
												className={"rounded-xl"}
											/>
										</div>
										<div className="space-y-2">
											<InputField
												labelIcon={<Globe className="w-4 h-4"/>}
												name="websiteUrl"
												label="Web sajt"
												type="text"
												className={"rounded-xl"}
											/>
										</div>
									</div>
									<div className="space-y-4">
										<div className="space-y-2">
											<InputField
												labelIcon={<Instagram className=" text-pink-600 w-4 h-4"/>}
												name="instagram"
												label="Instagram"
												type="text"
												className={"rounded-xl"}
												placeholder={"Korisničko ime"}
											/>
										</div>
										<div className="space-y-2">
											<InputField
												labelIcon={<Facebook className="text-blue-600 w-4 h-4"/>}
												name="facebook"
												label="Facebook"
												type="text"
												className={"rounded-xl"}
												placeholder={"Korisničko ime"}
											/>
										</div>
									</div>
								</div>
							</Card>

							<Field>
								<LoadingButton
									className="mt-3 cursor-pointer"
									type="submit"
									loading={isSubmitting}
								>
									Sačuvaj lokaciju
								</LoadingButton>
							</Field>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
}