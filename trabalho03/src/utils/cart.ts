import type { CartItem, Cart } from "../interfaces/CartItem";

const CART_STORAGE_KEY = "sorteio_cart";

export const getCartFromStorage = (): Cart => {
	try {
		const cartData = localStorage.getItem(CART_STORAGE_KEY);
		if (!cartData) {
			return { items: [], totalAmount: 0 };
		}
		return JSON.parse(cartData);
	} catch (error) {
		console.error("Erro ao carregar carrinho do localStorage:", error);
		return { items: [], totalAmount: 0 };
	}
};

export const saveCartToStorage = (cart: Cart): void => {
	try {
		localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
		window.dispatchEvent(new Event("cartUpdated"));
	} catch (error) {
		console.error("Erro ao salvar carrinho no localStorage:", error);
	}
};

export const addItemToCart = (item: CartItem): Cart => {
	const cart = getCartFromStorage();

	const existingItemIndex = cart.items.findIndex((cartItem) => cartItem.giveawayId === item.giveawayId);

	if (existingItemIndex >= 0) {
		cart.items[existingItemIndex].entryCount += item.entryCount;
		cart.items[existingItemIndex].totalPrice += item.totalPrice;
	} else {
		cart.items.push(item);
	}

	cart.totalAmount = cart.items.reduce((total, cartItem) => total + cartItem.totalPrice, 0);

	saveCartToStorage(cart);
	return cart;
};

export const removeItemFromCart = (giveawayId: string): Cart => {
	const cart = getCartFromStorage();
	cart.items = cart.items.filter((item) => item.giveawayId !== giveawayId);
	cart.totalAmount = cart.items.reduce((total, item) => total + item.totalPrice, 0);

	saveCartToStorage(cart);
	return cart;
};

export const updateItemQuantity = (giveawayId: string, newEntryCount: number): Cart => {
	const cart = getCartFromStorage();
	const itemIndex = cart.items.findIndex((item) => item.giveawayId === giveawayId);

	if (itemIndex >= 0) {
		if (newEntryCount <= 0) {
			cart.items.splice(itemIndex, 1);
		} else {
			cart.items[itemIndex].entryCount = newEntryCount;
			cart.items[itemIndex].totalPrice = newEntryCount * cart.items[itemIndex].entryPrice;
		}
	}

	cart.totalAmount = cart.items.reduce((total, item) => total + item.totalPrice, 0);

	saveCartToStorage(cart);
	return cart;
};

export const clearCart = (): void => {
	const emptyCart: Cart = { items: [], totalAmount: 0 };
	saveCartToStorage(emptyCart);
};

export const getCartItemCount = (): number => {
	const cart = getCartFromStorage();
	return cart.items.reduce((total, item) => total + item.entryCount, 0);
};
