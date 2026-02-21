import * as yup from "yup";
import dayjs from "dayjs";

export const checkoutSchema = yup.object({
	firstName: yup.string().required("Ime je obavezno"),
	lastName: yup.string().required("Prezime je obavezno"),

	cardNumber: yup
		.string()
		.matches(/^\d{16}$/, "Broj kartice mora imati tačno 16 cifara")
		.required("Broj kartice je obavezan"),

	expiry: yup
		.string()
		.required("Datum isteka je obavezan")
		.matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Format mora biti MM/GG")
		.test("expiry", "Kartica nije važeća", function (value) {
			if (!value) return false;
			const [month, year] = value.split("/").map(Number);
			const fullYear = 2000 + year;
			const expiryDate = dayjs(new Date(fullYear, month - 1, 1)).endOf("month");
			return expiryDate.isAfter(dayjs());
		}),

	cvv: yup
		.string()
		.matches(/^\d{3}$/, "CVV mora imati tačno 3 cifre")
		.required("CVV je obavezan"),
});