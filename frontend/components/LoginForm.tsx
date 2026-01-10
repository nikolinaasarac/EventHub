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

export function LoginForm({
							  className,
							  ...props
						  }: React.ComponentProps<"form">) {
	//const {login} = useAuth();

	return (
		<Formik
			initialValues={{email: "", password: ""}}
			validationSchema={loginSchema}
			onSubmit={(values) => console.log(values.email, values.password)}
		>
			{({isSubmitting, errors, touched}) => (
				<Form className={cn("flex flex-col gap-6", className)} {...props}>
					<FieldGroup>
						<div className="flex flex-col items-center gap-1 text-center mb-4">
							<h1 className="text-2xl font-bold">Dobrodošli nazad</h1>
							<p className="text-muted-foreground text-sm text-balance">
								Prijavite se na svoj nalog
							</p>
						</div>
						<Field>
							<FieldLabel htmlFor="email">Email</FieldLabel>
							<FormikField
								type="email"
								name="email"
								placeholder="Unesite email..."
								className={`w-full bg-white border rounded-md h-9 px-4 py-2 focus:outline-none focus:ring-2 
          							${errors.email && touched.email
									? "border-red-500 focus:ring-red-400"
									: "border-gray-300 focus:ring-[#7d6552]"}`}
							/>
							<div className="text-red-500 text-sm h-1">
								<ErrorMessage
									name="email"
									component="p"
									className="text-red-500 text-sm"
								/>
							</div>
						</Field>
						<Field>
							<div className="flex items-center">
								<FieldLabel htmlFor="password">Lozinka</FieldLabel>
							</div>
							<FormikField
								type="password"
								name="password"
								placeholder="Unesite lozinku..."
								className={`w-full bg-white border rounded-md h-9 px-4 py-2 focus:outline-none focus:ring-2 
          							${errors.email && touched.password
									? "border-red-500 focus:ring-red-400"
									: "border-gray-300 focus:ring-[#7d6552]"}`}
							/>
							<div className="text-red-500 text-sm h-1">
								<ErrorMessage
									name="password"
									component="p"
									className="text-red-500 text-sm"
								/>
							</div>
						</Field>
						<Field>
							<LoadingButton
								className="mt-3 cursor-pointer"
								type="submit"
								loading={isSubmitting}
							>
								Prijavi se
							</LoadingButton>
						</Field>
						<FieldDescription className="text-center">
							Nemate nalog?{" "}
							<a href="/signup" className="underline underline-offset-4">
								Napravite nalog
							</a>
						</FieldDescription>
					</FieldGroup>
				</Form>
			)}
		</Formik>
	)
}
