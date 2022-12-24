<script lang="ts">
	import type { GeoLocation } from "src/models/GeoLocation";
    import Container from "./container.svelte";

    export let location: GeoLocation

</script>

{#if location}
<Container title="Weather">
    {location}
</Container>
{/if}
