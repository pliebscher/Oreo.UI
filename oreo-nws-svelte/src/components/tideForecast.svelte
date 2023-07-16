<script lang="ts">
	import { onMount } from "svelte";
	import Container from "./container.svelte";

	import type { noaaTideStation } from "src/models/noaaTideStation";
	import type { arcGISLocation } from "src/models/arcGISLocation";

    export let location: arcGISLocation

    async function getStations() {

        const response = await fetch(`/api/tideStations?lat=${location.feature.geometry.x}&lon=${location.feature.geometry.y}`);
        console.debug(await response.json())
		//number = await response.json();

    }

    onMount(() => {
        
        console.debug('onMount getStations')
        getStations()

    })

</script>

<Container title='Tide Forecast' id='tides'>
    Tide Forecast
</Container>