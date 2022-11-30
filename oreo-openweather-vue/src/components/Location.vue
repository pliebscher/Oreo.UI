<script lang="ts">
import { defineComponent } from 'vue'
import { getLocations } from '@/services/weather'
import type { GeoLocation } from '@/models/GeoLocation'
import { useFavoritesStore } from '@/stores/favorites'
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
            searchStr: "",
            errorVis: false,
        };
    },
    emits: {
        onLocationChanged(location: GeoLocation) { return location; }
    },
    methods: {
        async getLocations() {
            // Parse location search string... TODO: Do this better!
            // https://stackoverflow.com/questions/35784962/regex-for-capturing-city-state-zip-from-an-address-string
            if (this.searchStr.length > 0) {
                var locArr = this.searchStr.split(/[,]+/);
                if (locArr.length > 0)
                    this.locations = await getLocations(locArr[0], locArr[1], "us");
            }
            if (this.locations.length > 0) {
                this.errorVis = false;
            }
            else { // Location(s) Not Found...
                this.errorVis = true;
            }
        },
        async selectLocation(location: GeoLocation) {
            this.$emit("onLocationChanged", location);
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
        <form class="w-full max-w-sm">
            <div id="search" class="flex items-center border-b py-2">
                <input  type="search"
                        class=" shadow 
                                appearance-none 
                                border rounded 
                                w-full
                                py-1 px-2 
                                text-gray-700 
                                leading-tight 
                                focus:outline-none 
                                focus:shadow-outline" 
                        autofocus 
                        @keydown.enter="getLocations()" 
                        v-model="searchStr" 
                        placeholder="City [,State]" 
                        aria-label="City [,State]" 
                        aria-describedby="search-addon" />
                <button
                        type="button" 
                        class="shadow appearance-none border rounded text-gray-700 leading-tight" @click="getLocations()">
                    <img class="svgsearch" src="/search.svg" />
                </button>            
            </div>
        </form>

        <div v-if="errorVis">
            <div>&nbsp;</div>
            Location Not Found 😢
        </div>

        <div v-if="locations.length > 0">
            <table class="table w-full">
                <tr v-for='location in locations.values()'>
                    <td class="">
                        <a @click="selectLocation(location)" href="#weather">{{location.name}}</a>&nbsp;{{location.state}}, {{location.country}}
                    </td>
                    <td class="content-end">
                        <a v-if="!favoriteStore.favorites.includes(location)" @click="favoriteStore.addFovorite(location)" href="#favorites" alt="Add Favorite">⭐</a>
                    </td>
                </tr>
            </table>
        </div>
    </ContentBox>
</template>

<style scoped>

.svgsearch {
    display: inline-flex;
    align-self: center;
    position: center;
    height: 1.5em;
    width: 1.5em;
    padding-left: 5px;
}
.svgsearch img {
    height: 1.25em;
    width: 1.25em;
}

</style>