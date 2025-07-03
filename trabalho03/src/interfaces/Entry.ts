export interface Entry {
	id: string;
	user: {
		id: string;
		name: string;
		email: string;
		phoneNumber?: string;
	};
	giveaway: {
		id: string;
		title: string;
		description: string;
		entryPrice: number;
		numEntries: number;
		imageUrl: string;
	};
	luckyNumber: number;
	createdAt: Date;
	updatedAt: Date;
}
