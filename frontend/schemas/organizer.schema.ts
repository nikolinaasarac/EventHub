import * as yup from 'yup';

export const organizerSchema = yup.object({
	email: yup.string().email("Neispravan format emaila").required("Email je obavezan"),
	displayName: yup.string().required("Naziv organizacije je obavezan").max(150),
	description: yup.string().optional(),
	contactEmail: yup.string().email("Neispravan format emaila").optional().nullable(),
	phone: yup.string().optional().nullable(),
});