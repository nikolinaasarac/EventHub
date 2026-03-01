"use client"
import {createContext, useContext, useEffect, useMemo, useState} from "react";
import {EventCategory} from "@/models/event-category.model";
import EventCategoryService from "@/services/event-category.service";
import {City} from "@/models/city.model";
import CitiesService from "@/services/cities.service";
import {VenueType} from "@/models/venue-type.model";
import VenueTypesService from "@/services/venue-types.service";
import {EventSubcategory} from "@/models/event-subcategory.model";
import EventSubcategoryService from "@/services/event-subcategory.service";

interface AppContextProps {
	eventCategories: EventCategory[];
	eventSubcategories: EventSubcategory[];
	cities: City[];
	venueTypes: VenueType[];
	loading: boolean;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export function AppProvider({children}: { children: React.ReactNode }) {
	const [eventCategories, setEventCategories] = useState<EventCategory[]>([]);
	const [eventSubcategories, setEventSubcategories] = useState<EventSubcategory[]>([]);
	const [cities, setCities] = useState<City[]>([]);
	const [venueTypes, setVenueTypes] = useState<VenueType[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const [citiesRes, categoriesRes, venueTypesRes] = await Promise.all([CitiesService.getCities(), EventCategoryService.getEventCategories(), VenueTypesService.getVenueTypes()]);
				setEventCategories(categoriesRes);
				setCities(citiesRes);
				setVenueTypes(venueTypesRes);
				const subcategoriesRes = await EventSubcategoryService.getEventSubcategories();
				setEventSubcategories(subcategoriesRes);
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		}
		fetchData();
	}, [])

	const value = useMemo(() => ({loading, eventCategories, cities, venueTypes, eventSubcategories}),
		[loading, eventCategories, cities, venueTypes, eventSubcategories]
	);

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
	const ctx = useContext(AppContext);
	if (!ctx) throw new Error('useApp must be used inside AppProvider');
	return ctx;
}