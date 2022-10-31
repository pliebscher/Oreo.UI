<script setup lang="ts">
import Location from './components/Location.vue'
import Weather from './components/Weather.vue'
</script>

<script lang="ts">
 
import { defineComponent } from 'vue'

export default defineComponent({
        name: 'LocatipnApp',
        data() {
            return {
              lat: 0,
              lon: 0
            }
        },
        methods: {
            async locationChanged(lat?: number, lon?: number) {
              console.info('App.locationChanged: ' + lat?.toString() + ', ' + lon?.toString())
              if (lat && lon) {
                this.lat = lat
                this.lon = lon
              }
 
            }
        },
        async mounted() {
            
        }
    })
</script>

<template>
  <header>
    <div class="wrapper">
      <Location @onLocationChanged="locationChanged" />
    </div>
  </header>
  <main>
    <Weather :lat="lat?.toString()" :lon="lon?.toString()" />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
  --background-color: dimgray;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
