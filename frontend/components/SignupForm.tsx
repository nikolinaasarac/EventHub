"use client"

import {cn} from "@/lib/utils"
import {Form, Formik} from "formik"
import {signupSchema} from "@/schemas/signup.schema"
import {LoadingButton} from "@/components/LoadingButton"
import {InputField} from "@/components/InputField"
import {useAuth} from "@/context/auth-context";

export function SignupForm({
							   className,
							   ...props
						   }: React.ComponentProps<"form">) {
	const {signup} = useAuth();
	return (
		<Formik
			initialValues={{
				email: "",
				password: "",
				confirmPassword: "",
			}}
			validationSchema={signupSchema}
			onSubmit={(values) => signup(values.email, values.password)
			}
		>
			{({isSubmitting}) => (
				<Form className={cn("flex flex-col gap-6", className)} {...props}>
					<div className="flex flex-col items-center gap-1 text-center">
						<h1 className="text-2xl font-bold">Napravite nalog</h1>
						<p className="text-muted-foreground text-sm">
							Popunite naredna polja da biste kreirali nalog
						</p>
					</div>

					<InputField
						name="email"
						label="Email"
						type="email"
						placeholder="Unesite email..."
					/>

					<InputField
						name="password"
						label="Lozinka"
						type="password"
						placeholder="Unesite lozinku..."
					/>

					<InputField
						name="confirmPassword"
						label="Potvrdite lozinku"
						type="password"
						placeholder="Ponovo unesite lozinku..."
					/>

					<LoadingButton
						type="submit"
						loading={isSubmitting}
						className="mt-3"
					>
						Kreiraj nalog
					</LoadingButton>

					<p className="text-center text-sm">
						Već imate nalog?{" "}
						<a href="/login" className="underline">
							Prijavite se
						</a>
					</p>
				</Form>
			)}
		</Formik>
	)
}