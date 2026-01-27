<script lang="ts">
    import { onMount } from "svelte";

	import Container from "./container.svelte";

    import { currentFav } from "../stores/favoriteStore";
    import { getLocation } from '../services/arcGISService';
    import { getTideStations, getTidePredictions } from "../services/noaaTideService";
    import { formatTimeTo12Hour } from "./utils";

    import type { station } from '../models/noaa/station';

    let stations: station[] 
    let loading  = false

    // Wathcers...
    $: {
        if ($currentFav)
            getStations()
    }

    async function getStations() {

        loading = true

        const currentLocation = await getLocation($currentFav.magicKey)

        // Get the NOAA stations for the current location...
        stations = await getTideStations(currentLocation)

        loading = false
    }

    onMount( () => {		
        // Auto update the tide forecast...
        setInterval(() => {
            if (stations) 
            getStations()            
        }, 900000)
	});

</script>

{#if loading}
<Container id='tides'>
    <div>Loading nearest tide station data...</div>
</Container>
{:else}
    {#if stations.length > 0 }
    <Container id='tides'>

            {#each stations as station}
            <p>{station.name}</p>

                {#await getTidePredictions(station.id)}
                    &nbsp;
                {:then predictions}
                    <table class="w-full shadow-lg rounded-lg bg-sky-700 mt-2">
                        <tbody>
                        {#each predictions as p }
                            <tr class="shadow-lg rounded-lg align-top">
                                <td class="pl-2 w-28">
                                    {formatTimeTo12Hour(p.t.split(' ')[1])}
                                </td>
                                <td class="pl-2 border-l border-l-black">
                                    [{p.type == 'L' ? 'Low' : 'High'}]
                                </td>
                                <td>
                                    {p.v} ft.
                                </td>
                            </tr>
                        {/each}
                        </tbody>
                    </table>  
                {/await}

            {/each}

    </Container>
    {:else }
    <Container>
        <div>No tide stations nearby.</div>
    </Container>
    {/if}
{/if}
