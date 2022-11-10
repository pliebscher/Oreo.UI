<script setup lang="ts">
import Location from './components/Location.vue'
import Weather from './components/Weather.vue'
import Error from './components/Error.vue'
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
              console.info('App.locationChanged: ')
              console.info(location)
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
  <div class=".container-fluid">
    <div class="row">
      <div class="col">
        <Location @onLocationChanged='locationChanged' />
      </div>
      <div class="col-md-7">
        <Weather v-bind:location='$data.location as GeoLocation' />
      </div>
    </div>

  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  vertical-align: top;
}
.wrapper {
    --background-color: rgb(146, 145, 145);
    --vertical-align: top;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
    vertical-align: top;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

}
</style>
