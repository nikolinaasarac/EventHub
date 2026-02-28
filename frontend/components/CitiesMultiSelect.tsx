"use client"

import {MultiSelect} from "@/components/MultiSelect";
import {useApp} from "@/context/app-context";

interface Props {
	handleSelectChange: (selectedValue: string[]) => void,
	selectedCities: string[]
	title?: string
}

export function CitiesMultiSelect({handleSelectChange, selectedCities, title = "Opština"}: Props) {
	const {cities} = useApp();

	const handleCitiesSelected = (selectedCities: string[]) => {
		handleSelectChange(selectedCities);
	}
	return (
		<MultiSelect title={title} options={cities.map(city => ({key: (city.id).toString(), value: city.name}))}
					 selectedValues={selectedCities} onSelectChange={handleCitiesSelected}/>
	)
}