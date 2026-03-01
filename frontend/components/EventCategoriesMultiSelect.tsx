import {MultiSelect} from "@/components/MultiSelect";
import {useApp} from "@/context/app-context";

interface Props {
	handleSelectChange: (selectedValue: string[]) => void,
	selectedCategories: string[]
}

export function EventCategoriesMultiSelect({handleSelectChange, selectedCategories}: Props) {
	const {eventCategories} = useApp();

	const handleCategoriesSelected = (selectedCategories: string[]) => {
		handleSelectChange(selectedCategories);
	}

	return (
		<MultiSelect title={"Kategorija"}
					 options={eventCategories.map(category => ({key: (category.id).toString(), value: category.name}))}
					 selectedValues={selectedCategories}
					 onSelectChange={handleCategoriesSelected}
		/>
	)
}