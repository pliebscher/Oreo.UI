<script lang="ts">
	import type { arcGISLocation } from "../models/arcGISLocation";
	import { onMount } from "svelte";
    
    import type { nwsForecast } from "../models/nwsForecast";
    
    import Container from "./container.svelte";

    // Props...
    export let location: arcGISLocation
    export let forecast: nwsForecast | undefined

    $: {
        if (forecast)
            lastUpdate = new Date()
    }

    // Locals...
    let lastUpdate: Date = new Date()
   
    // Methods...
    function getRadarUrl() {
        return `https://radar.weather.gov/ridge/standard/${forecast?.location.radar}_0.gif`
    }

    onMount( () => {		
        
	});

</script>
   
{#if forecast?.currentobservation}
<Container title="{location?.name}" id="weather">
    <div class="w-full shadow-lg rounded-lg bg-sky-700 mt-2 mb-0">
        <div class="grid grid-flow-col auto-cols-max z-50">
            <div class="pt-4 pr-4 pl-4">
                <img class="rounded-md" width="60px" height="60px" src="{forecast?.data.iconLink[0]}" alt="{forecast?.data.weather[0]}" />
            </div>
            <div class="p-4">    
                <div class="pl-3 text-2xl ">
                    {forecast?.currentobservation.Temp}&deg;
                </div>                
                <div class="px-3">
                    {forecast?.data.weather[0].split(' then')[0].replace('Slight', '')}
                </div>
            </div>
        </div>
        <div class="border-0 ml-4 mr-3 pb-2 text-sm">
            <section class="flex w-full">
                <div class="w-1/2">
                    {forecast?.currentobservation.Date}
                </div>
                <div class="w-1/2 text-right">
                    Updated {lastUpdate.toLocaleTimeString()}
                </div>
            </section>
        </div>
        <img src={ getRadarUrl() } alt="Radar Map" class="w-full rounded" />
    </div>    
</Container>
{/if}
