<script lang="ts">
import { defineComponent } from 'vue'
import { getLocations } from '@/services/weather'
import type { GeoLocation } from '@/models/GeoLocation'
import { useFavoritesStore } from '@/stores/favorites'

export default defineComponent({
    name: "Location",
    setup() {
        const favoriteStore = useFavoritesStore()
        return { favoriteStore }
    },
    data() {
        return {
            locations: [] as GeoLocation[],
            searchStr: "Piedmont ",
            errorVis: false,
        };
    },
    emits: {
        onLocationChanged(location: GeoLocation) { return location }
    },
    methods: {
        async getLocations() {
            // Parse location search string... TODO: Do this better!
            // https://stackoverflow.com/questions/35784962/regex-for-capturing-city-state-zip-from-an-address-string
            if (this.searchStr.length > 0) {
                var locArr = this.searchStr.split(/[,]+/);
                if (locArr.length > 0)
                    this.locations = await getLocations(locArr[0], locArr[1], "us")
            }

            if (this.locations.length > 0) {
                this.errorVis = false      
            }
            else { // Location(s) Not Found...
                this.errorVis = true
            }
        },
        async selectLocation(location: GeoLocation) {
            this.$emit("onLocationChanged", location);
        },
    },
})
</script>

<template>

    <div v-if="favoriteStore.favorites?.length > 0">&nbsp;</div>

    <div id="search" class="box-rnd-green green">
        <form >
            <div class="input-group">
                <input type="search" autofocus class="form-control form-control-sm rounded" @keydown.enter="getLocations()" v-model="searchStr" placeholder="City [,State]" aria-label="City [,State]" aria-describedby="search-addon" />
                <button type="button" class="btn btn-success btn-sm" @click="getLocations()">
                    <img class="svgsearch" src="/search.svg" />
                </button>            
            </div>
        </form>

        <div v-if="errorVis">
            <div>&nbsp;</div>
            Location Not Found 😢
        </div>

        <div v-if="locations.length > 0">
            <div>&nbsp;</div>
            <table class="table">
                <tr v-for='location in locations.values()' class="">
                    <td class="loc">
                        <a @click="selectLocation(location)" href="#weather">{{location.name}}</a>{{location.state}}, {{location.country}}
                    </td>
                    <td class="fav">
                        <a v-if="!favoriteStore.favorites.includes(location)" @click="favoriteStore.addFovorite(location)" href="#favorites" alt="Add Favorite">⭐</a>
                    </td>
                </tr>
            </table>
        </div>
    </div>

    <div>&nbsp;</div>

</template>

<style scoped>
.loc {
    color: rgba(235, 235, 235, 0.64);
}

.svgsearch {
    display: inline-flex;
    align-self: center;
    position: center;
    height: 1.5em;
    width: 1.5em;
}
.svgsearch img {
    height: 1.25em;
    width: 1.25em;
}

</style>