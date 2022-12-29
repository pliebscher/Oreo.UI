import { writable } from 'svelte/store'
import type { GeoLocation } from "src/models/GeoLocation";

const FAV_KEY: string = 'FAVORITES' 

export function addFavorite(location: GeoLocation) {
    const locations: GeoLocation[] = getFavorites()
    locations.push(location)
    localStorage.setItem(FAV_KEY, JSON.stringify(locations))
}

export function delFavorite(location: GeoLocation) {
    let locations: GeoLocation[] = getFavorites()
    const idx: number = locations.findIndex((value) => (value == location))
    localStorage.setItem(FAV_KEY, JSON.stringify(locations.splice(idx, 1))) 
}

export function getFavorites() {
    const locations: GeoLocation[] = JSON.parse(localStorage.getItem(FAV_KEY) || "[]")
    return locations
}