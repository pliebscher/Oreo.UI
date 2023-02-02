<script lang="ts">
    import { onMount } from "svelte";

      import type { nwsForecast } from "../models/nwsForecast";
    import { getForecast } from "../services/nwsForecastService";

    import { currentFav } from "../stores/favoriteStore";

	import WeatherComp from "./weather.svelte";
    import ForecastComp from "./forecast.svelte";
	import type { arcGISLocation } from "../models/arcGISLocation";
	import { getLocation } from "../services/arcGISService";
	  
    // Props...
    export let location: arcGISLocation
    
    // Locals...
    let forecast: nwsForecast | undefined

    // Watchers...
    $: {
        fetchForecast(location)
    }

    // Methods...
    async function fetchForecast(location: arcGISLocation) {
        
        if (location?.name) {            
            forecast =  await getForecast(location.feature.geometry.y, location.feature.geometry.x)
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
		
        console.info('weatherForecast Mounted...')
        showFavorite()

        setInterval(() => {
            if (forecast) 
                fetchForecast(location)            
        }, 600000) // 10 min.

	});

</script>

<div id="weather">
    <WeatherComp location={location} forecast={forecast} />
    <ForecastComp forecast={forecast} />
</div>

