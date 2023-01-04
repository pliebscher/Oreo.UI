<script lang="ts">
	import { onMount } from "svelte";

	import LocationSearch from "./components/locationSearch.svelte";
	import Favorites from "./components/favorites.svelte";
	import Weatherforecast from "./components/weatherForecast.svelte";

	import type { GeoLocation } from "src/models/GeoLocation";

	let selectedLocation: GeoLocation

	function onLocationSelected(event: CustomEvent<GeoLocation>) {
		selectedLocation = event.detail
	}

	function showToast(msg: string) {
          const x: HTMLElement | null = document.getElementById("toaster")
          if (x) {
            x.innerText =  msg
            x.className = "show"
            setTimeout(() => { 
              x.className = x.className.replace("show", "")
            }, 3000)
          }      
        }

	onMount( () => {
		window.onunhandledrejection = (e) => {
			console.error('Weather Dog Error: ', e.reason)
			showToast('An unhandled error occured')
		}
	})

</script>
          
<div class="fixed bg-gradient-to-r from-gray-900 to-blue-700 shadow-md z-50 w-full pl-2 py-0 text-lg">
	<table class="w-full">
		<tr>
			<td class="">🐕 Weather Dog</td>
			<td class="justify-items-end" align="right">
				<a href="https://svelte.dev/">
					<img src="svelte.png" alt="Svelte" class="" width="25px" height="25px" />
				</a>
			</td>
		</tr>
	</table>
</div>

<div class="w-auto mt-10">
	<div class="w-full">
		<LocationSearch on:locationSelected = {onLocationSelected} />
		<Favorites on:locationSelected = {onLocationSelected} />
		<Weatherforecast location = {selectedLocation} />
		<div id="toaster" class=""></div> 
	</div>
	
</div>
