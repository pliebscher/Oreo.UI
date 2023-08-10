<script lang="ts">
	import { onMount } from "svelte";
	import Container from "./container.svelte";

    import { currentFav } from "../stores/favoriteStore";
    import { getLocation } from '../services/arcGISService';
    import { getTideStations, getTidePredictions } from "../services/noaaTideService";

    import type { station } from '../models/noaa/station';
	import type { tidePrediction } from "../models/noaa/tidePrediction";
	import { each } from "svelte/internal";

    let stations: station[] | undefined
    let selectedStation: station
    let predictions: tidePrediction[]
    let loading  = false

    // Wathcers...
    $: {
        if ($currentFav)

            loading = true

            getNearestStation()

            loading = false
    }

    async function getNearestStation() {

        //loading = true

        // TODO: Dont re-fetch the current location...
        const currentLocation = await getLocation($currentFav.magicKey)

        // Get the NOAA stations for the current location...
        stations = await getTideStations(currentLocation)

        // Grab the first one... for now at least
        selectedStation = stations.slice(0, 1)[0] 

        if (selectedStation?.id)
            predictions = await getTidePredictions(selectedStation.id)

        console.debug(predictions)

    }

</script>

<Container title='Tide Forecast' id='tides'>
{#if  loading}
    <div>Loading nearest tide station data...</div>
{:else if selectedStation }
<div class="flex flex-wrap">

        {selectedStation.name}
        <br>
        {#if predictions }
            {#each predictions as p }
                [{p.type}] {p.v}, {p.t}<br>
            {/each}            
        {/if}

</div>
{:else }
    <div>No tide stations nearby.</div>
{/if}
</Container>