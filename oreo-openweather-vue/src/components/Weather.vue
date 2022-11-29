<script lang="ts">

import { defineComponent, ref, type PropType } from 'vue'
import { getWeather } from '@/services/weather'
import { GeoLocation } from '@/models/GeoLocation'
import type { City } from '@/models/City'
import type { Metrics } from '@/models/Metrics'
import type { Weather } from '@/models/Weather'
import ContentBox from './ContentBox.vue'

export default defineComponent({
    name: "Weather",
    props: {
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
            handler(val, oldVal) {
                if (val)
                    this.fetchWeather(val);
            }
        }
    },
    data() {
        return {
            city: {} as City,
            metrics: {} as Metrics,
            weather: {} as Weather,
            weatherIcon: "01n", // https://openweathermap.org/weather-conditions#Icon-list
        };
    },
    methods: {
        async fetchWeather(loc?: GeoLocation) {
            if (loc) {
                const weatherResponse = await getWeather(loc);
                this.city = weatherResponse?.city as City;
                this.metrics = weatherResponse?.forecast[0].metrics as Metrics;
                this.weather = weatherResponse?.forecast[0].weather[0] as Weather;
                this.weatherIcon = weatherResponse?.forecast[0].weather[0].icon as string;
            }
        },
        getWeatherIconUrl() {
            return "http://openweathermap.org/img/wn/" + this.weatherIcon + "@2x.png";
        },
        toCapWords(str: string) {
            return (" " + str).toLowerCase().replace(/(\b[a-z](?!\s))/g, function (chr) {
                return chr.toUpperCase();
            });
        }
    },
    components: { ContentBox }
})
</script>

<template>    
    <ContentBox id="weather" v-if="location?.lat !== undefined">
        <div class="text-xl font-medium text-slate">
            {{city?.name}}, {{location?.state}}
        </div>
        <hr />
        <div class="grid grid-cols-2 gap-4 w-full">
            <div>
                <img v-bind:src='getWeatherIconUrl()' />
            </div>
            <div class="py-5">    
                <div class="text-2xl justify-center content-center">
                    {{metrics?.temp}}&deg;
                </div>
                <div>
                    {{toCapWords(weather?.description)}}
                </div>
            </div>
        </div>
    </ContentBox>
</template>
