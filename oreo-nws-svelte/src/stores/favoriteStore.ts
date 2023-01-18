//
// This (localStorage) does not work when SSR is enabled...
//
import { writable, type Writable } from 'svelte/store'
import type { GeoLocation } from "src/models/GeoLocation";

const FAV_KEY: string = 'FAVORITES'
const CUR_KEY: string = 'SELECTED_FAVORITE'

let _favs: GeoLocation[] = JSON.parse(localStorage.getItem(FAV_KEY) || "[]")
let _curr: GeoLocation = JSON.parse(localStorage.getItem(CUR_KEY) || '{}')

export const favorites: Writable<GeoLocation[]> = writable(_favs)
export const currentFav: Writable<GeoLocation> = writable(_curr)

// Wire up subscriptions...
favorites.subscribe((value) => {
    localStorage.setItem(FAV_KEY, JSON.stringify(_favs))
})

currentFav.subscribe((value) => {
    console.info('setCurrentFav.update')
    localStorage.setItem(CUR_KEY, JSON.stringify(value))
})

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
    console.info('setCurrentFav')
    currentFav.update((cur) => {
        cur = location
        return cur
    })
}

// // Set the currenty selected location...
// export function getCurrentFav() {
//     return _curr
// }