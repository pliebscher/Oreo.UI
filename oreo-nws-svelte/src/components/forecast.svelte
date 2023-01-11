<script lang="ts">
    import type { Forecast } from "src/models/Forecast";
    import Container from "./container.svelte";

    export let forecast: Forecast | undefined

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


    <!-- <div class="w-full shadow-lg rounded-lg bg-sky-700 mt-2">
        {#each forecast?.data.iconLink as icon, i}
        <div class="grid grid-cols-4 grid-flow-col auto-cols-max py-0.5 shadow-lg rounded-lg w-fit">
            <div class="border">
                <img class="m-2 rounded-md" width="30px" height="30px" src="{icon}" alt="" />
            </div>
            <div class="p-3">
                {forecast.data.temperature[i]}&deg;
            </div>
            <div class="p-3 border">
                {forecast?.time.startPeriodName[i]}
            </div>
            <div class="p-3 border"> 
                {forecast?.data.weather[i].split(' ')[0]}
            </div>
        </div>
        {/each}
    </div> -->
</Container>
{/if}