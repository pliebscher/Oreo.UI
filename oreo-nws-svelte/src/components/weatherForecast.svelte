<script lang="ts">
    import { onMount } from "svelte";

    import type { nwsForecast } from "../models/nwsForecast";
    import type { arcGISLocation } from "../models/arcGISLocation";

	import { getLocation } from "../services/arcGISService";
    import { getForecast } from "../services/nwsForecastService";

    import { currentFav } from "../stores/favoriteStore";

	import WeatherComp from "./weather.svelte";
    import ForecastComp from "./forecast.svelte";
	import Loader from "./loader.svelte";

	  
    // Props...
    export let location: arcGISLocation
    
    // Locals...
    let forecast: nwsForecast | undefined
    let fetching: boolean

    // Watchers...
    $: {
        fetchForecast(location)
    }

    // Methods...
    async function fetchForecast(location: arcGISLocation) {
        
        if (location?.name) {
            fetching = true    
            forecast =  await getForecast(location.feature.geometry.y, location.feature.geometry.x)
            console.info(forecast)
            fetching = false
        }            
        
        if (!location?.name)
            forecast = undefined
    }

    async function showFavorite() {
        if ($currentFav?.text) {
            location = await getLocation($currentFav.magicKey)
            console.info(location)
        }
    }

    onMount( () => {
		
        showFavorite()

        setInterval(() => {
            if (forecast) 
                fetchForecast(location)            
        }, 600000) // 10 min.

	});

</script>

<div id="weather">
    {#if fetching}
    <Loader />
    {:else}
    <WeatherComp location={location} forecast={forecast} />
    <ForecastComp forecast={forecast} />
    {/if}
</div>


