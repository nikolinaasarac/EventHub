import * as yup from 'yup';

export const metadataSchema: Record<number, yup.ObjectSchema<any>> = {

	// 1 - Fudbal
	1: yup.object({
		homeTeam: yup.string().required("Domaćin je obavezan"),
		awayTeam: yup.string().required("Gost je obavezan"),
		referee: yup.string().nullable(),
	}),

	// 2 - Koncert
	2: yup.object({
		performer: yup.string().required("Izvođač je obavezan"),
		genre: yup.string().nullable(),
	}),

	// 3 - Košarka
	3: yup.object({
		homeTeam: yup.string().required("Domaći tim je obavezan"),
		awayTeam: yup.string().required("Gostujući tim je obavezan"),
		referee: yup.string().nullable(),
		competition: yup.string().nullable(),
	}),

	// 4 - Konferencija
	4: yup.object({
		speakers: yup.string().required("Predavači su obavezni"),
		topic: yup.string().required("Tema je obavezna"),
	}),

	// 5 - Degustacija vina
	5: yup.object({
		winery: yup.string().required("Vinarija je obavezna"),
		sommelier: yup.string().nullable(),
		wineCount: yup
			.number()
			.typeError("Broj uzoraka mora biti broj")
			.min(1, "Minimalno 1 uzorak")
			.nullable(),
	}),

	// 6 - Kulinarska radionica
	6: yup.object({
		chef: yup.string().required("Glavni šef je obavezan"),
		cuisineType: yup.string().required("Tip kuhinje je obavezan"),
		difficulty: yup
			.number()
			.typeError("Težina mora biti broj")
			.min(1, "Minimalno 1")
			.max(5, "Maksimalno 5")
			.nullable(),
	}),

	// 7 - Festival
	7: yup.object({
		headliners: yup.string().required("Glavni izvođači su obavezni"),
		festivalType: yup.string().required("Tip festivala je obavezan"),
		durationDays: yup
			.number()
			.typeError("Trajanje mora biti broj")
			.min(1, "Minimalno 1 dan")
			.required("Trajanje je obavezno"),
		stageCount: yup
			.number()
			.typeError("Broj bina mora biti broj")
			.min(1, "Minimalno 1 bina")
			.nullable(),
	}),
};