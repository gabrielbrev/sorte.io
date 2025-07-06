import type { Entry } from "./Entry";

export interface Giveaway {
	id: string;
	title: string;
	description: string;
	entryPrice: number;
	numEntries: number;
	imageUrl: string;
	owner: {
		id: string;
		name: string;
		email: string;
	};
	winner?: {
		id: string;
		name: string;
		email: string;
	};
	luckyNumber?: number;
	entries: Entry[];
	createdAt: Date;
	updatedAt: Date;
	soldEntries: number;
}
