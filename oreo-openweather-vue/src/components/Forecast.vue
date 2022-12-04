<script lang="ts">
import { defineComponent } from 'vue'
import type { Forecast } from '@/models/Forecast'
import { GeoLocation } from '@/models/GeoLocation'
import { getWeather } from '@/services/weather'

import ContentBox from './ContentBox.vue'

export default defineComponent({
    name: "forcastSFC",
    props: {
        location: {
            type: GeoLocation,
            required: true,
            default: {
                name: "LatLon",
                lat: 0,
                lon: 0
            },
            validator: (location: GeoLocation) => true
        }
    },
    watch: {
        location: {
            handler(val: GeoLocation, oldVal: GeoLocation) {
                if (val)
                    this.fetchWeather(val);
            }
        }
    },
    data() {
        return {
            forecast: {} as Forecast[],
        }
    },
    methods: {
        async fetchWeather(loc?: GeoLocation) {
            if (loc) {
                const weatherResponse = await getWeather(loc)
                this.forecast = weatherResponse?.forecast as Forecast[]
            }
        },
        getWeatherIconUrl(icon?: string, large?: boolean) {
            if (icon)
                return "http://openweathermap.org/img/wn/" + icon + (large ? "@2x" : "") + ".png"
        },
        toCapDescription(forecast: Forecast) {
            return (" " + forecast?.weather[0]?.description).toLowerCase().replace(/(\b[a-z](?!\s))/g, (chr) => {
                return chr.toUpperCase();
            });
        },
        getTime(forecast: Forecast) {
            if (forecast)
                return new Date(forecast.localDateTime).toLocaleTimeString().replace(":00", "")
        },
        getTemp(forecast: Forecast) {
            if (forecast)
                return forecast.metrics.temp.toString().split(".")[0]
        },
        getTitle() {
            return "Tomorrow - " + new Date(this.forecast[1]?.localDateTime).toLocaleDateString()
        },
    },
    mounted() {

    },
    components: { ContentBox }
})
</script>

<template>
    <ContentBox id="weather" v-if="forecast?.length > 0" :title="getTitle()">
        <div class="w-full shadow-lg rounded-lg bg-sky-700">
            <div v-for="fcast in forecast" class="grid grid-cols-3 auto-cols-min gap-1 py-0.5 shadow-lg rounded-lg">
                <div class="px-0 flex items-center justify-center">
                    <img class="" v-bind:src='getWeatherIconUrl(fcast.weather[0].icon, false)' /> 
                    {{getTemp(fcast)}}&deg;
                </div>
                <div class="p-0 flex items-center justify-center">
                    {{getTime(fcast)}}
                </div>
                <div class="p-2 flex items-center justify-center"> 
                    {{toCapDescription(fcast)}}
                </div>
            </div>
        </div>
    </ContentBox>
</template>