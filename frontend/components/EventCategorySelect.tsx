import {MultiSelect} from "@/components/MultiSelect";
import {EventCategoriesSelectOptions} from "@/shared/globals";

interface Props {
	handleSelectChange: (selectedValue: string[]) => void,
	selectedCategories: string[]
}

export function EventCategoriesMultiSelect({handleSelectChange, selectedCategories}: Props) {
	const handleCategoriesSelected = (selectedCategories: string[]) => {
		console.log(selectedCategories);
		handleSelectChange(selectedCategories);
	}

	return (
		<MultiSelect title={"Kategorije"}
					 options={EventCategoriesSelectOptions}
					 selectedValues={selectedCategories}
					 onSelectChange={handleCategoriesSelected}
		/>
	)
}