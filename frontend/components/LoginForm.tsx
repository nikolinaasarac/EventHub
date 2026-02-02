"use client"

import {cn} from "@/lib/utils"
import {
	Field, FieldDescription,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field"
import {Form, Formik, Field as FormikField, ErrorMessage} from "formik";
import {loginSchema} from "@/schemas/login.schema";
import {LoadingButton} from "@/components/LoadingButton";
import {useAuth} from "@/context/auth-context";
import {InputField} from "@/components/InputField";

export function LoginForm({
							  className,
							  ...props
						  }: React.ComponentProps<"form">) {
	const {login} = useAuth();

	return (
		<Formik
			initialValues={{email: "", password: ""}}
			validationSchema={loginSchema}
			onSubmit={(values) => login(values.email, values.password)}
		>
			{({isSubmitting}) => (
				<Form className={cn("flex flex-col gap-6", className)} {...props}>
					<FieldGroup>
						<div className="flex flex-col items-center gap-1 text-center mb-4">
							<h1 className="text-2xl font-bold">Dobrodošli nazad</h1>
							<p className="text-muted-foreground text-sm text-balance">
								Prijavite se na svoj nalog
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

						<LoadingButton
							className="mt-3 cursor-pointer"
							type="submit"
							loading={isSubmitting}
						>
							Prijavi se
						</LoadingButton>
						<FieldDescription className="text-center">
							Nemate nalog?{" "}
							<a href="/signup" className="underline underline-offset-4">
								Kreirajte nalog
							</a>
						</FieldDescription>
					</FieldGroup>
				</Form>
			)}
		</Formik>
	)
}
