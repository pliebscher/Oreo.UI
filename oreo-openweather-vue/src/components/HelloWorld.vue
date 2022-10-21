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
  City: string
}

export default defineComponent({
        name: 'Weather',
        data() {
            return {
                city: '',
                fetchingWeather: false
            }
        },
        methods: {
            async fetchWeather() {
                const weatherResponse = await axios.get<Weather>('http://localhost:36416/api/Weather?Lat=37.82&Lon=-122.23')
                this.city = weatherResponse.data.City
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

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
