<script lang="ts">

	import LocationSearch from "../components/locationSearch.svelte";
	import Favorites from "../components/favorites.svelte";
	import Weatherforecast from "../components/weatherForecast.svelte";
	
	import type { arcGISLocation } from "src/models/arcGISLocation";

	let selectedLocation: arcGISLocation

	function onLocationSelected(event: CustomEvent<arcGISLocation>) {
		console.info('location selected: ' + event.detail.name)
		selectedLocation = event.detail
	}

</script>

<LocationSearch on:locationSelected = {onLocationSelected} />
<Favorites on:locationSelected = {onLocationSelected} />
<Weatherforecast location = {selectedLocation} />


