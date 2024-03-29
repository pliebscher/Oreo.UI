<script lang="ts">
import { defineComponent } from 'vue'
import { getLocations } from '@/services/weather'
import { useFavoritesStore } from '@/stores/favorites'

import type { GeoLocation } from '@/models/GeoLocation'
 
import ContentBox from './ContentBox.vue'

export default defineComponent({
    name: "Location",
    setup() {
        const favoriteStore = useFavoritesStore();
        return { favoriteStore };
    },
    data() {
        return {
            locations: [] as GeoLocation[],
            searchStr: '',
            errorVis: false,
        };
    },
    emits: {
        onLocationChanged(location: GeoLocation) { return location; }
    },
    methods: {
        async getLocations() {
            if (this.searchStr.length > 0) {
                var locArr = this.searchStr.split(/[,]+/);
                if (locArr.length > 0)
                    this.locations = await getLocations(locArr[0], locArr[1], "us");
            }
            if (this.locations.length > 0) {
                this.errorVis = false
            }
            else { // Location(s) Not Found...
                this.errorVis = true
            }
        },
        selectLocation(location: GeoLocation) {
            this.$emit("onLocationChanged", location);
        },
        clearSearch() {
            this.searchStr = ''
            this.locations = []
            this.errorVis = false
        },
    },
    mounted() {
        if (import.meta.env.DEV) {
            this.searchStr = "Piedmont"
        }
    },
    components: { ContentBox }
})
</script>

<template>
    <ContentBox>
        <form class="">
            <div id="search" class="flex rounded bg-white p-.5 border-slate-50">
                <button type="button" 
                        id="searchBtn"
                        aria-label="Search"
                        class="border-0
                               pl-2 pt-1 pr-2
                               rounded 
                               bg-white 
                               leading-tight
                               cursor-pointer" 
                        @click="( getLocations() )">
                    <svg xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            xml:space="preserve"
                            class="h-5 w-4" 
                            version="1.1" id="srchSvg"
                            viewBox="0 0 56.966 56.966" 
                            style="enable-background:new 0 0 56.966 56.966;">
                        <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                    </svg>
                </button>
                <input  type="searchTxt"
                        class=" flex 
                                border-0 border-white bg-white
                                rounded
                                pl-2
                                w-full                                
                                text-gray-500                                 
                                focus:outline-none " 
                        autofocus 
                        @keydown.enter="( getLocations() )" 
                        v-model="searchStr" 
                        placeholder="City [,State]" 
                        aria-label="City [,State]" 
                        aria-describedby="search-addon" />
                <button type="button" 
                        id="clearBtn"
                        aria-label="Clear Search"
                        class=" border-0
                                pt-1
                              bg-white
                                rounded 
                                cursor-pointer" 
                        @click="( clearSearch() )">
                    <svg xmlns="http://www.w3.org/2000/svg" 
                            width="20" 
                            height="20" 
                            viewBox="0 0 24 24" 
                            stroke="#64748b" 
                            stroke-width="2" 
                            stroke-linecap="round" 
                            stroke-linejoin="round" 
                            class="">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button> 
            </div>
        </form>

        <div v-if="errorVis">
            <div>&nbsp;</div>
            Location Not Found 😢
        </div>

        <table class="w-full pt-2" v-if="locations.length > 0">
            <tr v-for='location in locations'>
                <td class="">
                    <a @click="selectLocation(location)" href="#weather">{{location.name}}</a>&nbsp;{{location.state}}, {{location.country}}
                </td>
                <td class="content-end text-right">
                    <a v-if="!favoriteStore.favorites.includes(location)" @click="favoriteStore.addFovorite(location)" href="#favorites" alt="Add Favorite">⭐</a>
                </td>
            </tr>
        </table>
    </ContentBox>
</template>
