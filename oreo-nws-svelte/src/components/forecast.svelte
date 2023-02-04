<script lang="ts">
    import type { nwsForecast } from "src/models/nwsForecast";
	import { onMount } from "svelte";
    import Container from "./container.svelte";

    export let forecast: nwsForecast | undefined

    onMount( () => {		
        console.info('forecast Mounted...')
	});

</script>

{#if forecast?.creationDate}
<Container title="7 Day Forecast">
    <table class="w-full shadow-lg rounded-lg bg-sky-700 mt-2">
        {#each forecast?.data.iconLink as icon, i}
        <tr class="shadow-lg rounded-lg">
            <td class="">
                <img class="m-2 rounded-md" width="30px" height="30px" src="{icon}" alt="" />
            </td>
            <td class="p-3">
                {forecast.data.temperature[i]}&deg;
            </td>
            <td class="p-3 ">
                {forecast?.time.startPeriodName[i]}
            </td>
            <td class="p-3 "> 
                {forecast?.data.weather[i].split(' then')[0].replace('Slight', '')}
            </td>
        </tr>
        {/each}
    </table>

</Container>
{/if}