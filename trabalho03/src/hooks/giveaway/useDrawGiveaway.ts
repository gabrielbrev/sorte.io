import { useMutation } from "@tanstack/react-query";
import type { Giveaway } from "../../interfaces/Giveaway";

interface DrawGiveawayRequest {
	id: string;
}

async function handleDrawGiveaway(payload: DrawGiveawayRequest): Promise<Giveaway> {
	try {
		const response = await fetch(`http://localhost:8090/giveaways/draw?id=${payload.id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (!response.ok) {
			const errorText = await response.text();
			throw new Error(errorText || response.statusText);
		}

		return await response.json();
	} catch (err) {
		if (err instanceof Error) throw new Error(err.message);
		throw new Error("Erro ao realizar sorteio");
	}
}

export const useDrawGiveaway = () => {
	return useMutation({
		mutationFn: (payload: DrawGiveawayRequest) => handleDrawGiveaway(payload),
	});
};
