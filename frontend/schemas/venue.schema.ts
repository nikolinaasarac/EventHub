import * as yup from 'yup';

export const venueSchema = yup.object({
	name: yup
		.string()
		.required('Naziv je obavezan')
		.max(150, 'Naziv može imati najviše 150 karaktera'),

	description: yup
		.string()
		.required('Opis je obavezan'),

	address: yup
		.string()
		.required('Adresa je obavezna')
		.max(255, 'Adresa može imati najviše 255 karaktera'),

	cityId: yup
		.number()
		.nullable()
		.required('Grad je obavezan'),

	venueTypeId: yup
		.number()
		.nullable()
		.required('Tip lokacije je obavezan'),

	latitude: yup
		.number()
		.nullable()
		.required('Morate izabrati lokaciju'),

	longitude: yup
		.number()
		.nullable()
		.required('Morate izabrati lokaciju'),

	capacity: yup
		.number()
		.transform((value, originalValue) => (originalValue === '' ? null : value))
		.nullable()
		.optional(),

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

	phone: yup
		.string()
		.transform((value) => (value === '' ? undefined : value))
		.max(150, 'Telefon može imati najviše 150 karaktera')
		.optional(),

	email: yup
		.string()
		.transform((value) => (value === '' ? undefined : value))
		.email('Email nije validan')
		.optional(),

	websiteUrl: yup
		.string()
		.transform((value) => (value === '' ? undefined : value))
		.url('URL mora početi sa http:// ili https://')
		.optional(),

	instagram: yup
		.string()
		.transform((value) => (value === '' ? undefined : value))
		.max(150, 'Maksimalno 150 karaktera')
		.optional(),

	facebook: yup
		.string()
		.transform((value) => (value === '' ? undefined : value))
		.max(150, 'Maksimalno 150 karaktera')
		.optional(),
});