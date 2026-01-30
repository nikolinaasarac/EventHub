"use client"
import {createContext, useContext, useEffect, useMemo, useState} from "react";
import {EventCategory} from "@/models/event-category.model";
import EventCategoryService from "@/services/event-category.service";

interface AppContextProps {
	eventCategories: EventCategory[];
	loading: boolean;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export function AppProvider({children}: { children: React.ReactNode }) {
	const [eventCategories, setEventCategories] = useState<EventCategory[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const response = await EventCategoryService.getEventCategories();
				setEventCategories(response);
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		}
		fetchData();
	}, [])

	const value = useMemo(() => ({loading, eventCategories}),
		[loading, eventCategories]
	);

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
	const ctx = useContext(AppContext);
	if (!ctx) throw new Error('useApp must be used inside AppProvider');
	return ctx;
}