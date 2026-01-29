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
<div class="flex flex-wrap pt-0">
    <a href="#favorites" onclick={() => handleFeatureChanged('weather')}>
        <div class="border rounded m-0.5 px-1 {selectedFeature == 'weather' ? 'bg-gray-600' : ''}">
            Weather
        </div>
    </a>
    <a href="#favorites" onclick={() => handleFeatureChanged('tide')}>
        <div class="border rounded m-0.5 px-1 {selectedFeature == 'tide' ? 'bg-gray-600' : ''}">
            Tide Forecast
        </div>
    </a>
</div>
</Container>
{/if}