import { useMutation } from "@tanstack/react-query";

interface CreateGiveawayRequest {
	title: string;
	description: string;
	entryPrice: number;
	numEntries: number;
	imageUrl: string;
	owner: {
		id: string;
	};
}

async function handleCreateGiveaway(payload: CreateGiveawayRequest) {
	try {
		const response = await fetch("http://localhost:8090/giveaways", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(payload),
		});

		if (!response.ok) throw new Error(response.statusText);
	} catch (err) {
		if (err instanceof Error) throw new Error(err.message);
	}
}

export const useCreateGiveaway = () => {
	return useMutation({ mutationFn: (payload: CreateGiveawayRequest) => handleCreateGiveaway(payload) });
};
