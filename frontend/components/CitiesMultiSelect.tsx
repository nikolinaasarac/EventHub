"use client"

import {MultiSelect} from "@/components/MultiSelect";
import {useEffect, useState} from "react";
import CitiesService from "@/services/cities.service";
import {City} from "@/models/city.model";

interface Props {
	handleSelectChange: (selectedValue: string[]) => void,
	selectedCities: string[]
}

export function CitiesMultiSelect({handleSelectChange, selectedCities}: Props) {
	const [cities, setCities] = useState<City[]>([]);

	useEffect(() => {
		const fetchCities = async () => {
			try {
				const response = await CitiesService.getCities();
				setCities(response);
			} catch (e) {
				console.error(e);
			}
		}
		fetchCities();
	}, [])

	const handleCitiesSelected = (selectedCities: string[]) => {
		handleSelectChange(selectedCities);
	}
	return (
		<MultiSelect title={"Opština"} options={cities.map(city => ({key: (city.id).toString(), value: city.name}))}
					 selectedValues={selectedCities} onSelectChange={handleCitiesSelected}/>
	)
}