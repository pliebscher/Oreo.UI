<script lang="ts">
	import LocationSearch from "./components/locationSearch.svelte";
	import Favorites from "./components/favorites.svelte";
	import Weather from "./components/weather.svelte";
	import Forecast from "./components/forecast.svelte";

	import type { GeoLocation } from "src/models/GeoLocation";

	let selectedLocation: GeoLocation

	function onLocationSelected(event: CustomEvent<GeoLocation>) {
		selectedLocation = event.detail
	}

</script>

  <!-- NavBar -->            
  <div class="fixed bg-gradient-to-r from-gray-900 to-blue-700 shadow-md z-50 w-full px-4 py-1 text-lg">
    🐕 Weather Dog
  </div>
  <!-- Content -->
  <div class="w-auto mt-10">
    <div class="w-full">
		<LocationSearch on:locationSelected = {onLocationSelected} />
		<Favorites on:locationSelected = {onLocationSelected} />
		<Weather location = {selectedLocation} />
		<Forecast />
    </div>
    <div id="toaster" class="border rounded bg-red-900"></div> 
</div>
