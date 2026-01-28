"use client"

import React, {useEffect, useState} from 'react';
import {Form, Formik, ErrorMessage} from "formik";
import {venueSchema} from '@/schemas/venue.schema';
import {Label} from "@/components/ui/label";
import {Card} from "@/components/ui/card";
import {MapPin, Globe, Instagram, Facebook, Phone, Mail, X} from 'lucide-react';
import dynamic from 'next/dynamic';
import {InputField} from "@/components/InputField";
import {SelectBox} from "@/components/SelectBox";
import {City} from "@/models/city.model";
import {VenueType} from "@/models/venue-type.model";
import CitiesService from "@/services/cities.service";
import VenueTypesService from "@/services/venue-types.service";
import VenueService from "@/services/venue.service";
import {LoadingButton} from "@/components/LoadingButton";
import {Field} from "@/components/ui/field";
import {ImageUpload} from "@/components/ImageUpload";
import {toast} from "sonner";
import {Venue} from "@/models/venue.model";

const MapPicker = dynamic(() => import("./MapPicker").then(mod => mod.MapPicker), {ssr: false});

interface Props extends React.ComponentProps<"form"> {
	venue?: Venue;
}

export function VenueForm({venue}: Props) {
	const [cities, setCities] = useState<City[]>([]);
	const [venueTypes, setVenueTypes] = useState<VenueType[]>([])

	const isEdit = !!venue;

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
		<>
			<div className="min-h-screen bg-slate-50/50 py-12 px-4">
				<div className="max-w-4xl mx-auto space-y-8">
					<div>
						<h1 className="text-3xl font-black text-slate-900">Nova lokacija</h1>
						<p className="text-slate-500">Unesite podatke o novoj lokaciji.</p>
					</div>
					<Formik
						initialValues={{
							name: venue?.name ?? '',
							description: venue?.description ?? '',
							address: venue?.address ?? '',
							cityId: venue?.city?.id ?? undefined,
							venueTypeId: venue?.venueType?.id ?? undefined,
							latitude: venue?.latitude ? Number(venue.latitude) : null,
							longitude: venue?.longitude ? Number(venue.longitude) : null,
							capacity: venue?.capacity ?? undefined,

							phone: venue?.phone ?? '',
							email: venue?.email ?? '',
							websiteUrl: venue?.websiteUrl ?? '',
							instagram: venue?.instagram ?? '',
							facebook: venue?.facebook ?? '',
							image: null,
						}}
						validationSchema={venueSchema}
						onSubmit={async (values) => {
							try {
								const formData = new FormData();
								formData.append('name', values.name);
								formData.append('description', values.description);
								formData.append('address', values.address);
								formData.append('cityId', String(values.cityId));
								formData.append('venueTypeId', String(values.venueTypeId));
								formData.append('latitude', String(values.latitude));
								formData.append('longitude', String(values.longitude));

								if (values.image) {
									formData.append('image', values.image);
								}
								if (values.capacity)
									formData.append('capacity', String(values.capacity));

								if (values.phone)
									formData.append('phone', values.phone);

								if (values.email)
									formData.append('email', values.email);

								if (values.websiteUrl)
									formData.append('websiteUrl', values.websiteUrl);

								if (values.instagram)
									formData.append('instagram', values.instagram);

								if (values.facebook)
									formData.append('facebook', values.facebook);

								if (isEdit && venue) {
									await VenueService.updateVenue(venue.id, formData);
									toast.success("Lokacija uspješno ažurirana!");
								} else {
									await VenueService.createVenue(formData);
									toast.success("Lokacija uspješno kreirana!");
								}
								console.log('Venue uploaded:', formData);
							} catch (err) {
								console.error(err);
								toast.error("Greška prilikom kreiranja lokacije!")
							}
						}}
					>
						{({isSubmitting, errors, setFieldValue, values}) => (
							<Form className="space-y-8">
								<div className="p-8 rounded-[2rem] border shadow-xl shadow-slate-200/50">
									<div className="flex flex-col gap-10">
										<div className="space-y-4">
											<ImageUpload
												name="image"
												label="Slika objekta"
												aspectRatio={2}
												existingImageUrl={
													venue?.imageUrl
														? `${process.env.NEXT_PUBLIC_API_BASE_URL}public/${venue.imageUrl}`
														: undefined
												}
											/>
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
												className="w-full min-h-28 border border-slate-200"
											/>
										</div>
										<div
											className="flex flex-col md:flex-row gap-4 md:gap-8 items-start justify-between md:justify-start">
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
								</div>

								<Card
									className="p-8 rounded-[2rem] border-none shadow-xl shadow-slate-200/50 space-y-6">
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
                                            <div className="text-red-500 text-xs font-bold h-6">Morate izabrati lokaciju
                                                na
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
										{isEdit ? "Sačuvaj lokaciju" : "Dodaj lokaciju"}
									</LoadingButton>
								</Field>
							</Form>
						)}
					</Formik>
				</div>
			</div>
		</>
	);
}