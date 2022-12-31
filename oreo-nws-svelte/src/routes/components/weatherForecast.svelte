<script lang="ts">
	import type { GeoLocation } from "../../models/GeoLocation";
    import type { Forecast } from "../../models/Forecast";
    import { getForecast } from "../../services/forecastService";

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
        if (loc?.lat)
            forecast =  await getForecast(loc.lat.toString(), loc.lon.toString())
        
        if (!loc?.lat)
        forecast = undefined
    }

</script>

<div id="weather">
    <WeatherComp location={location} forecast={forecast} />
    <ForecastComp forecast={forecast} />
</div>

