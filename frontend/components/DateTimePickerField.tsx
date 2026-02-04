"use client";

import {ErrorMessage, useField} from "formik";
import {DateTimePicker} from "@/components/DateTimePicker";
import {Field} from "@/components/ui/field";

type Props = {
	name: string;
	label?: string;
	placeholder?: string;
};

export function DateTimePickerField({name, label, placeholder}: Props) {
	const [field, meta, helpers] = useField<Date | null>(name);

	return (
		<Field>
			<DateTimePicker
				value={field.value ?? undefined}
				onChange={(date) => helpers.setValue(date ?? null)}
				placeholder={placeholder}
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