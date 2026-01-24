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
		.required('Grad je obavezan')
		.integer(),

	venueTypeId: yup
		.number()
		.nullable()
		.required('Tip lokacije je obavezan')
		.integer(),

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
		.nullable()
		.optional(),

	imageUrl: yup
		.string()
		.optional(),

	phone: yup
		.string()
		.max(150, 'Telefon može imati najviše 150 karaktera')
		.optional(),

	email: yup
		.string()
		.email('Email nije validan')
		.max(150, 'Email može imati najviše 150 karaktera')
		.optional(),

	websiteUrl: yup
		.string()
		.url('URL sajta nije validan')
		.max(150, 'URL sajta može imati najviše 150 karaktera')
		.optional(),

	instagram: yup
		.string()
		.max(150, 'Instagram može imati najviše 150 karaktera')
		.optional(),

	facebook: yup
		.string()
		.max(150, 'Facebook može imati najviše 150 karaktera')
		.optional(),
});