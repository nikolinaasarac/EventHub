"use client";

import {ErrorMessage, useField} from "formik";
import {DateTimePicker} from "@/components/DateTimePicker";
import {Field} from "@/components/ui/field";

type Props = {
	name: string;
	label?: string;
	placeholder?: string;
	minDate?: Date;
	maxDate?: Date;
};

export function DateTimePickerField({name, label, placeholder, minDate, maxDate}: Props) {
	const [field, meta, helpers] = useField<Date | null>(name);

	return (
		<Field>
			<DateTimePicker
				value={field.value ?? undefined}
				onChange={(date) => helpers.setValue(date ?? null)}
				placeholder={placeholder}
				minDate={minDate}
				maxDate={maxDate}
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