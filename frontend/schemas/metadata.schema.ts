import * as yup from 'yup';

export const metadataSchema: Record<number, yup.ObjectSchema<any>> = {
	// Fudbal
	1: yup.object({
		referee: yup.string().nullable(),
		homeTeam: yup.string().nullable(),
		awayTeam: yup.string().nullable(),
	}),

	// Koncert
	2: yup.object({
		performer: yup.string().nullable(),
		genre: yup.string().nullable(),
	}),
};