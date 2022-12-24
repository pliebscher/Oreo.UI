<script lang="ts">
	import type { GeoLocation } from "src/models/GeoLocation";
    import Container from "./container.svelte";

    export let location: GeoLocation

</script>

{#if location?.lat}
<Container title="Weather">
    {location?.lat}, {location?.lon}
</Container>
{/if}
