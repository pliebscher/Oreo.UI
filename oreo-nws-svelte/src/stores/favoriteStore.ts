// TODO: Not working with ssr!
import { browser } from '$app/environment'
import { writable, type Writable } from 'svelte/store'
import type { GeoLocation } from "src/models/GeoLocation";

const FAV_KEY: string = 'FAVORITES'
const CUR_KEY: string = 'SELECTED_FAVORITE'

let _favs: GeoLocation[] = browser? JSON.parse(localStorage.getItem(FAV_KEY) || "[]") : []
let _curr: GeoLocation = browser? JSON.parse(localStorage.getItem(CUR_KEY) || '{}') : {}

export const favorites: Writable<GeoLocation[]> = writable(_favs)
export const currentFav: Writable<GeoLocation> = writable(_curr)

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
export function addFavorite(location: GeoLocation) {
    favorites.update((favs) => {
        favs.push(location)
        return favs
    })
}

// Remove a favorite...
export function delFavorite(location: GeoLocation) {
    favorites.update((favs) => {
        favs.splice(favs.indexOf(location), 1)        
        return favs
    })
}

// Set the currenty selected location...
export function setCurrentFav(location: GeoLocation) {
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
        curFav = {} as GeoLocation
        return curFav
    })
}