<script lang="ts">
    import { onMount } from "svelte";
    import Container from "./container.svelte";
    import { currentFav } from "../stores/favoriteStore";
    import { getLocation } from '../services/arcGISService';
    import { getTideStations, getTidePredictions } from "../services/noaaTideService";
    import { formatTimeTo12Hour } from "./utils";
    import type { station } from '../models/noaa/station';
    
    let stations = $state<station[]>([]);
    let loading = $state(false);
    
    // Watch currentFav changes using $effect...
    $effect(() => {
        if ($currentFav) {
            getStations();
        }
    });
    
    async function getStations() {
        loading = true;
        const currentLocation = await getLocation($currentFav.magicKey);
        // Get the NOAA stations for the current location...
        stations = await getTideStations(currentLocation);
        loading = false;
    }
    
    onMount(() => {        
        // Auto update the tide forecast...
        setInterval(() => {
            if (stations) 
                getStations();
        }, 900000);
    });
</script>

{#if loading}
<Container id='tides'>
    <div class="text-gray-200 text-center py-4">
        <div class="inline-block animate-pulse">Loading nearest tide station data...</div>
    </div>
</Container>
{:else}
    {#if stations.length > 0 }
    <Container id='tides'>
            {#each stations as station}
            <p class="text-lg font-semibold text-white mb-3">{station.name}</p>
                {#await getTidePredictions(station.id)}
                    <div class="text-gray-400 text-center py-2 animate-pulse">Loading predictions...</div>
                {:then predictions}
                    <div class="w-full shadow-lg rounded-lg border-2 border-blue-500/40 bg-gradient-to-br from-slate-800 to-blue-900/60 mt-2 backdrop-blur-sm overflow-hidden">
                        <div class="divide-y divide-blue-500/20">
                        {#each predictions as p }
                            <div class="flex items-center px-4 py-3 transition-all duration-200 hover:bg-blue-500/10">
                                <div class="w-28 text-gray-200 font-medium">
                                    {formatTimeTo12Hour(p.t.split(' ')[1])}
                                </div>
                                <div class="flex-1 px-4 text-blue-100">
                                    <span class="
                                        inline-block px-2 py-0.5 rounded
                                        text-xs font-semibold
                                        {p.type == 'L' 
                                            ? 'bg-orange-500/20 text-orange-200 border border-orange-500/40' 
                                            : 'bg-cyan-500/20 text-cyan-200 border border-cyan-500/40'}
                                    ">
                                        {p.type == 'L' ? 'Low' : 'High'}
                                    </span>
                                </div>
                                <div class="text-gray-200 font-semibold">
                                    {p.v} ft.
                                </div>
                            </div>
                        {/each}
                        </div>
                    </div>  
                {/await}
            {/each}
    </Container>
    {:else }
    <Container>
        <div class="
            border-2 rounded-md px-3 py-2
            border-yellow-500/40 bg-yellow-900/20 text-yellow-200
            shadow-md text-center
        ">
            No tide stations nearby.
        </div>
    </Container>
    {/if}
{/if}