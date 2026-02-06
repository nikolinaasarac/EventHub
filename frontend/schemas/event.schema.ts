import * as yup from 'yup';
import {metadataSchema} from "@/schemas/metadata.schema";

export const eventSchema = yup.object({
	title: yup.string().required("Naslov je obavezan"),
	description: yup.string().required("Opis je obavezan"),
	startDate: yup.string().required("Datum i vrijeme početka su obavezni"),
	endDate: yup.string().nullable().optional(),
	imageUrl: yup
		.string()
		.optional(),

	image: yup
		.mixed()
		.optional()
		.nullable()
		.test('fileSize', 'Slika je prevelika', (value: any) => {
			if (!value) return true;
			return value.size <= 2000000;
		}),
	isFree: yup.boolean().required(),
	venueId: yup.number().required("Lokacija je obavezna"),
	eventCategoryId: yup.number().required("Kategorija je obavezna"),
	eventSubcategoryId: yup.number().required("Podkategorija je obavezna"),
	metadata: yup
		.object()
		.default({})
		.when('eventSubcategoryId', (value, schema) => {
			const subcategoryId = Number(value);

			if (metadataSchema[subcategoryId]) {
				return schema.shape(
					metadataSchema[subcategoryId].fields
				);
			}
			return schema;
		}),
	ticketTypes: yup.array().when('isFree', {
		is: false,
		then: (schema) =>
			schema
				.of(
					yup.object({
						name: yup.string().required("Polje je obavezno"),
						price: yup.number().min(0).required("Polje je obavezno").moreThan(0, "Cijena mora biti veća od 0"),
						totalQuantity: yup.number().min(1).required("Polje je obavezno").moreThan(0, "Količina mora biti veća od 0"),
					})
				)
				.min(1, 'Dodajte barem jednu kartu'),
		otherwise: (schema) => schema.optional(),
	}),
})