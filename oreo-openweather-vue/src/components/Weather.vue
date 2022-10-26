<script lang="ts">

import { defineComponent } from 'vue'
import axios from 'axios'

export default defineComponent({
        name: 'Weather',
        data() {
            return {
                city: {} as City,
                metrics: {} as Metrics,
                weather: {} as Weather,
                weatherIconUrl: ""
            }
        },
        methods: {
            async fetchWeather() {
                const weatherResponse = await axios.get<WeatherResponse>('http://localhost:36416/api/Weather?Lat=37.82&Lon=-122.23')
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
            await this.fetchWeather()
        }
    })

</script>

<template>
    <h2>{{city.name}}</h2>    
    <img :src='getWeatherIconUrl()' />
    <div>Temp: {{metrics.temp}} </div>
 
</template>

