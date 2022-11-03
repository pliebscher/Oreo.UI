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
              location: {} as Location
            }
        },
        methods: {
            async locationChanged(location: Location) {
              console.info('App.locationChanged: ' + location?.lat.toString() + ', ' + location?.lon.toString())
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
  <header>
    <div class="wrapper">
      <Location @onLocationChanged="locationChanged" />
    </div>
  </header>
  <main>
    <Weather :location=location />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
  vertical-align: top;
}
.wrapper {
    --background-color: dimgray;
    vertical-align: top;
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
