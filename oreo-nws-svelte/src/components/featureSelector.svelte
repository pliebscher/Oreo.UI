<script lang="ts">
    import { createEventDispatcher } from 'svelte'

	import Container from "./container.svelte";

    const dispatch = createEventDispatcher();

    let selectedFeature = 'weather'

    function onFeatureChanged(name: string) {
        console.debug('onFeatureChanged: ' + name)
        selectedFeature = name
        dispatch('featureChanged', name)
    }

</script>

<Container id="hazard">
<div class="flex flex-wrap pt-0">
    <a href="#favorites" on:click={() => onFeatureChanged('weather')}>
        <div class="border rounded m-0.5 px-1 {selectedFeature == 'weather' ? 'bg-gray-600' : ''}">
            Weather
        </div>
    </a>
    <a href="#favorites" on:click={() => onFeatureChanged('tide')}>
        <div class="border rounded m-0.5 px-1 {selectedFeature == 'tide' ? 'bg-gray-600' : ''}">
            Tide Forecast
        </div>
    </a>
</div>
</Container>