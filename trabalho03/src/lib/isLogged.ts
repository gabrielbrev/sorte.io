import Cookies from "js-cookie";
import type { User } from "../interfaces/User";

export function isLogged() {
	const data = Cookies.get("session");

	if (data) {
		return JSON.parse(data) as User;
	}
}
