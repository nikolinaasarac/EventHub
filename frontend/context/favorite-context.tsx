"use client"

import {createContext, useContext, useEffect, useMemo, useState} from "react";
import {useAuth} from "@/context/auth-context";
import {FavoriteEventsService} from "@/services/favorite-events.service";

interface FavoriteContextProps {
	favoriteIds: number[];
	loading: boolean;
	isFavorite: (eventId: number) => boolean;
	addFavorite: (eventId: number) => Promise<void>;
	removeFavorite: (eventId: number) => Promise<void>;
	toggleFavorite: (eventId: number) => Promise<void>;
}

const FavoriteContext = createContext<FavoriteContextProps | undefined>(undefined);

export function FavoriteProvider({children}: { children: React.ReactNode }) {
	const {user} = useAuth();
	const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchFavorites = async () => {
			if (!user) {
				setFavoriteIds([]);
				return;
			}
			setLoading(true);
			try {
				const favorites = await FavoriteEventsService.getMyFavoriteEvents();
				setFavoriteIds(favorites.map(e => e.id));
			} catch (e) {
				console.error("Failed to fetch favorites", e);
				setFavoriteIds([]);
			} finally {
				setLoading(false);
			}
		};

		fetchFavorites();
	}, [user]);

	const isFavorite = (eventId: number) => favoriteIds.includes(eventId);

	const addFavorite = async (eventId: number) => {
		try {
			await FavoriteEventsService.addToFavoriteEvents(eventId);
			setFavoriteIds(prev => (prev.includes(eventId) ? prev : [...prev, eventId]));
		} catch (e) {
			console.error(e);
		}
	};

	const removeFavorite = async (eventId: number) => {
		if (!user) return;
		try {
			await FavoriteEventsService.removeFromFavoriteEvents(eventId);
			setFavoriteIds(prev => prev.filter(id => id !== eventId));
		} catch (e) {
			console.error(e);
		}
	};

	const toggleFavorite = async (eventId: number) => {
		if (isFavorite(eventId)) {
			await removeFavorite(eventId);
		} else {
			await addFavorite(eventId);
		}
	};

	const value = useMemo(
		() => ({favoriteIds, loading, isFavorite, addFavorite, removeFavorite, toggleFavorite}),
		[favoriteIds, loading]
	);

	return <FavoriteContext.Provider value={value}>{children}</FavoriteContext.Provider>;
}

export function useFavorites() {
	const ctx = useContext(FavoriteContext);
	if (!ctx) throw new Error("useFavorites must be used inside FavoriteProvider");
	return ctx;
}