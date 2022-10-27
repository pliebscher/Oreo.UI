<script lang="ts">

import { defineComponent, ref } from 'vue'
import axios from 'axios'

export default defineComponent({
        name: 'Weather',
        props:{
            // TODO: prop validation
            lat: String,
            lon: String
        },
        setup() {

        },
        data() {
            return {
                city: {} as City,
                metrics: {} as Metrics,
                weather: {} as Weather,
                weatherIconUrl: "01n", // https://openweathermap.org/weather-conditions#Icon-list
            }
        },
        methods: {
            async fetchWeather(lat?: string, lon?: string) {
                // TODO: Axios error handling
                // TODO: Remove hard-coded API hostname:port
                const weatherResponse = await axios.get<WeatherResponse>('http://localhost:36416/api/Weather?Lat=' + lat + '&Lon=' + lon)
                this.city = weatherResponse.data.city
                this.metrics = weatherResponse.data.forecast[0].metrics
                this.weather = weatherResponse.data.forecast[0].weather[0]
                this.weatherIconUrl = weatherResponse.data.forecast[0].weather[0].icon
            },
            getWeatherIconUrl() {
                return 'http://openweathermap.org/img/wn/' + this.weatherIconUrl + '@2x.png';
            }
        },
        async mounted() {
            await this.fetchWeather(this.lat, this.lon)
        }
    })
</script>

<template>
    <div class="weather">
        <h2>{{city.name}}</h2>
        <img v-bind:src='getWeatherIconUrl()' />
        <h2>{{metrics.temp}}&deg;</h2>
        <div>{{weather.description}}</div>
        <div>Lat: {{lat}} Lon: {{lon}}</div>
    </div>
</template>

<style scoped>
.weather {
  border-radius: 25px;
  border: 2px solid #73AD21;
  padding: 20px;
  --width: 200px;
  --height: 150px;
}
</style>