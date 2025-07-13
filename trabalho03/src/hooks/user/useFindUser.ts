import { useQuery } from "@tanstack/react-query";
import type { User } from "../../interfaces/User";
import Cookies from "js-cookie";

async function handleFindUser(id: string): Promise<User> {
	try {
		const response = await fetch(`http://localhost:8090/users/find?id=${id}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (!response.ok) throw new Error(response.statusText);

		const data = (await response.json()) as User;

		Cookies.set("session", JSON.stringify(data));

		return data;
	} catch (err) {
		if (err instanceof Error) throw new Error(err.message);
		throw new Error("Erro ao buscar usuário");
	}
}

export const useFindUser = (id: string) => {
	return useQuery({
		queryKey: ["user", id],
		queryFn: () => handleFindUser(id),
		enabled: !!id,
		staleTime: 5 * 60 * 1000,
		refetchInterval: 30 * 1000,
	});
};
