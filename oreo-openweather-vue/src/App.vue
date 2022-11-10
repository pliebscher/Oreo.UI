<script setup lang="ts">
import Location from './components/Location.vue'
import Weather from './components/Weather.vue'
</script>

<script lang="ts">
import { defineComponent } from 'vue'
import type { GeoLocation } from './models/GeoLocation';

export default defineComponent({
        name: 'LocationApp',
        data() {
            return {
              location: {} as GeoLocation
            }
        },
        methods: {
            async locationChanged(location: GeoLocation) {
              if (location) {
                this.location = location
              }
            }
        },
        async mounted() {

        }
    })
</script>

<template>
  <div class="container">
    <div class="row row-no-gutters">
      <div class="col-md-4">
        <Location @onLocationChanged='locationChanged' />
      </div>
      <div class="col-md-4">
        <Weather v-bind:location='$data.location as GeoLocation' />
      </div>
    </div>
  </div>
</template>


