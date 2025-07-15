export interface CartItem {
	giveawayId: string;
	title: string;
	imageUrl: string;
	entryPrice: number;
	entryCount: number;
	totalPrice: number;
}

export interface Cart {
	items: CartItem[];
	totalAmount: number;
}
