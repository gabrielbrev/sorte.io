import { useMutation } from "@tanstack/react-query";

interface DeleteGiveawayRequest {
	id: string;
}

async function handleDeleteGiveaway(payload: DeleteGiveawayRequest) {
	try {
		const response = await fetch(`http://localhost:8090/giveaways?id=${payload.id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (!response.ok) throw new Error(response.statusText);
	} catch (err) {
		if (err instanceof Error) throw new Error(err.message);
		throw new Error("Erro ao excluir sorteio");
	}
}

export const useDeleteGiveaway = () => {
	return useMutation({ mutationFn: (payload: DeleteGiveawayRequest) => handleDeleteGiveaway(payload) });
};
