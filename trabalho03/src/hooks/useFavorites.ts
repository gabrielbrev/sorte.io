import { useFavoritesStore } from "../stores/favoritesStore";
import type { FavoriteItem } from "../stores/favoritesStore";
import { isLogged } from "../lib/isLogged";

export const useFavorites = () => {
	const store = useFavoritesStore();
	const favorites = store((state) => state.favorites);
	const addFavorite = store((state) => state.addFavorite);
	const removeFavorite = store((state) => state.removeFavorite);
	const toggleFavorite = store((state) => state.toggleFavorite);
	const isFavorite = store((state) => state.isFavorite);
	const clearFavorites = store((state) => state.clearFavorites);
	const user = isLogged();

	return {
		favorites,
		addFavorite,
		removeFavorite,
		toggleFavorite,
		isFavorite,
		clearFavorites,
		isEmpty: favorites.length === 0,
		count: favorites.length,
		isLoggedIn: !!user,

		createFavoriteFromGiveaway: (giveaway: {
			id: string;
			title: string;
			imageUrl: string;
			description: string;
			entryPrice: number;
			createdAt: Date;
		}) => {
			const favoriteItem: FavoriteItem = {
				giveawayId: giveaway.id,
				title: giveaway.title,
				imageUrl: giveaway.imageUrl,
				description: giveaway.description,
				entryPrice: giveaway.entryPrice,
				createdAt: giveaway.createdAt,
			};
			return favoriteItem;
		},
	};
};
