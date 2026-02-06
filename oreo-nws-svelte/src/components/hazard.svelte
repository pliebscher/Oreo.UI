<script lang="ts">
    import type { nwsForecast } from "../models/nws/nwsForecast";
    import Container from "./container.svelte";
    
    interface Props {
        forecast?: nwsForecast;
    }
    
    let { forecast }: Props = $props();
</script>

{#if forecast?.data.hazard[0]}
<Container id="hazard">
<div class="w-full rounded-lg p-3 bg-gradient-to-br from-orange-900 via-red-900 to-red-800 border-2 border-red-500/50 shadow-xl backdrop-blur-sm">
    <div class="flex items-start gap-3">
        <div class="flex-shrink-0 mt-0.5">
            <img 
                src="/images/warning.png" 
                alt="Weather Alert" 
                aria-label="Weather Alert" 
                class="w-7 transition-all duration-200 hover:scale-110 animate-pulse" 
            />
        </div>
        <div class="flex-1 text-yellow-100 leading-relaxed">
            <span class="font-semibold">{forecast?.data.hazard[0]}</span>
            <span class="text-yellow-200">... </span>
            <a 
                href="{forecast?.data.hazardUrl[0].replace('amp;', '')}" 
                target="_blank" 
                rel="noreferrer"
                class="inline-flex items-center gap-1 text-yellow-300 hover:text-yellow-100 underline decoration-yellow-300/50 hover:decoration-yellow-100 transition-all duration-200 font-medium"
            >
                [Detail]
            </a>
        </div>
    </div>
</div>
</Container>
{/if}