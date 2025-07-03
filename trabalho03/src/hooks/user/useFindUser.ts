import { useMutation } from "@tanstack/react-query";
import type { User } from "../../interfaces/User";
import Cookies from "js-cookie";

interface FindUserRequest {
	id: string;
}

async function handleFindUser(payload: FindUserRequest) {
	try {
		console.log("show");
		const response = await fetch(`http://localhost:8090/users/find?id=${payload.id}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (!response.ok) throw new Error(response.statusText);

		const data = (await response.json()) as User;
		console.log(data);

		Cookies.set("session", JSON.stringify(data));

		return data;
	} catch (err) {
		if (err instanceof Error) throw new Error(err.message);
	}
}

export const useFindUser = () => {
	return useMutation({ mutationFn: (payload: FindUserRequest) => handleFindUser(payload) });
};
