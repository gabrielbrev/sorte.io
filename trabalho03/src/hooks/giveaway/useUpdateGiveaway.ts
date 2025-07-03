import { useMutation } from "@tanstack/react-query";

interface UpdateGiveawayRequest {
	id: string;
	title: string;
	description: string;
	entryPrice: number;
	numEntries: number;
	imageUrl: string;
}

async function handleUpdateGiveaway(payload: UpdateGiveawayRequest) {
	try {
		const response = await fetch(`http://localhost:8090/giveaways`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(payload),
		});

		if (!response.ok) throw new Error(response.statusText);
	} catch (err) {
		if (err instanceof Error) throw new Error(err.message);
		throw new Error("Erro ao atualizar sorteio");
	}
}

export const useUpdateGiveaway = () => {
	return useMutation({ mutationFn: (payload: UpdateGiveawayRequest) => handleUpdateGiveaway(payload) });
};
