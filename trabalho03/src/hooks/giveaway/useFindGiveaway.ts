import { useQuery } from "@tanstack/react-query";
import type { Giveaway } from "../../interfaces/Giveaway";

async function handleFindGiveaway(id: string): Promise<Giveaway> {
	try {
		const response = await fetch(`http://localhost:8090/giveaways/find?id=${id}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (!response.ok) throw new Error(response.statusText);

		const data = await response.json();
		return data as Giveaway;
	} catch (err) {
		if (err instanceof Error) throw new Error(err.message);
		throw new Error("Erro ao buscar sorteio");
	}
}

export const useFindGiveaway = (id: string) => {
	return useQuery({
		queryKey: ["giveaway", id],
		queryFn: () => handleFindGiveaway(id),
		enabled: !!id,
		staleTime: 5 * 60 * 1000,
		refetchInterval: 30 * 1000,
	});
};
