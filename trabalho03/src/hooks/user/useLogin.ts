import { useMutation } from "@tanstack/react-query";
import type { User } from "../../interfaces/User";
import Cookies from "js-cookie";

interface LoginRequest {
	email: string;
	password: string;
}

interface LoginResponse {
	user: User;
}

async function handleLogin(payload: LoginRequest) {
	try {
		const response = await fetch("http://localhost:8090/auth", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(payload),
		});

		if (!response.ok) throw new Error(response.statusText);

		const data = (await response.json()) as LoginResponse;

		Cookies.set("session", JSON.stringify(data.user));

		return data.user;
	} catch (err) {
		if (err instanceof Error) throw new Error(err.message);
	}
}

export const useLogin = () => {
	return useMutation({ mutationFn: (payload: LoginRequest) => handleLogin(payload) });
};
