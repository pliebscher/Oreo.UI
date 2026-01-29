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
    <div class="w-full shadow-lg rounded-lg bg-sky-700 mt-2 mb-0">        
        <table class="w-full">
            <tbody>
                <tr>
                    <td class="content-center text-center border-collapse w-16">
                        <img class="rounded-lg p-0.5" src="{forecast?.data.iconLink[0]}" alt="{forecast?.data.weather[0]}" />
                    </td>
                    <td>
                        <table class=" border-collapse ">
                            <tbody>            
                                <tr>
                                    <td class="text-2xl">{forecast?.currentobservation.Temp}&deg;</td>
                                    <td>
                                        <table class="w-full text-sm ml-2">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <img src="/images/wind.svg" alt="Wind" aria-label="Wind" class="" width="20px" />
                                                    </td>
                                                    <td>
                                                        {forecast?.currentobservation.Winds} MPH
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                    <td>
                                        <table class="w-full text-sm ml-2">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <img src="/images/hum.png" alt="Humidity" aria-label="Humidity" class="" width="18px" />
                                                    </td>
                                                    <td>
                                                        {forecast?.currentobservation.Relh}% Humidity
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="3">
                                        {forecast?.data.weather[0].split(' then')[0].replace('Slight', '')}
                                    </td>
                                </tr>
                             </tbody>                       
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>

        <img src="{ rederUrl }" alt="Radar Map" class="w-full rounded-lg p-1" />

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
{:else}
<Loader />
{/if}