"use client"
import {ErrorMessage, Form, Formik, FieldArray} from "formik";
import {Card} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {ImageUpload} from "@/components/ImageUpload";
import {InputField} from "@/components/InputField";
import {SelectBox} from "@/components/SelectBox";
import {AlignLeft, Calendar, Clock, Info, MapPin} from "lucide-react";
import {LoadingButton} from "@/components/LoadingButton";
import React, {useEffect, useState} from "react";
import {Event} from "@/models/event.model";
import {EventCategory} from "@/models/event-category.model";
import {EventSubcategory} from "@/models/event-subcategory.model";
import EventCategoryService from "@/services/event-category.service";
import EventSubcategoryService from "@/services/event-subcategory.service";
import {toast} from "sonner";
import {Venue} from "@/models/venue.model";
import VenueService from "@/services/venue.service";
import {eventSchema} from "@/schemas/event.schema";
import {METADATA_FIELDS_BY_SUBCATEGORY} from "@/shared/constants/metadata-config";
import EventService from "@/services/event.service";
import {Plus, Trash} from "lucide-react";
import TicketTypeService from "@/services/ticket-type.service";
import {DateTimePickerField} from "@/components/DateTimePickerField";
import {useRouter} from "next/navigation";

type EventFormValues = {
	title: string;
	description: string;
	eventCategoryId?: number;
	eventSubcategoryId?: number;
	startDate: Date | null;
	endDate?: Date | null;
	image: File | null;
	venueId?: number;
	metadata: Record<string, any>;
	isFree: boolean;
	ticketTypes: {
		name: string;
		price: string;
		totalQuantity: string;
	}[];
};

interface Props {
	event?: Event
}

export function EventForm({event}: Props) {
	const [eventCategories, setEventCategories] = useState<EventCategory[]>([]);
	const [eventSubcategories, setEventSubcategories] = useState<EventSubcategory[]>([]);
	const [venues, setVenues] = useState<Venue[]>([]);

	const router = useRouter();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const responseCategory = await EventCategoryService.getEventCategories();
				const responseSubcategory = await EventSubcategoryService.getEventSubcategories();
				const responseVenue = await VenueService.getAllVenues();
				setEventCategories(responseCategory);
				setEventSubcategories(responseSubcategory);
				setVenues(responseVenue);
			} catch (e) {
				console.error(e);
			}
		}
		fetchData();
	}, [])

	const isEdit = !!event;
	const title = isEdit ? "Uredi događaj" : "Novi događaj";
	const subtitle = isEdit
		? "Izmijenite podatke o događaju."
		: "Izaberite termin, lokaciju i unesite detalje.";
	const submitText = isEdit ? "Sačuvaj izmjene" : "Objavi događaj";

	return (
		<div className="min-h-screen bg-slate-50/50 py-12 px-4">
			<div className="max-w-5xl mx-auto space-y-8">
				<div className="mb-8 text-center md:text-left">
					<h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight">{title}</h1>
					<p className="text-slate-500 font-medium">{subtitle}</p>
				</div>

				<Formik<EventFormValues>
					initialValues={{
						title: event?.title ?? '',
						description: event?.description ?? '',
						eventCategoryId: event?.eventSubcategory.eventCategory.id ?? undefined,
						eventSubcategoryId: event?.eventSubcategory.id ?? undefined,
						startDate: event?.startDate ? new Date(event.startDate) : null,
						endDate: event?.endDate ? new Date(event.endDate) : undefined,
						image: null,
						venueId: event?.venue.id ?? undefined,
						metadata: event?.metadata ?? {performer: ''},
						isFree: event?.ticketTypes?.length === 0,
						ticketTypes: event?.ticketTypes?.map(t => ({
							name: t.name,
							price: String(t.price),
							totalQuantity: String(t.totalQuantity),
						})) || [{name: '', price: '', totalQuantity: ''}],
					}}
					validationSchema={eventSchema}
					onSubmit={async (values) => {
						try {
							const formData = new FormData();

							formData.append('title', values.title);
							formData.append('description', values.description);
							if (!isEdit) {
								formData.append('eventSubcategoryId', String(values.eventSubcategoryId));
							}

							if (values.startDate) {
								formData.append('startDate', values.startDate.toISOString());
							}
							if (values.endDate) {
								formData.append('endDate', values.endDate.toISOString());
							}
							if (values.venueId) {
								formData.append('venueId', String(values.venueId));
							}

							if (values.image) {
								formData.append('image', values.image);
							} else if (!isEdit) {
								formData.append('image', '');
							}

							Object.entries(values.metadata).forEach(([key, val]) => {
								formData.append(`metadata[${key}]`, String(val));
							});

							let savedEvent;

							if (isEdit && event) {
								savedEvent = await EventService.updateEvent(event.id, formData);
								toast.success("Događaj uspješno ažuriran!");
								router.back();
							} else {
								savedEvent = await EventService.createEvent(formData);
								toast.success("Događaj uspješno kreiran!");
								router.back();
							}

							const eventId = savedEvent.id;

							if (!isEdit && !values.isFree && values.ticketTypes.length > 0) {
								await Promise.all(
									values.ticketTypes.map(ticket =>
										TicketTypeService.createTicketType({
											name: ticket.name,
											price: Number(ticket.price),
											totalQuantity: Number(ticket.totalQuantity),
											eventId,
										})
									)
								);
							}
						} catch (err) {
							console.error(err);
							toast.error("Greška prilikom čuvanja događaja!");
						}
					}}
				>
					{({isSubmitting, errors, setFieldValue, values}) => {
						const filteredSubcategories = eventSubcategories.filter(
							(sub) => sub.eventCategory.id === values.eventCategoryId
						);
						const selectedSubRef = eventSubcategories.find(s => s.id === values.eventSubcategoryId);
						const dynamicFields = selectedSubRef ? METADATA_FIELDS_BY_SUBCATEGORY[selectedSubRef.name] : [];
						return (
							<Form className="space-y-6">
								<Card className="overflow-hidden border-none shadow-xl rounded-[2.5rem]">
									<div className="grid grid-cols-1 lg:grid-cols-12">
										<div className="lg:col-span-5 p-6 bg-slate-50">
											<ImageUpload name="image" label={"Naslovna fotografija događaja"}
														 aspectRatio={1.77} existingImageUrl={
												event?.imageUrl
													? `${process.env.NEXT_PUBLIC_API_BASE_URL}public/${event.imageUrl}`
													: undefined
											}/>
										</div>
										<div
											className="lg:col-span-7 p-8 flex flex-col justify-center space-y-6 bg-white">
											<InputField name="title" label="Naziv događaja"
														placeholder="Unesite naziv..."/>
											<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
												<div className="space-y-2">
													<Label className="text-sm font-bold">Kategorija</Label>
													<SelectBox name={"eventCategoryId"}
															   options={eventCategories.map(eventCategory => ({
																   key: eventCategory.id,
																   value: eventCategory.id,
																   label: eventCategory.name
															   }))} value={values.eventCategoryId || null}
															   setFieldValue={(field, val) => {
																   setFieldValue(field, val);
																   setFieldValue("eventSubcategoryId", null);
																   setFieldValue("metadata", {});
															   }}
															   placeholder={"Izaberite kategoriju"}
															   disabled={isEdit}/>
													<div className="text-red-500 text-sm h-2">
														<ErrorMessage
															name="eventCategoryId"
															component="p"
															className="text-red-500 text-sm h-2"
														/>
													</div>
												</div>
												<div className="space-y-2">
													<Label className="text-sm font-bold">Podkategorija</Label>
													<SelectBox name={"eventSubcategoryId"}
															   options={filteredSubcategories.map(eventSubcategory => ({
																   key: eventSubcategory.id,
																   value: eventSubcategory.id,
																   label: eventSubcategory.name
															   }))} value={values.eventSubcategoryId || null}
															   setFieldValue={setFieldValue}
															   placeholder={values.eventCategoryId ? "Izaberite podkategoriju" : "Prvo izaberite kategoriju"}
															   disabled={!values.eventCategoryId || isEdit}/>
													<div className="text-red-500 text-sm h-2">
														<ErrorMessage
															name="eventSubcategoryId"
															component="p"
															className="text-red-500 text-sm h-2"
														/>
													</div>
												</div>
											</div>
										</div>
									</div>
								</Card>

								<Card className="p-8 rounded-[2rem] border-none shadow-lg">
									<div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
										<div className="space-y-2">
											<Label className="flex items-center gap-2">
												<Calendar className="w-4 h-4 text-indigo-600"/>
												Početak
											</Label>

											<DateTimePickerField
												name="startDate"
												label="Početak"
												placeholder="Izaberi datum i vrijeme"
												maxDate={values.endDate ? new Date(values.endDate) : undefined}
											/>
										</div>
										<div className="space-y-2">
											<Label className="flex items-center gap-2">
												<Clock className="w-4 h-4 text-indigo-600"/>
												Kraj (opciono)
											</Label>

											<DateTimePickerField
												name="endDate"
												label="Kraj"
												placeholder="Izaberi datum i vrijeme"
												minDate={values.startDate ? new Date(values.startDate) : undefined}
											/>
										</div>
										<div className="space-y-2">
											<Label className="flex items-center gap-2"><MapPin
												className="w-4 h-4 text-indigo-600"/> Lokacija (Objekat)</Label>
											<SelectBox name={"venueId"} options={venues.map(venue => ({
												key: venue.id,
												value: venue.id,
												label: `${venue.name} (${venue.city.name})`
											}))} value={values.venueId || null} setFieldValue={setFieldValue}
													   placeholder={"Izaberite lokaciju"}/>
											<div className="text-red-500 text-sm h-2">
												<ErrorMessage
													name="venueId"
													component="p"
													className="text-red-500 text-sm h-2"
												/>
											</div>
										</div>
									</div>
								</Card>
								<div className="flex items-center gap-3">
									<input
										type="checkbox"
										id="isFree"
										checked={values.isFree}
										onChange={(e) => {
											const checked = e.target.checked;
											setFieldValue('isFree', checked);

											if (checked) {
												setFieldValue('ticketTypes', []);
											}
										}}
										className="w-5 h-5"
									/>
									<Label htmlFor="isFree" className="font-semibold">
										Događaj je besplatan
									</Label>
								</div>
								{!values.isFree && (
									<Card className="p-8 rounded-[2rem] border-none shadow-lg space-y-6">
										<h2 className="text-xl font-bold flex items-center gap-2">
											🎟️ Karte
										</h2>

										<FieldArray name="ticketTypes">
											{({push, remove}) => (
												<div className="space-y-6">
													{values.ticketTypes.map((_, index) => (
														<div
															key={index}
															className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end p-4 rounded-xl border border-slate-200"
														>
															<InputField
																name={`ticketTypes.${index}.name`}
																label="Naziv karte"
															/>

															<InputField
																name={`ticketTypes.${index}.price`}
																label="Cijena"
																type="number"
															/>

															<InputField
																name={`ticketTypes.${index}.totalQuantity`}
																label="Količina"
																type="number"
															/>

															<button
																type="button"
																onClick={() => remove(index)}
																className="h-12 flex items-center justify-center rounded-xl border border-red-200 text-red-500 hover:bg-red-50"
															>
																<Trash className="w-4 h-4"/>
															</button>
														</div>
													))}

													<button
														type="button"
														onClick={() =>
															push({name: '', price: '', totalQuantity: ''})
														}
														className="flex items-center gap-2 text-indigo-600 font-bold hover:underline"
													>
														<Plus className="w-4 h-4"/>
														Dodaj novu kartu
													</button>
												</div>
											)}
										</FieldArray>
									</Card>
								)}

								<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
									<Card className="lg:col-span-2 p-8 rounded-[2rem] border-none shadow-lg space-y-4">
										<h2 className="text-xl font-bold flex items-center gap-2 text-slate-800">
											<AlignLeft className="w-5 h-5 text-indigo-600"/> Detaljan opis
										</h2>
										<InputField as="textarea" name="description" label="" className="min-h-[200px]"
													placeholder="Šta posjetioci treba da znaju?"/>
									</Card>

									{dynamicFields && dynamicFields.length > 0 && (
										<Card
											className="lg:col-span-1 p-8 rounded-[2rem] border-none shadow-lg bg-indigo-600 text-white animate-in fade-in slide-in-from-right-4 duration-500">
											<h2 className="text-xl font-bold mb-6 flex items-center gap-2">
												<Info className="w-5 h-5"/> Specifikacije
											</h2>
											<div className="space-y-4">
												{dynamicFields.map((field) => (
													<InputField
														key={field.name}
														name={`metadata.${field.name}`}
														label={field.label}
														type={field.type}
														labelClassName="text-white"
														placeholder={field.placeholder}
														className="bg-white/10 border-white/20 text-white placeholder:text-white/30 rounded-xl"
													/>
												))}
											</div>
											<div
												className="mt-8 p-4 bg-white/5 rounded-2xl border border-white/10 italic text-[10px] text-indigo-100">
												* Specifični podaci za tip: {selectedSubRef?.name}
											</div>
										</Card>
									)}
								</div>
								<div className="flex justify-center pt-6">
									<LoadingButton
										type="submit"
										loading={isSubmitting}
										className="w-full md:w-[400px] h-16 bg-indigo-600 text-xl font-black rounded-2xl shadow-2xl shadow-indigo-200">
										{submitText}
									</LoadingButton>
								</div>

							</Form>
						);
					}}
				</Formik>
			</div>
		</div>
	)
}