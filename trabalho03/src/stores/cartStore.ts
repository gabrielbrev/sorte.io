import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, Cart } from "../interfaces/CartItem";

interface CartState extends Cart {
	addItem: (item: CartItem) => void;
	removeItem: (giveawayId: string) => void;
	updateItemQuantity: (giveawayId: string, newEntryCount: number) => void;
	clearCart: () => void;
	getItemCount: () => number;
}

export const useCartStore = create<CartState>()(
	persist(
		(set, get) => ({
			items: [],
			totalAmount: 0,

			addItem: (item: CartItem) => {
				set((state) => {
					const existingItemIndex = state.items.findIndex(
						(cartItem) => cartItem.giveawayId === item.giveawayId
					);

					let newItems: CartItem[];

					if (existingItemIndex >= 0) {
						newItems = state.items.map((cartItem, index) =>
							index === existingItemIndex
								? {
										...cartItem,
										entryCount: cartItem.entryCount + item.entryCount,
										totalPrice: cartItem.totalPrice + item.totalPrice,
								  }
								: cartItem
						);
					} else {
						newItems = [...state.items, item];
					}

					const newTotalAmount = newItems.reduce((total, cartItem) => total + cartItem.totalPrice, 0);

					return {
						items: newItems,
						totalAmount: newTotalAmount,
					};
				});
			},

			removeItem: (giveawayId: string) => {
				set((state) => {
					const newItems = state.items.filter((item) => item.giveawayId !== giveawayId);
					const newTotalAmount = newItems.reduce((total, item) => total + item.totalPrice, 0);

					return {
						items: newItems,
						totalAmount: newTotalAmount,
					};
				});
			},

			updateItemQuantity: (giveawayId: string, newEntryCount: number) => {
				set((state) => {
					let newItems: CartItem[];

					if (newEntryCount <= 0) {
						newItems = state.items.filter((item) => item.giveawayId !== giveawayId);
					} else {
						newItems = state.items.map((item) =>
							item.giveawayId === giveawayId
								? {
										...item,
										entryCount: newEntryCount,
										totalPrice: newEntryCount * item.entryPrice,
								  }
								: item
						);
					}

					const newTotalAmount = newItems.reduce((total, item) => total + item.totalPrice, 0);

					return {
						items: newItems,
						totalAmount: newTotalAmount,
					};
				});
			},

			clearCart: () => {
				set({
					items: [],
					totalAmount: 0,
				});
			},

			getItemCount: () => {
				const state = get();
				return state.items.reduce((total, item) => total + item.entryCount, 0);
			},
		}),
		{
			name: "sorteio-cart-storage",
			version: 1,
		}
	)
);
