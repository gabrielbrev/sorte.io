import { create } from "zustand";
import { persist } from "zustand/middleware";
import { isLogged } from "../lib/isLogged";

export interface FavoriteItem {
	giveawayId: string;
	title: string;
	imageUrl: string;
	description: string;
	entryPrice: number;
	createdAt: Date;
}

interface FavoritesState {
	favorites: FavoriteItem[];
	addFavorite: (item: FavoriteItem) => void;
	removeFavorite: (giveawayId: string) => void;
	toggleFavorite: (item: FavoriteItem) => void;
	isFavorite: (giveawayId: string) => boolean;
	clearFavorites: () => void;
}

const createFavoritesStore = (userId?: string) => {
	const storageKey = userId ? `sorteio-favorites-storage-${userId}` : "sorteio-favorites-storage-guest";

	return create<FavoritesState>()(
		persist(
			(set, get) => ({
				favorites: [],

				addFavorite: (item: FavoriteItem) => {
					set((state) => {
						const exists = state.favorites.some((fav) => fav.giveawayId === item.giveawayId);
						if (exists) return state;

						return {
							favorites: [...state.favorites, item],
						};
					});
				},

				removeFavorite: (giveawayId: string) => {
					set((state) => ({
						favorites: state.favorites.filter((fav) => fav.giveawayId !== giveawayId),
					}));
				},

				toggleFavorite: (item: FavoriteItem) => {
					const state = get();
					if (state.isFavorite(item.giveawayId)) {
						state.removeFavorite(item.giveawayId);
					} else {
						state.addFavorite(item);
					}
				},

				isFavorite: (giveawayId: string) => {
					const state = get();
					return state.favorites.some((fav) => fav.giveawayId === giveawayId);
				},

				clearFavorites: () => {
					set({ favorites: [] });
				},
			}),
			{
				name: storageKey,
				version: 1,
			}
		)
	);
};

// Store instances cache
const favoritesStoreInstances = new Map<string, ReturnType<typeof createFavoritesStore>>();

export const useFavoritesStore = () => {
	const user = isLogged();
	const userId = user?.id || "guest";

	if (!favoritesStoreInstances.has(userId)) {
		favoritesStoreInstances.set(userId, createFavoritesStore(user?.id));
	}

	return favoritesStoreInstances.get(userId)!();
};
