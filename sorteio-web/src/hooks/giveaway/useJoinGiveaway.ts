import { useMutation } from "@tanstack/react-query";

interface JoinGiveawayRequest {
	userId: string;
	items: {
		giveawayId: string;
		numEntries: number;
	}[];
}

interface JoinGiveawayResponse {
	items: {
		giveawayId: string;
		luckyNumbers: number[];
	}[];
}

async function handleJoinGiveaway(payload: JoinGiveawayRequest): Promise<JoinGiveawayResponse> {
	try {
		const response = await fetch("http://localhost:8090/giveaways/join", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(payload),
		});

		if (!response.ok) throw new Error(response.statusText);

		const data = await response.json();
		return data as JoinGiveawayResponse;
	} catch (err) {
		if (err instanceof Error) throw new Error(err.message);
		throw new Error("Erro ao participar do sorteio");
	}
}

export const useJoinGiveaway = () => {
	return useMutation({
		mutationFn: (payload: JoinGiveawayRequest) => handleJoinGiveaway(payload),
	});
};

export type { JoinGiveawayRequest, JoinGiveawayResponse };
