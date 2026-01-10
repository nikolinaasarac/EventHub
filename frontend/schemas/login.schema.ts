import * as yup from 'yup';
export const loginSchema = yup.object({
	email: yup.string().email("Invalid email").required("Email je obavezan"),
	password: yup.string().required("Lozinka je obavezna"),
}).required();