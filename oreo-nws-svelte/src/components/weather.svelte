<script lang="ts">
	import type { arcGISLocation } from "../models/arcGISLocation";
	import { onMount } from "svelte";    
    import type { nwsForecast } from "../models/nwsForecast";    
    import Container from "./container.svelte";
	
    // Props...
    export let location: arcGISLocation
    export let forecast: nwsForecast | undefined

    // Locals...
    const baseRaderUrl: string = `https://radar.weather.gov/ridge/standard/${forecast?.location.radar}_0.gif`
    let raderUrl: string = baseRaderUrl 
    let lastUpdate: Date = new Date()
    
   
    // Watchers...
    $: {
        if (forecast) {
            lastUpdate = new Date()
            raderUrl = baseRaderUrl + '?' + Math.random().toString() // trigger reactive update
        }            
    }

    onMount( () => {		
        
        // Auto update the weather map...
        setInterval(() => {
            if (forecast) 
                forecast = forecast            
        }, 300000) // 5 min.

	});

</script>
   
{#if forecast?.currentobservation}
<Container title="{location?.name}" id="weather">
    <div class="w-full shadow-lg rounded-lg bg-sky-700 mt-2 mb-0">        
        <table class="w-full">
            <tr>
                <td class="content-center text-center border-collapse w-16">
                    <img class="rounded-lg p-0.5" src="{forecast?.data.iconLink[0]}" alt="{forecast?.data.weather[0]}" />
                </td>
                <td>
                    <table class=" border-collapse ">                
                        <tr>
                            <td class="text-2xl">{forecast?.currentobservation.Temp}&deg;</td>
                            <td>
                                <table class="w-full text-sm ml-2">
                                    <tr>
                                        <td>
                                            <img src="/images/wind.svg" alt="Wind" aria-label="Wind" class="" width="20px" />
                                        </td>
                                        <td>
                                            {forecast?.currentobservation.Winds} MPH
                                        </td>
                                    </tr>
                                </table>
                            </td>
                            <td>
                                <table class="w-full text-sm ml-2">
                                    <tr>
                                        <td>
                                            <img src="/images/hum.png" alt="Humidity" aria-label="Humidity" class="" width="18px" />
                                        </td>
                                        <td>
                                            {forecast?.currentobservation.Relh}% Humidity
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3">
                                {forecast?.data.weather[0].split(' then')[0].replace('Slight', '')}
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>

        <img src="{ raderUrl }" alt="Radar Map" class="w-full rounded-lg p-1" />

        <div class="border-0 ml-1 mr-3 pb-2 text-sm">
            <section class="flex w-full">
                <div class="w-1/2">
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
