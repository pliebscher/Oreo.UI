<script lang="ts">
import Error from './Error.vue'

import { defineComponent, type PropType} from 'vue'
import axios, { type AxiosResponse } from 'axios'

import getLocations from '../services/weather'

export default defineComponent({
    name: "Location",
    data() {
        return {
            locations: {} as Location[],
            searchStr: "Piedmont ",
            locationsVis: false,
            errorVis: false,
        };
    },
    emits: {
        onLocationChanged(location: Location) {}
    },
    methods: {
        // TODO: Move to Axios module and;
        // TODO: Axios error handling
        // TODO: Remove hard-coded API hostname:port
        async fetchLocations(city?: string, state?: string, country?: string) {
            const url = "http://localhost:36416/api/GeoLocation?City=" + city + "&State=" + (state ? state : "") + "&Country=" + (country ? country : "US");
            const response: Location[] = (await axios.get<Location[]>(url)).data as Location[]
            this.locations = response
            //     .then((res) => { this.locations = res.data; })
            // .catch( (error) => { 

            //     if (error.response) {
            //         // The request was made and the server responded with a status code
            //         // that falls out of the range of 2xx
            //         console.log(error.response.data);
            //         console.log(error.response.status);
            //         console.log(error.response.headers);
            //         } else if (error.request) {
            //         // The request was made but no response was received
            //         // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            //         // http.ClientRequest in node.js
            //         console.log(error.request);
            //         } else {
            //         // Something happened in setting up the request that triggered an Error
            //         console.log('Error', error.message);
            //         }
            //         console.log(error.config);
            // })
        },
        async updateLocations() {
            // Parse location search string... TODO: Do this better!
            if (this.searchStr.length > 0) {
                var locArr = this.searchStr.split(/[\s,]+/);
                if (locArr.length > 0)
                    await this.fetchLocations(locArr[0], locArr[1], "us");
                     //await getLocations(locArr[0], locArr[1], "us").then( (res) => {this.locations = res.data} );
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
        async selectLocation(location: Location) {
            console.info("Location.selectLocation: " + location.toString());
            this.$emit("onLocationChanged", location);
        }
    },
    async mounted() {
        //this.getLocations()
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
        <div v-if="locations?.length == 0" style="color:greenyellow">Location Not Found 😢</div>
        <div v-if="locations?.length > 1">
            <b>Found {{locations?.length}} Locations</b>
            <hr />
            <div v-for="loc in locations">
            <a @click="selectLocation(loc)" href="#">{{loc.name}}</a>, {{loc.state}}, {{loc.country}}
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