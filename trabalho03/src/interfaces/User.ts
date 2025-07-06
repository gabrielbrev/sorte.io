import type { Giveaway } from "./Giveaway";
import type { Entry } from "./Entry";

export interface User {
	id: string;
	name: string;
	email: string;
	password: string;
	ownedGiveaways: Giveaway[];
	wonGiveaways: Giveaway[];
	entries: Entry[];
	createdAt: Date;
	updatedAt: Date;
	participatingGiveaways?: Giveaway[];
}
