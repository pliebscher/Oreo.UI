import { browser } from '$app/environment';
import { writable, type Writable } from 'svelte/store';
import type { Favorite } from './favorite';

const FAV_KEY: string = 'FAVORITES';
const CUR_KEY: string = 'SELECTED_FAVORITE';

let _favs: Favorite[] = browser ? JSON.parse(localStorage.getItem(FAV_KEY) || "[]") : [];
let _curr: Favorite = browser ? JSON.parse(localStorage.getItem(CUR_KEY) || '{}') : {} as Favorite;

export const favorites: Writable<Favorite[]> = writable(_favs);
export const currentFav: Writable<Favorite> = writable(_curr);

// Wire up subscriptions...
favorites.subscribe((value) => {
    if (browser) {
        localStorage.setItem(FAV_KEY, JSON.stringify(value));
        _favs = value; // Update local cache
    }
});

currentFav.subscribe((value) => {
    if (browser) {
        localStorage.setItem(CUR_KEY, JSON.stringify(value));
        _curr = value; // Update local cache
    }
});

// Add a favorite...
export function addFavorite(location: Favorite) {
    if (!containsFavorite(location)) { // Make sure it's only added once
        favorites.update((favs) => {
            favs.push(location);
            return favs;
        });
    }
}

// Remove a favorite...
export function delFavorite(location: Favorite) {
    favorites.update((favs) => {
        const index = favs.findIndex(fav => 
            Math.abs(fav.lat - location.lat) < 0.0001 && 
            Math.abs(fav.lon - location.lon) < 0.0001
        );
        if (index !== -1) {
            favs.splice(index, 1);
        }
        return favs;
    });
}

// Set the currently selected location...
export function setCurrentFav(location: Favorite) {
    currentFav.update(() => {
        return location;
    });
}

// Clear favorites & current/selected favorite...
export function clearFavorites() {
    favorites.update(() => {
        return [];
    });
    currentFav.update(() => {
        return {} as Favorite;
    });
}

// Check if favorite exists by comparing lat/lon (with small tolerance for floating point)
export function containsFavorite(favorite: Favorite): boolean {
    return _favs.some(fav => 
        Math.abs(fav.lat - favorite.lat) < 0.0001 && 
        Math.abs(fav.lon - favorite.lon) < 0.0001
    );
}