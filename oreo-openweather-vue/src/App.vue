<script lang="ts">
import { defineComponent } from 'vue'
import type { GeoLocation } from '@/models/GeoLocation'

import Favorites from '@/components/Favorites.vue'
import Location from '@/components/Location.vue'
import Weather from '@/components/Weather.vue'
import Forecast from '@/components/Forecast.vue'

export default defineComponent({
    name: "LocationApp",
    data() {
        return {
            location: {} as GeoLocation
        };
    },
    methods: {
        async locationChanged(location: GeoLocation) {
            if (location) {
                this.location = location;
            }
        }
    },
    mounted() {

    },
    errorCaptured(err) {
      console.error('Error: ' + err)
    },
    components: { Location, Favorites, Weather, Forecast }
})
</script>

<template>
  <div class="">
    <Location @onLocationChanged='locationChanged' />
    <Favorites @onLocationChanged='locationChanged' />
  </div>
  <div class="">
    <Weather v-if="location" v-bind:location='location' />
    <Forecast v-if="location" v-bind:location='location' />
  </div>
</template>
