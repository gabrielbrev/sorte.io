import { useCartStore } from "../stores/cartStore";
import type { CartItem } from "../interfaces/CartItem";

export const useCart = () => {
	const items = useCartStore((state) => state.items);
	const totalAmount = useCartStore((state) => state.totalAmount);
	const addItem = useCartStore((state) => state.addItem);
	const removeItem = useCartStore((state) => state.removeItem);
	const updateItemQuantity = useCartStore((state) => state.updateItemQuantity);
	const clearCart = useCartStore((state) => state.clearCart);

	return {
		items,
		totalAmount,
		itemCount: items.length,
		isEmpty: items.length === 0,

		addItem,
		removeItem,
		updateItemQuantity,
		clearCart,

		isItemInCart: (giveawayId: string): boolean => {
			return items.some((item) => item.giveawayId === giveawayId);
		},

		getItemQuantity: (giveawayId: string): number => {
			const item = items.find((item) => item.giveawayId === giveawayId);
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
			addItem(cartItem);
		},
	};
};
