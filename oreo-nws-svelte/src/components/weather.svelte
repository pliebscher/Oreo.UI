<script lang="ts">
	import { onMount } from "svelte";
    
    import type { GeoLocation } from "../models/GeoLocation";
    import type { Forecast } from "../models/Forecast";
    
    import Container from "./container.svelte";

    // Props...
    export let location: GeoLocation
    export let forecast: Forecast | undefined

    $: {
        if (forecast)
            lastUpdate = new Date()
    }
    
    // Locals...
    let lastUpdate: Date = new Date()
   
    onMount( () => {		
        console.info('weather Mounted...')
	});

</script>
   
{#if forecast?.currentobservation}
<Container title="{location?.name}, {location?.state}">
    <div id="weather" class="w-full shadow-lg rounded-lg bg-sky-700 mt-2 mb-0">
        <div class="grid grid-flow-col auto-cols-max">
            <div class="pt-4 pr-4 pl-4">
                <img class="rounded-md" width="60px" height="60px" src="{forecast?.data.iconLink[0]}" alt="{forecast?.data.weather[0]}" />
            </div>
            <div class="p-4">    
                <div class="pl-3 text-2xl ">
                    {forecast?.currentobservation.Temp}&deg;
                </div>                
                <div class="px-3">
                    {forecast?.data.weather[0]}
                </div>
            </div>
        </div>
        <div class="border-0 ml-4 mr-3 pb-2 text-sm">
            <section class="flex w-full">
                <div class="w-1/2 bg-gradient-to-r from-blue-900 to-blue-600 rounded-md p-1">
                    {forecast?.currentobservation.Date}
                </div>
                <div class="w-1/2 text-right">
                    Updated {lastUpdate.toLocaleTimeString()}
                </div>
            </section>

        </div>
    </div>
</Container>
{/if}
