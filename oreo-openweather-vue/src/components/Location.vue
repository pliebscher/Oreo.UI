<script lang="ts">

import { defineComponent, type StyleValue} from 'vue'
import axios from 'axios'

export default defineComponent({
        name: 'Location',
        data() {
            return {
                location: {} as Location,
                locationStr: 'Piedmont, CA',
                locationVis: false,
                errorVis: false,
                resultCount: 1,
            }
        },
        methods: {
            async fetchLocation(city?: string, state?: string, country?: string) {
                // TODO: Axios error handling
                // TODO: Remove hard-coded API hostname:port
                const locationResponse = await axios.get<Location[]>('http://localhost:36416/api/GeoLocation?City=' + city +'&State=' + (state ? state : '') +'&Country=' + (country ? country : 'US'))
                this.location = locationResponse.data[0]
                this.resultCount = locationResponse.data.length
            },
            async getLocation() {

                if (this.locationStr.length > 0) {

                    var locArr = this.locationStr.split(/[\s,]+/);

                    if (locArr.length > 0)
                        await this.fetchLocation(locArr[0], locArr[1], 'us')
                }

                if (this.location?.lat && this.location?.lon) {
                    console.info("Location.onLocationChanged: " + this.location.lat.toString() + ', ' + this.location.lon.toString())
                    this.locationVis = true
                    this.errorVis = false
                    // TODO: Pass full Location object...
                    this.$emit("onLocationChanged", this.location.lat, this.location.lon)
                } else {
                    this.locationVis = false
                    this.errorVis = true
                    this.$emit("onLocationChanged", 0, 0)
                }

            }
        },
        async mounted() {
            this.getLocation()
        }
    })
</script>

<template>

    <div class="location">
        <label for="locationTxt">City, State: </label>
        <input type="text" v-model="locationStr" placeholder="City, [State, Country]">
        <button @click="getLocation()">Lookup</button>
        <div>Lat: {{location?.lat}} Lon: {{location?.lon}} Num: {{resultCount}}</div>
        <div v-if="errorVis" style="color:greenyellow">Location Not Found 😢</div>
    </div>

</template>

<style scoped>
.location {
  border-radius: 25px;
  border: 2px solid #73AD21;
  padding: 20px;
}
</style>