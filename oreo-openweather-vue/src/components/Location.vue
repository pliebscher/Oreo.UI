<script lang="ts">
import Error from './Error.vue'

import { defineComponent, type PropType} from 'vue'
import axios, { type AxiosResponse } from 'axios'

import getLocations from '../services/weather'
import type { GeoLocation } from '@/models/GeoLocation'

export default defineComponent({
    name: "Location",
    data() {
        return {
            locations: [] as GeoLocation[],
            searchStr: "Piedmont ",
            locationsVis: false,
            errorVis: false,
        };
    },
    emits: {
        onLocationChanged(location: GeoLocation) {
            console.info('onLocationChanged.Validate: ' + location)
            return location !== undefined
        }
    },
    methods: {
        // TODO: Move to Axios module and;
        // TODO: Axios error handling
        // TODO: Remove hard-coded API hostname:port
        async fetchLocations(city?: string, state?: string, country?: string) {
            const url = "http://localhost:36416/api/GeoLocation?City=" + city + "&State=" + (state ? state : "") + "&Country=" + (country ? country : "US");
            const locationResponse = await axios.get<GeoLocation[]>(url)
            this.locations = locationResponse.data 
        },
        async updateLocations() {
            // Parse location search string... TODO: Do this better!
            if (this.searchStr.length > 0) {
                var locArr = this.searchStr.split(/[\s,]+/);
                if (locArr.length > 0)
                    await this.fetchLocations(locArr[0], locArr[1], "us");
            }
            if (this.locations.length > 0) {
                if (this.locations.length == 1) {
                    this.selectLocation(this.locations[0]);
                    this.locationsVis = false;
                }
                else {
                    this.locationsVis = true;
                }
                this.errorVis = false;
            }
            else { // Location(s) Not Found...
                this.locationsVis = false;
                this.errorVis = true;
            }
        },
        async selectLocation(location: GeoLocation) {
            console.info("Location.selectLocation: " + location.toString());
            this.$emit("onLocationChanged", location);
        }
    },
    async mounted() {

    },
    components: { Error }
})
</script>

<template>

    <div class="locationSearch">
        <label for="locationTxt">City, State: &nbsp;</label>
        <input type="text" v-model="searchStr" placeholder="City, [State]">
        <button @click="updateLocations()">Lookup</button>
        <div>&nbsp;</div>
        <div v-if="errorVis" style="color:greenyellow">Location Not Found 😢</div>
        <div v-if="locations?.length > 1">
            <b>Found {{locations?.length}} Locations</b>
            <hr />
            <div v-for="location in locations">
            <a @click="selectLocation(location)" href="#">{{location.name}}</a>, {{location.state}}, {{location.country}}
        </div>
        </div>
<!--Error :show='errorVis'/ -->
    </div>
    
</template>

<style scoped>
.locationSearch {
  border-radius: 25px;
  border: 2px solid #73AD21;
  padding: 20px;
}

h3 {
    color: #73AD21;
}
</style>