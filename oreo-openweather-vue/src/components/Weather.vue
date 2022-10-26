<script setup lang="ts">

</script>

<template>
    <h2>{{city.name}}</h2>
    <!-- <img :src="getWeatherIconUrl()"> -->
    <div>Temp: {{forcast.metrics.temp}}</div>

</template>

<script lang="ts">

import { defineComponent } from 'vue'
import axios from 'axios'

export default defineComponent({
        name: 'Weather',
        data() {
            return {
                city: {} as City,
                forcast: {} as Forecast
            }
        },
        methods: {
            async fetchWeather() {
                const weatherResponse = await axios.get<WeatherResponse>('http://localhost:36416/api/Weather?Lat=37.82&Lon=-122.23')
                this.city = weatherResponse.data.city
                this.forcast = weatherResponse.data.forecast[0]
            },
            // getWeatherIconUrl() {
            //     return 'http://openweathermap.org/img/wn/' + this.forcast.weather[0].icon + '@2x.png';
            // }
        },
        async mounted() {
            await this.fetchWeather()
        }
    })

</script>