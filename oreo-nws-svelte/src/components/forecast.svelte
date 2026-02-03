<script lang="ts">
    import type { nwsForecast } from "../models/nwsForecast";
    import { onMount } from "svelte";
    import Container from "./container.svelte";
    
    interface Props {
        forecast?: nwsForecast;
    }
    
    let { forecast }: Props = $props();
    
    onMount(() => {        
        
    });
</script>

{#if forecast?.creationDate}
<Container title="7 Day Forecast">
<div class="w-full shadow-lg rounded-lg border-2 border-blue-500/40 bg-gradient-to-br from-slate-800 to-blue-900/60 mt-2 backdrop-blur-sm overflow-hidden">
    <div class="divide-y divide-blue-500/20">
        {#each forecast?.data.iconLink as icon, i}
        <div class="flex items-center px-3 py-3 transition-all duration-200 hover:bg-blue-500/10">
            <div class="flex-shrink-0 w-16">
                <img 
                    class="rounded-md w-16 border-2 border-blue-500/30 shadow-md" 
                    src="{icon}" 
                    alt="Weather Icon" 
                />
            </div>
            <div class="flex-shrink-0 w-16 text-center">
                <span class="text-xl font-bold text-white">
                    {forecast.data.temperature[i]}&deg;
                </span>
            </div>
            <div class="flex-shrink-0 w-24 px-2">
                <span class="text-sm font-semibold text-blue-200">
                    {forecast.time.startPeriodName[i]}
                </span>
            </div>
            <div class="flex-1 pl-4 border-l-2 border-blue-500/30"> 
                <span class="text-gray-200">
                    {forecast.data.weather[i]}
                </span>
            </div>
        </div>
        {/each}
    </div>
</div>
</Container>
{/if}