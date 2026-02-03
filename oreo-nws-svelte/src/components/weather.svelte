<script lang="ts">
	import type { arcGISLocation } from "../models/arcGISLocation";
	import { onMount } from "svelte";    
    import type { nwsForecast } from "../models/nwsForecast";    
    import Container from "./container.svelte";
	import Loader from "./loader.svelte";
	
interface Props {
    location?: arcGISLocation;
    forecast?: nwsForecast;
}

let { location, forecast }: Props = $props();

const baseRaderUrl = $derived(`https://radar.weather.gov/ridge/standard/${forecast?.location.radar}_0.gif`);
let rederUrl = $state('');
let lastUpdate = $state(new Date());

// Watch forecast changes using $effect...
$effect(() => {
    if (forecast) {
        lastUpdate = new Date();
        rederUrl = baseRaderUrl + '?' + Math.random().toString(); // trigger reactive update
    }
});

    onMount(() => {
        // Auto update the weather map...
        setInterval(() => {
            if (forecast) {
                // Force reactivity by reassigning
                forecast = forecast;
            }
        }, 1800000); // 30 min.
    });

</script>
   
{#if forecast?.currentobservation}
<Container title={location?.name} id="weather">
<div class="w-full shadow-lg rounded-lg border-2 border-blue-500/40 bg-gradient-to-br from-slate-800 to-blue-900/60 mt-2 mb-0 backdrop-blur-sm overflow-hidden">        
<div class="p-4">
    <div class="flex items-start gap-4">
        <div class="flex-shrink-0">
            <img 
                class="rounded-lg w-20 h-20 border-2 border-blue-500/30 shadow-md" 
                src="{forecast?.data.iconLink[0]}" 
                alt="{forecast?.data.weather[0]}" 
            />
        </div>
        <div class="flex-1">
            <div class="mb-2">
                <div class="text-5xl font-bold text-white mb-2">
                    {forecast?.currentobservation.Temp}&deg;
                </div>
                <div class="text-blue-100 text-base">
                    {forecast?.data.weather[0].split(' then')[0].replace('Slight', '')}
                </div>
            </div>
        </div>
    </div>
    
    <div class="flex gap-6 mt-3 text-base">
        <div class="flex items-center gap-2 text-gray-200">
            <img src="/images/wind.svg" alt="Wind" aria-label="Wind" width="32px" class="opacity-90" />
            <span class="font-semibold">{forecast?.currentobservation.Winds} MPH</span>
        </div>
        <div class="flex items-center gap-2 text-gray-200">
            <img src="/images/hum.png" alt="Humidity" aria-label="Humidity" width="32px" class="opacity-90" />
            <span class="font-semibold">{forecast?.currentobservation.Relh}% Humidity</span>
        </div>
    </div>
</div>
    
    <div class="px-1 pb-1">
        <img 
            src="{ rederUrl }" 
            alt="Radar Map" 
            class="w-full rounded-lg border-2 border-blue-500/30 shadow-md" 
        />
    </div>
    
    <div class="px-4 pb-3 text-sm text-gray-300">
        <div class="flex justify-between items-center">
            <div>
                {forecast?.currentobservation.Date}
            </div>
            <div class="text-blue-200">
                Updated {lastUpdate.toLocaleTimeString()}
            </div>
        </div>
    </div>
</div>
</Container>
{:else}
<Loader />
{/if}