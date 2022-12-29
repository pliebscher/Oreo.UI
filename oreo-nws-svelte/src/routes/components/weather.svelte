<script lang="ts">
	import type { GeoLocation } from "../../models/GeoLocation";
    import type { Forecast } from "../../models/Forecast";
    import { getForecast } from "../../services/forecastService";
    import Container from "./container.svelte";

    // Props...
    export let location: GeoLocation
    
    // Locals...
    let forecast: Forecast

    $: {
        fetchForecast(location)
    }

    async function fetchForecast(loc: GeoLocation) {
        if (loc?.lat)
            forecast =  await getForecast(loc.lat.toString(), loc.lon.toString())
            //console.info(forecast)
    }

</script>
   
{#if location?.lat}
<Container title="{location?.name}, {location?.state}">
    <div class="w-full shadow-lg rounded-lg bg-sky-700 mt-2">
        <div class="grid grid-cols-2 gap-0 w-full ">
            <div>
                <img class="mt-4 ml-4 rounded-md" width="60px" height="60px" src="{forecast?.data.iconLink[0]}" alt="{forecast?.data.weather[0]}" />
            </div>
            <div class="py-5">    
                <div class="text-2xl justify-center content-center">
                    {forecast?.currentobservation.Temp}&deg;
                </div>
                <div class="pr-3">
                    {forecast?.data.weather[0]}
                </div>
            </div>
        </div>
        <div class="pl-4 pb-2 text-sm">
            {forecast?.creationDateLocal}
        </div>
    </div>
</Container>
{/if}
