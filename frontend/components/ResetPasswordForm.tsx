"use client"

import {cn} from "@/lib/utils"
import {Form, Formik} from "formik"
import {resetPasswordSchema} from "@/schemas/reset-password.schema"
import {LoadingButton} from "@/components/LoadingButton"
import {InputField} from "@/components/InputField"
import {toast} from "sonner"
import {LockKeyhole, ShieldCheck} from "lucide-react"

interface Props extends React.ComponentProps<"form"> {
	token?: string;
}

export function ResetPasswordForm({className, token, ...props}: Props) {
	return (
		<Formik
			initialValues={{
				password: "",
				confirmPassword: "",
			}}
			validationSchema={resetPasswordSchema}
			onSubmit={async (values) => {
				try {
					// Ovdje ide poziv tvog servisa, npr:
					// await AuthService.resetPassword(token, values.password);
					console.log("Nova lozinka:", values.password);
					toast.success("Lozinka je uspješno promijenjena!");
				} catch (error) {
					toast.error("Došlo je do greške. Pokušajte ponovo.");
				}
			}}
		>
			{({isSubmitting}) => (
				<Form className={cn("flex flex-col gap-6", className)} {...props}>
					<div className="flex flex-col items-center gap-2 text-center mb-4">
						<div className="bg-indigo-50 p-3 rounded-2xl text-indigo-600 mb-2">
							<ShieldCheck className="w-8 h-8"/>
						</div>
						<h1 className="text-2xl font-black text-slate-900 tracking-tight">Postavite novu lozinku</h1>
					</div>

					<InputField
						name="password"
						label="Nova lozinka"
						type="password"
						placeholder="Unesite novu lozinku..."
						labelIcon={<LockKeyhole className="w-4 h-4 text-slate-400"/>}
					/>

					<InputField
						name="confirmPassword"
						label="Potvrdite novu lozinku"
						type="password"
						placeholder="Ponovo unesite lozinku..."
						labelIcon={<LockKeyhole className="w-4 h-4 text-slate-400"/>}
					/>

					<LoadingButton
						type="submit"
						loading={isSubmitting}
						className="mt-2 bg-indigo-600 hover:bg-indigo-700 text-white h-12 rounded-xl font-bold shadow-lg shadow-indigo-100 transition-all"
					>
						Ažuriraj lozinku
					</LoadingButton>
				</Form>
			)}
		</Formik>
	)
}