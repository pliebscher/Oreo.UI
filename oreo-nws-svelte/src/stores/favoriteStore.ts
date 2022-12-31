import { writable, type Writable } from 'svelte/store'
import type { GeoLocation } from "src/models/GeoLocation";

const FAV_KEY: string = 'FAVORITES' 

let _favs: GeoLocation[] = JSON.parse(localStorage.getItem(FAV_KEY) || "[]")

export const favorites: Writable<GeoLocation[]> = writable(_favs);

favorites.subscribe((value) => {
    localStorage.setItem(FAV_KEY, JSON.stringify(_favs))
})

export function addFavorite(location: GeoLocation) {
    favorites.update((favs) => {
        favs.push(location)
        return favs
    })
}

export function delFavorite(location: GeoLocation) {
    favorites.update((favs) => {
        favs.splice(favs.indexOf(location), 1)        
        return favs
    })
}
