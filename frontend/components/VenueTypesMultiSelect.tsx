"use client"

import {MultiSelect} from "@/components/MultiSelect";
import {useEffect, useState} from "react";
import {VenueType} from "@/models/venue-type.model";
import VenueTypesService from "@/services/venue-types.service";

interface Props {
	handleSelectChange: (selectedValue: string[]) => void,
	selectedVenueTypes: string[]
}

export function VenueTypesMultiSelect({handleSelectChange, selectedVenueTypes}: Props) {
	const [venueTypes, setVenueTypes] = useState<VenueType[]>([]);

	useEffect(() => {
		const fetchVenueTypes = async () => {
			try {
				const response = await VenueTypesService.getVenueTypes();
				setVenueTypes(response);
			} catch (e) {
				console.error(e);
			}
		}
		fetchVenueTypes();
	}, [])

	const handleVenueTypesSelected = (selectedVenueTypes: string[]) => {
		handleSelectChange(selectedVenueTypes);
	}
	return (
		<MultiSelect title={"Tip lokacije"} options={venueTypes.map(vt => ({key: (vt.id).toString(), value: vt.name}))}
					 selectedValues={selectedVenueTypes} onSelectChange={handleVenueTypesSelected}/>
	)
}