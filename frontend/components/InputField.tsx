import {Field as FormikField, ErrorMessage} from "formik";

interface InputFieldProps {
	name: string;
	label: string;
	labelIcon?: React.ReactNode;
	type?: string;
	placeholder?: string;
	className?: string;
	as?: React.ElementType;
}

export function InputField({
							   name,
							   label,
							   labelIcon = null,
							   type = "text",
							   placeholder = "",
							   className = "",
							   as = "input",
						   }: InputFieldProps) {
	return (
		<div className="mb-4">
			<label
				htmlFor={name}
				className="mb-2 font-medium flex items-center gap-2"
			>
				{labelIcon}
				<span>{label}</span>
			</label>
			<FormikField
				as={as}
				id={name}
				name={name}
				type={type}
				placeholder={placeholder}
				className={`w-full bg-white border h-10 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 outline-none
          ${className}`}
			/>
			<div className="text-red-500 text-sm h-1">
				<ErrorMessage
					name={name}
					component="p"
					className="text-red-500 text-sm mt-1"
				/>
			</div>
		</div>
	);
}