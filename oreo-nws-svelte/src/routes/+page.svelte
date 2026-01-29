<script lang="ts">
    import MobileFirst from "../components/mobile-first.svelte";
    import LocationSearch from "../components/locationSearch.svelte";
    import Favorites from "../components/favorites.svelte";
    import Weatherforecast from "../components/weatherForecast.svelte";
    import Footer from "../components/footer.svelte";
    import FeatureSelector from "../components/featureSelector.svelte";
    import TideForecast from "../components/tideForecast.svelte";
    import type { arcGISLocation } from "../models/arcGISLocation";
    
    let selectedLocation = $state<arcGISLocation>();
    let selectedFeature = $state('weather');
    
    function onLocationSelected(location: arcGISLocation) {
        selectedLocation = location;
        console.log(selectedLocation);
    }
    
    async function onFeatureChanged(feature: string) {
        console.debug('selectedFeature: ' + feature);
        selectedFeature = feature;
    }
</script>

<MobileFirst />
<LocationSearch onLocationSelected={onLocationSelected} />
<Favorites onLocationSelected={onLocationSelected} />
<FeatureSelector onFeatureChanged={onFeatureChanged} />
{#if selectedFeature == "weather"}
    <Weatherforecast location={selectedLocation} />
{:else if selectedFeature == "tide"}
    <TideForecast />
{:else}
    Invalid Feature!
{/if}
<Footer />