"use client"
import {
	Combobox,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxInput,
	ComboboxItem,
	ComboboxList,
} from "@/components/ui/combobox"

interface Props {
	name: string;
	options: {
		key: string | number,
		label: string | number,
		value: string | number
	}[],
	value: number | null;
	setFieldValue: (field: string, value: number | null) => void;
	placeholder: string;
}

export function SelectBox({
							  name,
							  options,
							  value,
							  setFieldValue,
							  placeholder,
						  }: Props) {
	const selectedOption = options.find(o => o.value === value);

	return (
		<Combobox
			items={options}
			value={value}
			onValueChange={(val) => {
				if (!val) return;
				setFieldValue(name, val);
			}}
		>
			<ComboboxInput
				placeholder={placeholder}
				value={selectedOption ? String(selectedOption.label) : ""}
				onChange={() => {
				}}
			/>
			<ComboboxContent>
				<ComboboxEmpty>Nema podataka</ComboboxEmpty>
				<ComboboxList>
					{options.map(option => (
						<ComboboxItem key={option.key} value={option.value}>
							{option.label}
						</ComboboxItem>
					))}
				</ComboboxList>
			</ComboboxContent>
		</Combobox>
	);
}