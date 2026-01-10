import * as yup from 'yup';
export const signupSchema = yup.object({
	name: yup.string().required("Ime je obavezno"),
	surname: yup.string().required("Prezime je obavezno"),
	email: yup.string().email("Neispravan email").required("Email je obavezan"),
	password: yup.string().required("Lozinka je obavezna").min(8, "Lozinka mora imati najmanje 8 karaktera"),
	confirmPassword: yup.string().required("Potvrda lozinke je obavezna").oneOf([yup.ref('password')], 'Lozinke se ne podudaraju')
}).required();