import { useMutation } from "@tanstack/react-query";

interface RegisterRequest {
	name: string;
	email: string;
	password: string;
}

async function handleRegister(payload: RegisterRequest) {
	try {
		const response = await fetch("http://localhost:8090/users/new", {
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

export const useRegister = () => {
	return useMutation({ mutationFn: (payload: RegisterRequest) => handleRegister(payload) });
};
