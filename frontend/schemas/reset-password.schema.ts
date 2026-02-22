import * as yup from 'yup';

export const resetPasswordSchema = yup.object({
	password: yup
		.string()
		.required("Nova lozinka je obavezna")
		.min(8, "Lozinka mora imati najmanje 8 karaktera"),
	confirmPassword: yup
		.string()
		.required("Morate potvrditi lozinku")
		.oneOf([yup.ref('password')], 'Lozinke se ne podudaraju')
}).required();