import { useQuery } from "@tanstack/react-query";
import type { Giveaway } from "../../interfaces/Giveaway";

async function handleFindEndedGiveaways(): Promise<Giveaway[]> {
	try {
		const response = await fetch("http://localhost:8090/giveaways/find-ended", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (!response.ok) throw new Error(response.statusText);

		const data = await response.json();
		console.log(data);
		return data as Giveaway[];
	} catch (err) {
		if (err instanceof Error) throw new Error(err.message);
		throw new Error("Erro ao buscar sorteios finalizados");
	}
}

export const useFindEndedGiveaways = () => {
	return useQuery({
		queryKey: ["ended-giveaways"],
		queryFn: handleFindEndedGiveaways,
		staleTime: 5 * 60 * 1000, // 5 minutos
		refetchInterval: 30 * 1000, // Refetch a cada 30 segundos
	});
};
