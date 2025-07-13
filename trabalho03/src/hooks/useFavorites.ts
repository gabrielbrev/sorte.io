import { useFavoritesStore } from "../stores/favoritesStore";
import type { FavoriteItem } from "../stores/favoritesStore";

export const useFavorites = () => {
	const store = useFavoritesStore();

	return {
		favorites: store.favorites,
		addFavorite: store.addFavorite,
		removeFavorite: store.removeFavorite,
		toggleFavorite: store.toggleFavorite,
		isFavorite: store.isFavorite,
		clearFavorites: store.clearFavorites,
		isEmpty: store.favorites.length === 0,
		count: store.favorites.length,

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
