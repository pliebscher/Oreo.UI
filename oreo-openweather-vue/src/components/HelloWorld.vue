<script setup lang="ts">

defineProps<{
  msg: string
}>()

</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      {{ city }}
    </h3>
  </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue'
import axios from 'axios'

interface Weather {
  city: City
}

interface City {
  name: string
}

export default defineComponent({
        name: 'Weather',
        data() {
            return {
                city: 'None',
                fetchingWeather: false
            }
        },
        methods: {
            async fetchWeather() {
                const weatherResponse = await axios.get<Weather>('http://localhost:36416/api/Weather?Lat=37.82&Lon=-122.23')
                this.city = weatherResponse.data.city.name
            }
        },
        async mounted() {
            await this.fetchWeather()
        }
    })

</script>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings {
  border: 2px;
  border-color: aqua;
}

.greetings h1,
.greetings h3 {
  text-align: center;
  border: 2px;
  color: rgb(255, 241, 240);
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
