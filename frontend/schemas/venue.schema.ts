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
		.optional()
		.nullable()
		.test('fileSize', 'Slika je prevelika', (value: any) => {
			if (!value) return true;
			return value.size <= 2000000;
		}),

	phone: yup
		.string()
		.transform(value => value === '' ? null : value)
		.nullable()
		.max(150, 'Telefon može imati najviše 150 karaktera'),

	email: yup
		.string()
		.transform(value => value === '' ? null : value)
		.nullable()
		.email('Email nije validan'),

	websiteUrl: yup
		.string()
		.transform(value => value === '' ? null : value)
		.nullable()
		.url('URL mora početi sa http:// ili https://'),

	instagram: yup
		.string()
		.transform(value => value === '' ? null : value)
		.nullable()
		.max(150, 'Maksimalno 150 karaktera'),

	facebook: yup
		.string()
		.transform(value => value === '' ? null : value)
		.nullable()
		.max(150, 'Maksimalno 150 karaktera'),
});