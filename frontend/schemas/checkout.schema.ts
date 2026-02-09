import * as yup from "yup";

export const checkoutSchema = yup.object({
	firstName: yup.string().required("Ime je obavezno"),
	lastName: yup.string().required("Prezime je obavezno"),
	cardNumber: yup.string().matches(/^[0-9]{16}$/, "Broj kartice mora imati 16 cifara").required("Obavezno"),
	expiry: yup.string().matches(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, "MM/GG").required("Obavezno"),
	cvv: yup.string().matches(/^[0-9]{3,4}$/, "3-4 cifre").required("Obavezno"),
});