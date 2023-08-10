<script lang="ts">
	import Container from "./container.svelte";

    import { currentFav } from "../stores/favoriteStore";
    import { getLocation } from '../services/arcGISService';
    import { getTideStations, getTidePredictions } from "../services/noaaTideService";

    import type { station } from '../models/noaa/station';
	import type { tidePrediction } from "../models/noaa/tidePrediction";

    let stations: station[] | undefined
    let selectedStation: station
    let predictions: tidePrediction[]
    let loading  = false

    // Wathcers...
    $: {
        if ($currentFav)
            getNearestStation()
    }

    async function getNearestStation() {

        loading = true

        // TODO: Dont re-fetch the current location...
        const currentLocation = await getLocation($currentFav.magicKey)

        // Get the NOAA stations for the current location...
        stations = await getTideStations(currentLocation)

        // Grab the first one... for now at least
        selectedStation = stations.slice(0, 1)[0] 

        if (selectedStation?.id)
            predictions = await getTidePredictions(selectedStation.id)

        loading = false

        console.debug(predictions)

    }

</script>

{#if loading}
<Container title='Tide Forecast' id='tides'>
    <div>Loading nearest tide station data...</div>
</Container>
{:else}
    {#if selectedStation }
    <Container title={selectedStation.name} id='tides'>

        {#if predictions }
        <table class="w-full shadow-lg rounded-lg bg-sky-700 mt-2">
            <tbody>
            {#each predictions as p }
                <tr class="shadow-lg rounded-lg align-top">
                    <td class="pl-2 w-16">
                        {p.t.split(' ')[1]}
                    </td>
                    <td>
                        [{p.type}]
                    </td>
                    <td>
                        {p.v} ft.
                    </td>
                </tr>
            {/each}
            </tbody>
        </table>        
        {/if}


 

    </Container>
    {:else }
    <Container>
        <div>No tide stations nearby.</div>
    </Container>
    {/if}
{/if}










