import Cookies from "js-cookie";

export function isLogged() {
	const data = Cookies.get("session");

	if (data) {
		return JSON.parse(data) as { id: string };
	}
}
