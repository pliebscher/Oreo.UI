<script lang="ts">
	import { onMount } from "svelte";
	import Container from "./container.svelte";

    import { currentFav } from "../stores/favoriteStore";
    import { getLocation } from '../services/arcGISService';
    import { getTideStations } from "../services/noaaProxyService";

	import type { arcGISLocation } from "src/models/arcGISLocation";
	import type { noaaStation } from "src/models/noaaStationData";

    //export let location: arcGISLocation
    let stations: noaaStation[]
    let selectedStation: noaaStation

    // Wathcers...
    $: {
        if ($currentFav)
            console.debug('$currentFav changed --> getLocations')
            getStations()
            console.debug('Location changed -->')
            console.debug(location)
    }

     onMount( () => {
        console.debug('onMount -> getStations')
		getStations()
	});

    async function getStations() {

        // TODO: Dont re-fetch the current location...
        const currentLocation = await getLocation($currentFav.magicKey)

        // Get the NOAA stations for the current location...
        stations = await getTideStations(currentLocation)
       
        console.debug('getStations -->')
        console.debug(stations)

    }

	function onStationClick(station: noaaStation): any {
		selectedStation = station
	}

</script>

<Container title='Tide Forecast' id='tides'>
{#if stations }
<div class="flex flex-wrap">
    {#each stations as station }
        <a class="" on:click={() => onStationClick(station)} href="#favorites">
            <div  class="border rounded m-0.5 px-1 {true ? 'bg-gray-600' : ''}">
                {station.name}
            </div>
        </a>
    {/each}
</div>
{/if}

</Container>