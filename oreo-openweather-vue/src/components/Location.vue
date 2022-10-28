<script lang="ts">

import { defineComponent, ref } from 'vue'
import axios from 'axios'

export default defineComponent({
        name: 'Location',
        data() {
            return {
                lat: '',
                lon: ''
            }
        },
        methods: {
            async fetchLocation(city?: string, state?: string, country?: string) {
                // TODO: Axios error handling
                // TODO: Remove hard-coded API hostname:port
                const location = await axios.get<Location[]>('http://localhost:36416/api/GeoLocation?City=' + city +'&State=' + state +'&Country=' + country)
                this.lat = location.data[0].lat.toString()
                this.lon = location.data[0].lon.toString()
            },
            getLocation() {
                console.log("getLocation!")
            }
        },
        async mounted() {
            await this.fetchLocation('piedmont', 'ca', 'us')
        }
    })
</script>

<template>

    <div class="location">
        <label for="locationTxt">City, State: </label>
        <input type="text" id="locationTxt">
        <button @click="getLocation()">Lookup</button>
        <div>Lat: {{lat}} Lon: {{lon}}</div>
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