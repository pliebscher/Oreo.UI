import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import type { GeoLocation } from '@/models/GeoLocation'

const FAV_LOCATIONS_KEY = "favLocations"

export const useFavoritesStore = defineStore({
  id: 'favorites',
  state: () => ({
    favorites: useLocalStorage(FAV_LOCATIONS_KEY, [] as GeoLocation[])
  }),
  getters: {
    getFavorites: (state) => {
      return state.favorites
    }
  },
  actions: {
    addFovorite(location: GeoLocation) {
      this.favorites.push(location)
    },
    delFovorite(location: GeoLocation) {
      this.favorites.splice(this.favorites.indexOf(location), 1)
    },
  }
})
