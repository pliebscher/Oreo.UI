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
                const locationResponse = await axios.get<Location[]>('http://localhost:36416/api/GeoLocation?City=' + city +'&State=' + state +'&Country=' + country)
                this.lat = locationResponse.data[0].lat.toString()
                this.lon = locationResponse.data[0].lon.toString()
            },
        },
        async mounted() {
            await this.fetchLocation('piedmont', 'ca', 'us')
        }
    })
</script>

<template>
    <div>Lat: {{lat}} Lon: {{lon}}</div>
</template>