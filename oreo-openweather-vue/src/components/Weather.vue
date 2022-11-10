<script lang="ts">

import { defineComponent, ref, type PropType } from 'vue'
import axios from 'axios'
import { getWeather } from '@/services/weather'
import { GeoLocation } from '@/models/GeoLocation'

export default defineComponent({
        name: 'Weather',
        props:{
            location: {
                type: GeoLocation,
                required: true,
                default: {
                    name: "Test",
                    lat: 0,
                    lon: 0
                },
                validator: (location: GeoLocation) => true
            }
        },
        watch: {
            location: {
                handler (val, oldVal) {
                    console.warn(val)
                    console.info('Weather.updated: ' + this.location)
                    this.fetchWeather(this.location)
                }
            }
        },
        data() {
            return {
                city: {} as City,
                metrics: {} as Metrics,
                weather: {} as Weather,
                weatherIcon: "01n", // https://openweathermap.org/weather-conditions#Icon-list
            }
        },
        methods: {
            async fetchWeather(loc?: GeoLocation) {
                if (loc?.lat && loc.lon) {
                    const weatherResponse = await getWeather(loc)
                    this.city = weatherResponse?.city as City
                    this.metrics = weatherResponse?.forecast[0].metrics as Metrics
                    this.weather = weatherResponse?.forecast[0].weather[0] as Weather
                    this.weatherIcon = weatherResponse?.forecast[0].weather[0].icon as string
                }
            },
            getWeatherIconUrl() {
                return 'http://openweathermap.org/img/wn/' + this.weatherIcon + '@2x.png';
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
    })
</script>

<template>
    <div v-if="location?.lat !== undefined" class="box-rnd-green">
        <div>
            <h2>{{city?.name}}, {{location?.state}}</h2>
            <img v-bind:src='getWeatherIconUrl()' />
            <h2>{{metrics?.temp}}&deg;</h2>
            <div>{{toCapWords(weather?.description)}}</div>
            <div>Lat: {{location?.lat}} Lon: {{location?.lon}}</div>
        </div>
    </div>
</template>

<style scoped>

</style>