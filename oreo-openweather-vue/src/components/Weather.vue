<script lang="ts">

import { defineComponent, ref } from 'vue'
import axios from 'axios'

export default defineComponent({
        name: 'Weather',
        props:{
            location: {
                type: [Location],
                require: true
            }
        },
        data() {
            return {
                city: {} as City,
                metrics: {} as Metrics,
                weather: {} as Weather,
                weatherIconUrl: "01n", // https://openweathermap.org/weather-conditions#Icon-list
                curLat: 0
            }
        },
        methods: {
            async fetchWeather(loc?: Location) {
                // TODO: Axios error handling
                // TODO: Remove hard-coded API hostname:port
                if (loc?.lat && loc.lon) {
                    console.info('fetchWeather: ' + loc.lat + ', ' + loc.lon)
                    const weatherResponse = await axios.get('http://localhost:36416/api/Weather?Lat=' + loc.lat + '&Lon=' + loc.lon)
                    this.city = weatherResponse.data.city
                    this.metrics = weatherResponse.data.forecast[0].metrics
                    this.weather = weatherResponse.data.forecast[0].weather[0]
                    this.weatherIconUrl = weatherResponse.data.forecast[0].weather[0].icon
                    this.curLat = loc.lat
                    console.info('this.weather: ', weatherResponse.data.forecast[0].weather[0])
                }
            },
            getWeatherIconUrl() {
                return 'http://openweathermap.org/img/wn/' + this.weatherIconUrl + '@2x.png';
            },
            toCapWords(str: string) {
                return  (" " + str).toLowerCase().replace(/(\b[a-z](?!\s))/g, function(chr) {
                    return chr.toUpperCase();
                });
            }
        },
        async mounted() {
            console.info('Weather.mounted(): ' + this.location?.lat + ', ' + this.location?.lon)
            await this.fetchWeather(this.location)
        },
        async updated() {
            if (this.curLat !== this.location?.lat) {
                console.info('Weather.updated: ' + this.location)
                await this.fetchWeather(this.location)
            }
            
        }
    })
</script>

<template>
    <div class="weather">
        <h2>{{city?.name}}, {{location?.state}}</h2>
        <img v-bind:src='getWeatherIconUrl()' />
        <h2>{{metrics?.temp}}&deg;</h2>
        <div>{{toCapWords(weather?.description)}}</div>
        <div>Lat: {{location?.lat}} Lon: {{location?.lon}}</div>
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