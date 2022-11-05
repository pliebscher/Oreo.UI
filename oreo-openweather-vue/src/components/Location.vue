<script lang="ts">

import { defineComponent, type StyleValue} from 'vue'
import axios, { type AxiosResponse } from 'axios'

export default defineComponent({
        name: 'Location',
        data() {
            return {
                locations: {} as Location[],
                searchStr: 'Piedmont ',
                locationsVis: false,
                errorVis: false,
            }
        },
        emits:{
            onLocationChanged(location: Location) { console.info('---> ' + location); return true }
        },
        methods: {
            // TODO: Move to Axios module and;
            // TODO: Axios error handling
            // TODO: Remove hard-coded API hostname:port
            async fetchLocations(city?: string, state?: string, country?: string) {
                const locationResponse = await axios.get('http://localhost:36416/api/GeoLocation?City=' + city +'&State=' + (state ? state : '') +'&Country=' + (country ? country : 'US'))
                this.locations = locationResponse.data 
            },
            async getLocations() {

                // Parse location search string... TODO: Do this better!
                if (this.searchStr.length > 0) {
                    var locArr = this.searchStr.split(/[\s,]+/);
                    if (locArr.length > 0)
                        await this.fetchLocations(locArr[0], locArr[1], 'us')
                }

                if (this.locations.length > 0) {
                    if (this.locations.length == 1) {
                        this.selectLocation(this.locations[0])
                        this.locationsVis = false
                    } else {
                        this.locationsVis = true
                    }
                    this.errorVis = false
                } else { // Location(s) Not Found...
                    this.locationsVis = false
                    this.errorVis = true
                }
            },
            async selectLocation(location: Location) {
                    console.info("Location.selectLocation: " + location.toString())
                    this.$emit("onLocationChanged", location)
            }
        },
        async mounted() {
            //this.getLocations()
        }
    })
</script>

<template>

    <div class="locationSearch">
        <label for="locationTxt">City, State: </label>
        <input type="text" v-model="searchStr" placeholder="City, [State]">
        <button @click="getLocations()">Lookup</button>
        <div v-if="locations?.length == 0" style="color:greenyellow">Location Not Found 😢</div>
        <div v-if="locations?.length > 1">
            <h3>Found {{locations?.length}} Locations</h3>
            <hr />
            <div v-for="loc in locations.values()">
            <a @click="selectLocation(loc)" href="#">{{loc.name}}</a>, {{loc.state}}, {{loc.toString()}}
        </div>
        </div>

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