// TODO: Not working with ssr!
import { browser } from '$app/environment'
import { writable, type Writable } from 'svelte/store'
import type { arcGISSearchSuggestion } from '../models/arcGISSearchSuggestion';

const FAV_KEY: string = 'FAVORITES'
const CUR_KEY: string = 'SELECTED_FAVORITE'

let _favs: arcGISSearchSuggestion[] = browser? JSON.parse(localStorage.getItem(FAV_KEY) || "[]") : []
let _curr: arcGISSearchSuggestion = browser? JSON.parse(localStorage.getItem(CUR_KEY) || '{}') : {}

export const favorites: Writable<arcGISSearchSuggestion[]> = writable(_favs)
export const currentFav: Writable<arcGISSearchSuggestion> = writable(_curr)

// Wire up subscriptions...
favorites.subscribe( (value) => {
    if (browser)
        localStorage.setItem(FAV_KEY, JSON.stringify(value))
} )

currentFav.subscribe( (value) => {
    if (browser)
        localStorage.setItem(CUR_KEY, JSON.stringify(value))
} )

// Add a favorite...
export function addFavorite(location: arcGISSearchSuggestion) {
    if (!containsFavorite(location)) // Make sure it's only added once
        favorites.update((favs) => {
            favs.push(location)
            return favs
        })
}

// Remove a favorite...
export function delFavorite(location: arcGISSearchSuggestion) {
    favorites.update((favs) => {
        favs.splice(favs.indexOf(location), 1)        
        return favs
    })
}

// Set the currenty selected location...
export function setCurrentFav(location: arcGISSearchSuggestion) {
    currentFav.update((newFav) => {
        newFav = location
        return newFav
    })
}

// Clear favorites & current/selected favorite...
export function clearFavorites() {
    favorites.update((favs) => {
        favs = []       
        return favs
    })
    currentFav.update((curFav) => {
        curFav = {} as arcGISSearchSuggestion
        return curFav
    })
}

//
export function containsFavorite(favorite:arcGISSearchSuggestion) {
    return _favs.some(fav => fav.magicKey.trim() === favorite.magicKey.trim())
}