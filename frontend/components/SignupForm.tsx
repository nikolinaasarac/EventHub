"use client"

import {cn} from "@/lib/utils"
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field"
import {Form, Formik, Field as FormikField, ErrorMessage} from "formik";
import {signupSchema} from "@/schemas/signup.schema";
import {LoadingButton} from "@/components/LoadingButton";

export function SignupForm({
							   className,
							   ...props
						   }: React.ComponentProps<"form">) {
	return (
		<Formik initialValues={{name: "", surname: "", email: "", password: "", confirmPassword: ""}}
				validationSchema={signupSchema}
				onSubmit={(values) => console.log(values.name, values.surname, values.email, values.password, values.confirmPassword)}>
			{({isSubmitting, errors, touched}) => (
				<Form className={cn("flex flex-col gap-6", className)} {...props}>
					<FieldGroup>
						<div className="flex flex-col items-center gap-1 text-center">
							<h1 className="text-2xl font-bold">Napravite nalog</h1>
							<p className="text-muted-foreground text-sm text-balance">
								Popunite naredna polja da biste kreirali nalog
							</p>
						</div>

						<Field>
							<Field className="grid grid-cols-2 gap-4">
								<Field>
									<FieldLabel htmlFor="name">Ime</FieldLabel>
									<FormikField
										type="text"
										name="name"
										placeholder="Unesite ime..."
										className={`w-full bg-white border rounded-md h-9 px-4 py-2 focus:outline-none focus:ring-2 
          							${errors.name && touched.name
											? "border-red-500 focus:ring-red-400"
											: "border-gray-300 focus:border-[#7d6552]"}`}
									/>
									<div className="text-red-500 text-sm h-1">
										<ErrorMessage
											name="name"
											component="p"
											className="text-red-500 text-sm"
										/>
									</div>
								</Field>
								<Field>
									<FieldLabel htmlFor="surname">Prezime</FieldLabel>
									<FormikField
										type="text"
										name="surname"
										placeholder="Unesite prezime..."
										className={`w-full bg-white border rounded-md h-9 px-4 py-2 focus:outline-none focus:ring-2 
          							${errors.surname && touched.surname
											? "border-red-500 focus:ring-red-400"
											: "border-gray-300 focus:border-[#7d6552]"}`}
									/>
									<div className="text-red-500 text-sm h-1">
										<ErrorMessage
											name="surname"
											component="p"
											className="text-red-500 text-sm"
										/>
									</div>
								</Field>
							</Field>
						</Field>
						<Field>
							<FieldLabel htmlFor="email">Email</FieldLabel>
							<FormikField
								type="email"
								name="email"
								placeholder="Unesite email..."
								className={`w-full bg-white border rounded-md h-9 px-4 py-2 focus:outline-none focus:ring-2 
          							${errors.email && touched.email
									? "border-red-500 focus:ring-red-400"
									: "border-gray-300 focus:border-[#7d6552]"}`}
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
							<FieldLabel htmlFor="password">Lozinka</FieldLabel>
							<FormikField
								type="password"
								name="password"
								placeholder="Unesite lozinku..."
								className={`w-full bg-white border rounded-md h-9 px-4 py-2 focus:outline-none focus:ring-2 
          							${errors.password && touched.password
									? "border-red-500 focus:ring-red-400"
									: "border-gray-300 focus:border-[#7d6552]"}`}
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
							<FieldLabel htmlFor="confirmPassword">Potvrdite lozinku</FieldLabel>
							<FormikField
								type="password"
								name="confirmPassword"
								placeholder="Unesite ime..."
								className={`w-full bg-white border rounded-md h-9 px-4 py-2 focus:outline-none focus:ring-2 
          							${errors.confirmPassword && touched.confirmPassword
									? "border-red-500 focus:ring-red-400"
									: "border-gray-300 focus:border-[#7d6552]"}`}
							/>
							<div className="text-red-500 text-sm h-1">
								<ErrorMessage
									name="confirmPassword"
									component="p"
									className="text-red-500 text-sm"
								/>
							</div>
						</Field>
						<Field>
							<LoadingButton type="submit">Kreirajte nalog</LoadingButton>
						</Field>
						<FieldDescription className="px-6 text-center">
							Već imate nalog? <a href="/login">Prijavite se</a>
						</FieldDescription>
					</FieldGroup>
				</Form>
			)}
		</Formik>
	)
}
