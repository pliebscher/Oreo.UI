<script lang="ts">
	import type { GeoLocation } from "../../models/GeoLocation";
    import type { Forecast } from "../../models/Forecast";
    import { getForecast } from "../../services/forecastService";
    import Container from "./container.svelte";
	import { afterUpdate, onMount } from "svelte";

    // Props...
    export let location: GeoLocation

    $: {
        fetchForecast(location)
        console.log(location);
    }

    // Locals...
    let forecast: Forecast

    async function fetchForecast(loc: GeoLocation) {
        if (loc?.lat)
            forecast =  await getForecast(loc.lat.toString(), loc.lon.toString())
            console.info(forecast)
    }

</script>

{#if location?.lat}
<Container title="Weather">
    {location?.lat}, {location?.lon}: {forecast?.creationDateLocal}
</Container>
{/if}
