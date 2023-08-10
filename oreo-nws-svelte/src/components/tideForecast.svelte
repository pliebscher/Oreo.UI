<script lang="ts">
	import { onMount } from "svelte";
	import Container from "./container.svelte";

    import { currentFav } from "../stores/favoriteStore";
    import { getLocation } from '../services/arcGISService';
    import { getTideStations } from "../services/noaaTideService";

	import type { noaaStation } from "../models/noaaStationData";
    import type { station } from '../models/noaa/station';

    //export let location: arcGISLocation
    let stations: station[] | undefined
    let selectedStation: noaaStation
    let loading  = false

    // Wathcers...
    $: {
        if ($currentFav)
            console.debug('$currentFav changed --> getLocations')
            getStations()
    }

     onMount( () => {

	});

    async function getStations() {

        loading = true

        // TODO: Dont re-fetch the current location...
        const currentLocation = await getLocation($currentFav.magicKey)
        // Get the NOAA stations for the current location...
        stations = await getTideStations(currentLocation)
        // Grab the first one... for now at least
        stations = stations.slice(0, 1)

        loading = false

        console.debug('getStations -->')
        console.debug(stations)

    }

	function onStationClick(station: noaaStation): any {
		selectedStation = station
	}

</script>

<Container title='Tide Forecast' id='tides'>
{#if  loading}
    <div>Loading...</div>
{:else if stations }
<div class="flex flex-wrap">
    {#if stations.length >=1 }
        {#each stations as station }
        <div  class="border rounded m-0.5 px-1 bg-gray-600 w-full">
            {station.name} ({station.id})
        </div>
        {/each}
    {:else}
        <div>Station Not Found</div>
    {/if}
</div>
{:else }
    <div>Station Not Found</div>
{/if}
</Container>