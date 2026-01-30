<script lang="ts">
    import { currentFav } from "../stores/favoriteStore";
    import Container from "./container.svelte";
    
    interface Props {
        onFeatureChanged?: (feature: string) => void;
    }
    
    let { onFeatureChanged }: Props = $props();
    
    let selectedFeature = $state('weather');
    
    function handleFeatureChanged(name: string) {
        console.debug('onFeatureChanged: ' + name);
        selectedFeature = name;
        onFeatureChanged?.(name);
    }
</script>

{#if $currentFav?.magicKey }
<Container id="featureSelector">
<div class="flex flex-wrap gap-2 pt-0">
    <a href="#favorites" onclick={() => handleFeatureChanged('weather')}>
        <div class="
            border-2 rounded-md px-3 py-1.5
            transition-all duration-200 ease-in-out
            cursor-pointer
            {selectedFeature == 'weather' 
                ? 'border-blue-400 bg-blue-500/20 text-blue-100 shadow-lg shadow-blue-500/20' 
                : 'border-blue-500/40 bg-slate-800/50 text-gray-200 hover:border-blue-400 hover:bg-blue-500/10 hover:shadow-md hover:shadow-blue-500/10'}
        ">
            Weather
        </div>
    </a>
    <a href="#favorites" onclick={() => handleFeatureChanged('tide')}>
        <div class="
            border-2 rounded-md px-3 py-1.5
            transition-all duration-200 ease-in-out
            cursor-pointer
            {selectedFeature == 'tide' 
                ? 'border-blue-400 bg-blue-500/20 text-blue-100 shadow-lg shadow-blue-500/20' 
                : 'border-blue-500/40 bg-slate-800/50 text-gray-200 hover:border-blue-400 hover:bg-blue-500/10 hover:shadow-md hover:shadow-blue-500/10'}
        ">
            Tide Forecast
        </div>
    </a>
</div>
</Container>
{/if}