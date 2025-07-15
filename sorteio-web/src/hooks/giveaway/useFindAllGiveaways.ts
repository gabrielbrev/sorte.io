import { useQuery } from "@tanstack/react-query";
import type { Giveaway } from "../../interfaces/Giveaway";

async function handleFindAllGiveaways(): Promise<Giveaway[]> {
	try {
		const response = await fetch("http://localhost:8090/giveaways", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (!response.ok) throw new Error(response.statusText);

		const data = await response.json();
		return data as Giveaway[];
	} catch (err) {
		if (err instanceof Error) throw new Error(err.message);
		throw new Error("Erro ao buscar sorteios");
	}
}

export const useFindAllGiveaways = () => {
	return useQuery({
		queryKey: ["giveaways"],
		queryFn: handleFindAllGiveaways,
		staleTime: 5 * 60 * 1000, // 5 minutos
		refetchInterval: 30 * 1000, // Refetch a cada 30 segundos
	});
};
