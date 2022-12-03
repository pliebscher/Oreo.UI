<script lang="ts">

import { defineComponent, ref, type PropType } from 'vue'
import { getWeather } from '@/services/weather'
import { GeoLocation } from '@/models/GeoLocation'
import type { City } from '@/models/City'
import type { Metrics } from '@/models/Metrics'
import type { Forecast } from '@/models/Forecast'
import type { Weather } from '@/models/Weather'
import ContentBox from './ContentBox.vue'

export default defineComponent({
    name: "Weather",
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
            city: {} as City,
            metrics: {} as Metrics,
            currentWeather: {} as Weather,
            forecast: [] as Forecast[],            
        };
    },
    methods: {
        // TODO: Add new fetchWeather and weather service method to correct OW API 
        // ----
        // TODO: Change this to fetchForecast..
        async fetchWeather(loc?: GeoLocation) {
            if (loc) {
                const weatherResponse = await getWeather(loc)
                this.city = weatherResponse?.city as City
                this.metrics = weatherResponse?.forecast[0].metrics as Metrics
                this.currentWeather = weatherResponse?.forecast[0].weather[0] as Weather
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
        toWeatherDescription(weather: Weather) {
            return (" " + weather.description).toLowerCase().replace(/(\b[a-z](?!\s))/g, (chr) => {
                return chr.toUpperCase();
            });
        },
        getTomorrowHeading() {
            return "Tomorrow - " + new Date(this.forecast[1]?.localDateTime).toLocaleDateString()
        },
        getTimeString(forecast: Forecast) {
            if (forecast)
                return new Date(forecast.localDateTime).toLocaleTimeString().replace(":00", "")
          },
    },
    mounted() {

    },
    components: { ContentBox }
})
</script>

<template>    
    <ContentBox id="weather" v-if="location?.lat">
        <div class="text-xl font-medium text-slate">
            {{city?.name}}, {{location?.state}}
        </div>
        <hr />
        <div class="grid grid-cols-2 gap-4 w-full">
            <div>
                <img v-bind:src='getWeatherIconUrl(currentWeather?.icon, true)' />
            </div>
            <div class="py-5">    
                <div class="text-2xl justify-center content-center">
                    {{metrics?.temp}}&deg;
                </div>
                <div>
                    {{toWeatherDescription(currentWeather)}}
                </div>
            </div>
        </div>
        {{new Date().toDateString()}} &nbsp;
            {{new Date().toLocaleTimeString()}} <br />
    </ContentBox>
    <ContentBox id="weather" v-if="location?.lat" :title="getTomorrowHeading()" >
        <div class="grid grid-cols-3 gap-1 rounded-lg bg-sky-700">
            <!-- 1 TODO: Do this with a loop! -->
            <div class="p-1 flex items-center justify-center shadow-lg rounded-lg bg-sky-700">
                <img class="" v-bind:src='getWeatherIconUrl(forecast[1]?.weather[0].icon, false)' /> 
                {{forecast[1]?.metrics.temp}}&deg;
            </div>
            <div class="p-1 flex items-center justify-center shadow-lg rounded-lg bg-sky-700">
                {{getTimeString(forecast[1])}}
            </div>
            <div class="p-1 flex items-center justify-center shadow-lg rounded-lg bg-sky-700">
                {{toCapDescription(forecast[1])}}
            </div>
            <!-- 2  -->
            <div class="p-1 flex items-center justify-center shadow-lg rounded-lg bg-sky-700">
                <img class="" v-bind:src='getWeatherIconUrl(forecast[2]?.weather[0].icon, false)' /> 
                {{forecast[2]?.metrics.temp}}&deg;
            </div>
            <div class="p-1 flex items-center justify-center shadow-lg rounded-lg bg-sky-700">
                {{new Date(forecast[2]?.localDateTime).toLocaleTimeString()}}
            </div>
            <div class="p-1 flex items-center justify-center shadow-lg rounded-lg bg-sky-700">
                {{toCapDescription(forecast[2])}}
            </div>
            <!-- 3  -->
            <div class="p-1 flex items-center justify-center shadow-lg rounded-lg bg-sky-700">
                <img class="" v-bind:src='getWeatherIconUrl(forecast[3]?.weather[0].icon, false)' /> 
                {{forecast[3]?.metrics.temp}}&deg;
            </div>
            <div class="p-1 flex items-center justify-center shadow-lg rounded-lg bg-sky-700">
                {{new Date(forecast[3]?.localDateTime).toLocaleTimeString()}}
            </div>
            <div class="p-1 flex items-center justify-center shadow-lg rounded-lg bg-sky-700">
                {{toCapDescription(forecast[3])}}
            </div>
            <!-- 4  -->
            <div class="p-1 flex items-center justify-center shadow-lg rounded-lg bg-sky-700">
                <img class="" v-bind:src='getWeatherIconUrl(forecast[4]?.weather[0].icon, false)' /> 
                {{forecast[4]?.metrics.temp}}&deg;
            </div>
            <div class="p-1 flex items-center justify-center shadow-lg rounded-lg bg-sky-700">
                {{new Date(forecast[4]?.localDateTime).toLocaleTimeString()}}
            </div>
            <div class="p-1 flex items-center justify-center shadow-lg rounded-lg bg-sky-700">
                {{toCapDescription(forecast[4])}}
            </div>
        </div>

    </ContentBox>   
</template>
