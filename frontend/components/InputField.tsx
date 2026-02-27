import {Field as FormikField, ErrorMessage, useField} from "formik";
import {Field, FieldLabel} from "@/components/ui/field";

interface InputFieldProps {
	name: string;
	label?: string;
	labelIcon?: React.ReactNode;
	type?: string;
	placeholder?: string;
	className?: string;
	as?: React.ElementType;
	autoComplete?: string;
	labelClassName?: string;
}

export function InputField({
							   name,
							   label,
							   labelIcon = null,
							   type = "text",
							   placeholder = "",
							   labelClassName,
							   className = "",
							   autoComplete,
							   as = "input",
						   }: InputFieldProps) {
	const [field, meta] = useField(name);
	return (
		<Field>
			<FieldLabel
				htmlFor={name}
				className={`font-bold ${labelClassName || "text-slate-700"}`}
			>
				{label}
			</FieldLabel>
			<FormikField
				as={as}
				type={type}
				name={name}
				value={field.value || ""}
				placeholder={placeholder}
				autoComplete={autoComplete}
				className={`w-full bg-white border rounded-md h-9 px-4 py-2 focus:outline-none focus:ring-2 
          				${meta.touched && meta.error ? "border-red-500 focus:ring-red-400" : "border-indigo-300 focus:ring-indigo-400"}
						${className}`}
			/>
			<div className="text-red-500 text-sm h-1">
				<ErrorMessage
					name={name}
					component="p"
					className="text-red-500 text-sm"
				/>
			</div>
		</Field>
	);

}