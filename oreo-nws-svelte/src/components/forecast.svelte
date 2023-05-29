<script lang="ts">
    import type { nwsForecast } from "src/models/nwsForecast";
	import { onMount } from "svelte";
    import Container from "./container.svelte";

    export let forecast: nwsForecast | undefined

    onMount( () => {		
        
	});

</script>

{#if forecast?.creationDate}
<Container title="7 Day Forecast">
    <table class="w-full shadow-lg rounded-lg bg-sky-700 mt-2">
        {#each forecast?.data.iconLink as icon, i}
        <tr class="shadow-lg rounded-lg align-top">
            <td class="align-top w-16">
                <img class="rounded-md w-16 p-0.5" src="{icon}" alt="Icon" />
            </td>
            <td class="align-top pl-2">
                {forecast.data.temperature[i]}&deg;
            </td>
            <td class="align-top px-2">
                {forecast.time.startPeriodName[i]}
            </td>
            <td class="align-top pl-2 border-l border-l-black"> 
                {forecast.data.weather[i]}
            </td>
        </tr>
        {/each}
    </table>
</Container>
{/if}