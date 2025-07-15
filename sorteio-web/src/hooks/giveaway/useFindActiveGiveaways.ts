import { useInfiniteQuery } from "@tanstack/react-query";
import type { Giveaway } from "../../interfaces/Giveaway";

interface PaginatedResponse {
	items: Giveaway[];
	totalItems: number;
	totalPages: number;
	currentPage: number;
}

async function handleFindActiveGiveaways(page: number, size: number = 3): Promise<PaginatedResponse> {
	try {
		const response = await fetch(`http://localhost:8090/giveaways/find-active?page=${page}&size=${size}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (!response.ok) throw new Error(response.statusText);

		const data = await response.json();
		return data as PaginatedResponse;
	} catch (err) {
		if (err instanceof Error) throw new Error(err.message);
		throw new Error("Erro ao buscar sorteios ativos");
	}
}

export const useFindActiveGiveaways = (pageSize: number = 3) => {
	return useInfiniteQuery<PaginatedResponse, Error>({
		queryKey: ["active-giveaways", pageSize],
		queryFn: ({ pageParam = 0 }) => handleFindActiveGiveaways(pageParam as number, pageSize),
		getNextPageParam: (lastPage: PaginatedResponse) => {
			if (lastPage.currentPage >= lastPage.totalPages - 1) return undefined;
			return lastPage.currentPage + 1;
		},
		initialPageParam: 0,
		staleTime: 5 * 60 * 1000,
		refetchInterval: 30 * 1000,
		retry: 3,
		retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
	});
};
