<script lang="ts">
	import { onMount} from "svelte";

	import Header from "../components/header.svelte"
	import LocationSearch from "../components/locationSearch.svelte";
	import Favorites from "../components/favorites.svelte";
	import Weatherforecast from "../components/weatherForecast.svelte";
	
	import type { arcGISLocation } from "src/models/arcGISLocation";

	let selectedLocation: arcGISLocation

	function onLocationSelected(event: CustomEvent<arcGISLocation>) {
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
          
<Header />

<div class="w-full mt-8">
	<div class="w-full">
		<LocationSearch on:locationSelected = {onLocationSelected} />
		<Favorites on:locationSelected = {onLocationSelected} />
		<Weatherforecast location = {selectedLocation} />
		<div id="toaster" class=""></div> 
	</div>	
</div>
