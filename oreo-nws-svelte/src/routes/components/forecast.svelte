<script lang="ts">
    import type { Forecast } from "src/models/Forecast";
    import Container from "./container.svelte";

    export let forecast: Forecast | undefined

</script>

{#if forecast?.creationDate}
<Container title="Forecast">
    <div class="w-full shadow-lg rounded-lg bg-sky-700 mt-2">
        {#each forecast?.data.iconLink as icon, i }
        <div class="grid grid-cols-3 auto-cols-min gap-1 py-0.5 shadow-lg rounded-lg">
            <div class="flex">
                <img class="m-2 rounded-md" width="30px" height="30px" src="{icon}" alt="" />
                <div class="p-2">{forecast.data.temperature[i]}&deg;</div>
            </div>
            <div class="pt-3 ">
                {forecast?.time.startPeriodName[i]}
            </div>
            <div class="p-2 flex items-center justify-center"> 
                {forecast?.data.weather[i].split(' ')[0]}
            </div>
        </div>
        {/each}
    </div>
</Container>
{/if}