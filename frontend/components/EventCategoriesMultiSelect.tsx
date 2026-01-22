import {MultiSelect} from "@/components/MultiSelect";
import {useEffect, useState} from "react";
import {EventCategory} from "@/models/event-category.model";
import EventCategoryService from "@/services/event-category.service";

interface Props {
	handleSelectChange: (selectedValue: string[]) => void,
	selectedCategories: string[]
}

export function EventCategoriesMultiSelect({handleSelectChange, selectedCategories}: Props) {
	const [eventCategories, setEventCategories] = useState<EventCategory[]>([]);

	useEffect(() => {
		const fetchEventCategories = async () => {
			try {
				const response = await EventCategoryService.getEventCategories();
				setEventCategories(response);
			} catch (e) {
				console.error(e);
			}
		}
		fetchEventCategories();
	}, [])

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