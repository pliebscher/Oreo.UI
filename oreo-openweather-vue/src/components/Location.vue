<script lang="ts">

import { defineComponent } from 'vue'
import axios from 'axios'

export default defineComponent({
        name: 'Location',
        data() {
            return {
                location: {} as Location,
                loccationStr: 'Piedmont, CA'
            }
        },
        methods: {
            async fetchLocation(city?: string, state?: string, country?: string) {
                // TODO: Axios error handling
                // TODO: Remove hard-coded API hostname:port
                const locationResponse = await axios.get<Location[]>('http://localhost:36416/api/GeoLocation?City=' + city +'&State=' + state +'&Country=' + country)
                this.location = locationResponse.data[0]
            },
            async getLocation() {

                if (this.loccationStr.length > 0) {

                    var locArr = this.loccationStr.split(/[\s,]+/);

                    if (locArr.length > 0)
                        await this.fetchLocation(locArr[0], locArr[1], 'us')
                }

                if (this.location?.lat && this.location?.lon) {
                    console.info("Location.onLocationChanged: " + this.location.lat.toString() + ', ' + this.location.lon.toString())
                    this.$emit("onLocationChanged", this.location.lat, this.location.lon)
                }

            }
        },
        async mounted() {
            
        }
    })
</script>

<template>

    <div class="location">
        <label for="locationTxt">City, State: </label>
        <input type="text" v-model="loccationStr" placeholder="City, [State, Country]">
        <button @click="getLocation()">Lookup</button>
        <div>Lat: {{location?.lat}} Lon: {{location?.lon}}</div>
    </div>

</template>

<style scoped>
.location {
  border-radius: 25px;
  border: 2px solid #73AD21;
  padding: 20px;
  --width: 200px;
  --height: 150px;
}
</style>