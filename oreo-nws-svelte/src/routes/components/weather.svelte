<script lang="ts">
	import type { GeoLocation } from "src/models/GeoLocation";
    import Container from "./container.svelte";

    let location: GeoLocation

</script>

{#if location}
<Container title="Weather">
    ...
</Container>
{/if}
