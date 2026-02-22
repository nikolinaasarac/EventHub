import {useRouter, usePathname, useSearchParams} from "next/navigation";
import {useCallback, useState, useEffect, useMemo} from "react";

export function useQueryFilters(debounceDelay = 500) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const filters = useMemo(() => {
		const categories = searchParams.get("categories")?.split(",") || [];
		const cities = searchParams.get("cities")?.split(",") || [];
		const venueTypes = searchParams.get("venueTypes")?.split(",") || [];
		const from = searchParams.get("from") || "";
		const to = searchParams.get("to") || "";

		return {categories, cities, venueTypes, from, to};
	}, [searchParams]);

	const [search, setSearch] = useState(searchParams.get("search") || "");
	const [page, setPage] = useState(Number(searchParams.get("page")) || 1);

	const updateFilters = (newFilters: Partial<{
		categories: string[];
		cities: string[];
		venueTypes: string[],
		from: string | null,
		to: string | null
	}>) => {
		const currentCategories = filters.categories;
		const currentCities = filters.cities;
		const currentVenueTypes = filters.venueTypes;

		const normalizedFilters = {
			categories: newFilters.categories !== undefined ? [...newFilters.categories].sort() : currentCategories,
			cities: newFilters.cities !== undefined ? [...newFilters.cities].sort() : currentCities,
			venueTypes: newFilters.venueTypes !== undefined ? [...newFilters.venueTypes].sort() : currentVenueTypes,
		};

		const query = createQueryString({
			categories: normalizedFilters.categories.length ? normalizedFilters.categories.join(",") : null,
			cities: normalizedFilters.cities.length ? normalizedFilters.cities.join(",") : null,
			venueTypes: normalizedFilters.venueTypes.length ? normalizedFilters.venueTypes.join(",") : null,
			from: newFilters.from !== undefined ? newFilters.from : filters.from,
			to: newFilters.to !== undefined ? newFilters.to : filters.to,
			page: 1,
		});

		router.replace(`${pathname}?${query}`);
	};

	const setCategories = (categories: string[]) =>
		updateFilters({categories});
	const setCities = (cities: string[]) => updateFilters({cities});
	const setVenueTypes = (venueTypes: string[]) =>
		updateFilters({venueTypes});
	const setFrom = (from: string | null) =>
		updateFilters({from: from ? from : null});

	const setTo = (to: string | null) =>
		updateFilters({to: to ? to : null});

	const createQueryString = useCallback(
		(params: Record<string, string | number | null>) => {
			const newParams = new URLSearchParams(searchParams.toString());

			Object.entries(params).forEach(([key, value]) => {
				if (value === null || value === "") {
					newParams.delete(key);
				} else {
					newParams.set(key, String(value));
				}
			});

			return newParams.toString();
		},
		[searchParams]
	);

	useEffect(() => {
		const handler = setTimeout(() => {
			const currentSearch = searchParams.get("search") || "";
			if (search !== currentSearch) {
				const query = createQueryString({search, page: 1});
				router.replace(`${pathname}?${query}`);
			}
		}, debounceDelay);

		return () => clearTimeout(handler);
	}, [search, pathname, router, createQueryString, debounceDelay, searchParams]);

	const updatePage = (newPage: number) => {
		setPage(newPage);
		const query = createQueryString({page: newPage});
		router.replace(`${pathname}?${query}`);
	};

	return {
		search,
		setSearch,
		filters,
		setCategories,
		setCities,
		setVenueTypes,
		page,
		updatePage,
		urlSearch: searchParams.get("search") || "",
		urlPage: Number(searchParams.get("page")) || 1,
		setFrom,
		setTo,
		urlFrom: searchParams.get("from") || "",
		urlTo: searchParams.get("to") || "",
	};
}