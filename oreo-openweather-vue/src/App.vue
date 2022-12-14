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
        },
        showToast(msg: any) {
          const x: HTMLElement | null = document.getElementById("toaster")
          if (x) {
            x.innerText = msg
            x.className = "show"
            setTimeout(() => { 
              x.className = x.className.replace("show", "")
            }, 3000)
          }      
        },
    },
    mounted() {

    },
    errorCaptured(err) {
      this.showToast(err)
    },
    components: { Location, Favorites, Weather, Forecast }
})
</script>

<template>
  <!-- NavBar -->            
  <div class="fixed bg-gradient-to-r from-gray-900 to-blue-700 shadow-md z-50 w-full px-5 py-2 ">
      Weather
  </div>
  <!-- Content -->
  <div class="mt-10 ml-0" >
    <div class="">
      <Location @onLocationChanged='locationChanged' />
      <Favorites @onLocationChanged='locationChanged' />
      <div id="toaster" class="border rounded bg-red-900"></div>
    </div>
    <div class="">
      <Weather v-if="location" v-bind:location='location' />
      <Forecast v-if="location" v-bind:location='location' />    
    </div>
  </div>
</template>
