<script lang="ts">

import { defineComponent, ref } from 'vue'
import axios from 'axios'

export default defineComponent({
        name: 'Weather',
        props:{
            lat: String,
            lon: String
        },
        data() {
            return {
                city: {} as City,
                metrics: {} as Metrics,
                weather: {} as Weather,
                weatherIconUrl: "01n", // https://openweathermap.org/weather-conditions#Icon-list
                currentLat: "",
                currentLon: ""
            }
        },
        methods: {
            async fetchWeather(lat?: string, lon?: string) {
                // TODO: Axios error handling
                // TODO: Remove hard-coded API hostname:port
                if (lat && lon) {
                    console.info('fetching weather: ' + lat + ', ' + lon)
                    const weatherResponse = await axios.get<WeatherResponse>('http://localhost:36416/api/Weather?Lat=' + lat + '&Lon=' + lon)
                    this.city = weatherResponse.data.city
                    this.metrics = weatherResponse.data.forecast[0].metrics
                    this.weather = weatherResponse.data.forecast[0].weather[0]
                    this.weatherIconUrl = weatherResponse.data.forecast[0].weather[0].icon
                    this.currentLat = lat
                    this.currentLon = lon
                }
            },
            getWeatherIconUrl() {
                return 'http://openweathermap.org/img/wn/' + this.weatherIconUrl + '@2x.png';
            },
            toCamelSentence(str: string) {
                // TODO: Fix RegEx to upp case all words without removing spaces
                return  (" " + str).toLowerCase().replace(/[^a-zA-Z0-9]+(.)/, function(match, chr) {
                    return chr.toUpperCase();
                });
            }
        },
        async mounted() {
            console.info('Weather.mounted(): ' + this.lat + ', ' + this.lon)
            await this.fetchWeather(this.lat, this.lon)
        },
        async updated() {
            if (this.lat != this.currentLat || this.lon != this.currentLon) {
                console.info('Weather.updated()')
                await this.fetchWeather(this.lat, this.lon)
            }
            
        }
    })
</script>

<template>
    <div class="weather">
        <h2>{{city?.name}}</h2>
        <img v-bind:src='getWeatherIconUrl()' />
        <h2>{{metrics?.temp}}&deg;</h2>
        <div>{{toCamelSentence(weather?.description)}}</div>
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