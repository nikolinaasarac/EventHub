import {useRouter, usePathname, useSearchParams} from "next/navigation";
import {useCallback, useState, useEffect, useMemo} from "react";

export function useQueryFilters(debounceDelay = 500) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const filters = useMemo(() => {
		const categories = searchParams.get("categories")?.split(",") || [];
		return {categories};
	}, [searchParams]);

	const [search, setSearch] = useState(searchParams.get("search") || "");
	const [page, setPage] = useState(Number(searchParams.get("page")) || 1);

	const updateFilters = (newFilters: Partial<{
		categories: string[];
	}>) => {
		const normalizedFilters = {
			categories: newFilters.categories
				? [...newFilters.categories].sort()
				: undefined,
		};

		const query = createQueryString({
			...Object.fromEntries(
				Object.entries(normalizedFilters).map(([key, value]) => [
					key,
					value?.length ? value.join(",") : null,
				])
			),
			page: 1,
		});

		router.replace(`${pathname}?${query}`);
	};

	const setCategories = (categories: string[]) =>
		updateFilters({categories});

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
		page,
		updatePage,
		urlSearch: searchParams.get("search") || "",
		urlPage: Number(searchParams.get("page")) || 1,
	};
}