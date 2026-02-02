import * as yup from 'yup';

export const metadataSchema: Record<number, yup.ObjectSchema<any>> = {
	// Fudbal
	1: yup.object({
		referee: yup.string().required("Sudija je obavezan"),
		homeTeam: yup.string().required("Domaćin je obavezan"),
		awayTeam: yup.string().required("Gost je obavezan"),
	}),

	// Koncert
	2: yup.object({
		performer: yup.string().required("Izvođač je obavezan"),
		genre: yup.string().required("Žanr je obavezan"),
	}),
};