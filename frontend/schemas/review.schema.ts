import * as yup from "yup";

export const reviewSchema = yup.object({
	rating: yup.number().min(1, "Molimo vas da ocijenite događaj").max(5).required(),
	comment: yup.string().optional().min(3, "Komentar mora imati barem 3 karaktera"),
});