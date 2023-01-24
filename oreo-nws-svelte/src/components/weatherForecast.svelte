<script lang="ts">
    import { onMount } from "svelte";

	import type { GeoLocation } from "../models/GeoLocation";
    import type { Forecast } from "../models/Forecast";
    import { getForecast } from "../services/forecastService";

    import { currentFav } from "../stores/favoriteStore";

	import WeatherComp from "./weather.svelte";
    import ForecastComp from "./forecast.svelte";
  
    // Props...
    export let location: GeoLocation
    
    // Locals...
    let forecast: Forecast | undefined

    // Watchers...
    $: {
        fetchForecast(location)
    }

    // Methods...
    async function fetchForecast(loc: GeoLocation) {
        
        if (loc?.lat) {
            console.info(`fetchForecast: ${loc.name}, ${loc.state}`)
            forecast =  await getForecast(loc.lat.toString(), loc.lon.toString())
        }            
        
        if (!loc?.lat)
            forecast = undefined
    }

    onMount( () => {
		
        console.info('weatherForecast Mounted...')

        if ($currentFav?.lat)
            location = $currentFav

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

