<script lang="ts">
    import { onMount } from "svelte";

    import type { nwsForecast } from "../models/nwsForecast";
    import type { arcGISLocation } from "../models/arcGISLocation";

	import { getLocation } from "../services/arcGISService";
    import { getForecast } from "../services/nwsForecastService";

    import { currentFav } from "../stores/favoriteStore";

	import WeatherComp from "./weather.svelte";
    import Hazard from "./hazard.svelte";
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
            fetching = false
        }            
        
        if (!location?.name)
            forecast = undefined
    }

    async function showFavorite() {
        if ($currentFav?.text) {
            location = await getLocation($currentFav.magicKey)
        }
    }

    onMount( () => {
		
        showFavorite()

        // Auto update the forecast...
        setInterval(() => {
            if (forecast) 
                fetchForecast(location)            
        }, (60 * 60 * 1000) * 15) 

	});

</script>

<div id="weather">
    {#if fetching}
    <Loader />
    {:else}
    <WeatherComp location={location} forecast={forecast} />
    <Hazard forecast={forecast} />
    <ForecastComp forecast={forecast} />
    {/if}
</div>


