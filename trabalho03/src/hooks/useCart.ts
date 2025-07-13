import { useCartStore } from "../stores/cartStore";
import type { CartItem } from "../interfaces/CartItem";

export const useCart = () => {
	return {
		items: useCartStore((state) => state.items),
		totalAmount: useCartStore((state) => state.totalAmount),
		itemCount: useCartStore((state) => state.items.length),
		isEmpty: useCartStore((state) => state.items.length === 0),

		addItem: useCartStore((state) => state.addItem),
		removeItem: useCartStore((state) => state.removeItem),
		updateItemQuantity: useCartStore((state) => state.updateItemQuantity),
		clearCart: useCartStore((state) => state.clearCart),

		isItemInCart: (giveawayId: string): boolean => {
			return useCartStore((state) => state.items.some((item) => item.giveawayId === giveawayId));
		},

		getItemQuantity: (giveawayId: string): number => {
			const item = useCartStore((state) => state.items.find((item) => item.giveawayId === giveawayId));
			return item?.entryCount || 0;
		},

		addGiveawayToCart: (
			giveawayId: string,
			title: string,
			imageUrl: string,
			entryPrice: number,
			quantity: number = 1
		) => {
			const cartItem: CartItem = {
				giveawayId,
				title,
				imageUrl,
				entryPrice,
				entryCount: quantity,
				totalPrice: quantity * entryPrice,
			};
			useCartStore.getState().addItem(cartItem);
		},
	};
};
