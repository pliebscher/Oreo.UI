<script lang="ts">
import { defineComponent } from 'vue'
import { getLocations } from '@/services/weather'
import type { GeoLocation } from '@/models/GeoLocation'

const FAV_LOCATIONS_KEY = "favLocations"

export default defineComponent({
    name: "Location",
    data() {
        return {
            locations: {} as GeoLocation[],
            searchStr: "Piedmont ",
            errorVis: false,
            favLocations: {} as GeoLocation[]
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
        addFavorite(location: GeoLocation) {
            this.selectLocation(location)
            this.favLocations.push(location)
            localStorage.setItem(FAV_LOCATIONS_KEY, JSON.stringify(this.favLocations))
        },
        delFavorite(location: GeoLocation) {
           this.favLocations.splice(this.favLocations.indexOf(location), 1)
           localStorage.setItem(FAV_LOCATIONS_KEY, JSON.stringify(this.favLocations))
        },
        favExists(location: Location) : boolean {

            return true //!this.favLocations.includes(location)
        }
    },
    async mounted() {
        this.favLocations = JSON.parse(localStorage.getItem(FAV_LOCATIONS_KEY) || '[]')
    }
})
</script>

<template>
        <div v-if="favLocations?.length > 0" class="box-rnd-green">
             <div>
                <h3>Favorite Locations</h3>
                <hr />
                <table class="table table-striped table-hover">
                    <tr v-for="location in favLocations" class="">
                        <td class="loc">
                            <a @click="selectLocation(location)" href="#">{{location.name}}</a>{{location.state}}, {{location.country}}
                        </td>
                        <td class="fav">
                            <a @click="delFavorite(location)" href="#" alt="Nuke Favorite">🗑️</a>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <div v-if="favLocations?.length > 0">&nbsp;</div>
        <div class="box-rnd-green green">
            <div class="row row-no-gutters">
                <div class="col-sm-4">
                    <label for="locationTxt">City [,State]:</label>                                    
                </div>
                <div class="col-sm-5">                    
                    <input type="text" class="form-control form-control-sm" v-model="searchStr" placeholder="City, [State]">
                </div>
                <div class="col-sm-3">
                    <button class="btn btn-success btn-sm" @click="getLocations()">Lookup</button>
                </div>
            </div>
            <div>&nbsp;</div>
            <div v-if="errorVis">Location Not Found 😢</div>            
            <div v-if="locations.length > 0">
                <b>Found {{locations.length}} Locations</b>
                <hr />
                <table class="table">
                    <tr v-for='location in locations.values()' class="">
                        <td class="loc">
                            <a @click="selectLocation(location)" href="#">{{location.name}}</a>{{location.state}}, {{location.country}}
                        </td>
                        <td class="fav">
                            <a v-if="!favLocations.includes(location)" @click="addFavorite(location)" href="#" alt="Add Favorite">⭐</a>
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
.fav {
    text-align: right;
}
</style>