<script lang="ts">

import { defineComponent, ref, type PropType } from 'vue'
import { getWeather } from '@/services/weather'
import { GeoLocation } from '@/models/GeoLocation'
import type { Metrics } from '@/models/Metrics'
import type { Weather } from '@/models/Weather'

import ContentBox from './ContentBox.vue'

export default defineComponent({
    name: "weatherSFC",
    props: {
        location: {
            type: GeoLocation, Object,
            default: new GeoLocation
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
            city: '' as string | undefined,
            metrics: {} as Metrics,
            currentWeather: {} as Weather,           
        };
    },
    methods: {
        async fetchWeather(loc?: GeoLocation) {
            if (loc) {
                const weatherResponse = await getWeather(loc)
                this.metrics = weatherResponse?.metrics as Metrics
                this.currentWeather = weatherResponse?.weather[0] as Weather
                this.city = weatherResponse?.city
            }
        },
        getWeatherIconUrl(icon?: String, large?: boolean) {
            if (icon)
                return "http://openweathermap.org/img/wn/" + icon + (large ? "@2x" : "") + ".png"
        },
        toWeatherDescription(weather: Weather) {
            return (" " + weather.description).toLowerCase().replace(/(\b[a-z](?!\s))/g, (chr) => {
                return chr.toUpperCase();
            });
        },
     },
    components: { ContentBox }
})
</script>

<template>    
    <ContentBox id="weather" v-if="city">
        <div class="text-xl font-medium text-slate">
            {{city}}, {{location?.state}}
        </div>
        <hr />
        <div class="w-full shadow-lg rounded-lg bg-sky-700">
        <div class="grid grid-cols-2 gap-1 w-full ">
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
        <div class="pl-4">
            {{new Date().toDateString()}} &nbsp;
            {{new Date().toLocaleTimeString()}}
        </div>
        </div>

    </ContentBox>
</template>
