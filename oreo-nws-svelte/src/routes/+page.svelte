<script lang="ts">

	import MobileFirst from "../components/mobile-first.svelte";
	import LocationSearch from "../components/locationSearch.svelte";
	import Favorites from "../components/favorites.svelte";
	import Weatherforecast from "../components/weatherForecast.svelte";
	import Footer from "../components/footer.svelte";
	import FeatureSelector from "../components/featureSelector.svelte";
	import TideForecast from "../components/tideForecast.svelte";

	import type { arcGISLocation } from "src/models/arcGISLocation";

	let selectedLocation: arcGISLocation
	let selectedFeature = 'tide'

	function onLocationSelected(event: CustomEvent<arcGISLocation>) {
		selectedLocation = event.detail
	}

	function onFeatureChanged(event: CustomEvent<string>) {
		console.debug('selectedFeature: ' + event.detail)
		selectedFeature = event.detail
	}

</script>

<MobileFirst />
<LocationSearch on:locationSelected = {onLocationSelected} />
<Favorites on:locationSelected = {onLocationSelected} />
<FeatureSelector on:featureChanged = {onFeatureChanged} />
{#if selectedFeature == "weather"}
	<Weatherforecast location = {selectedLocation} />
{:else if selectedFeature == "tide"}
	<TideForecast />
{:else}
	Invalid Feature!
{/if}




<Footer />


