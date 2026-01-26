import * as yup from 'yup';
export const eventSchema = yup.object({
	title: yup.string().required("Naslov je obavezan"),
	description: yup.string().required("Opis je obavezan"),
	startDate: yup.string().required("Datum i vrijeme početka su obavezni"),
	endDate: yup.string().nullable(),
	imageUrl: yup
		.string()
		.optional(),

	image: yup
		.mixed()
		.required('Slika je obavezna')
		.test('fileSize', 'Slika je prevelika', (value: any) => {
			if (!value) return true;
			return value.size <= 2000000;
		}),
	venueId: yup.number().required("Lokacija je obavezna"),
	eventCategoryId: yup.number().required("Kategorija je obavezna"),
	eventSubcategoryId: yup.number().required("Podkategorija je obavezna"),
	metadata: yup.object().optional(),
})