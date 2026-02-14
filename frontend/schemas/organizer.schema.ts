import * as yup from 'yup';

export const organizerSchema = yup.object({
	email: yup.string().email("Neispravan format emaila").required("Email je obavezan"),
	password: yup.string().min(6, "Lozinka mora imati barem 6 karaktera").required("Lozinka je obavezna"),

	displayName: yup.string().required("Naziv organizacije je obavezan").max(150),
	description: yup.string().optional(),
	contactEmail: yup.string().email("Neispravan format emaila").optional().nullable(),
	phone: yup.string().optional().nullable(),
});