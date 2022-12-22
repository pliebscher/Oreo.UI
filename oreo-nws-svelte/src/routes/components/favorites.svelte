<script lang="ts">
	import type { GeoLocation } from "src/models/GeoLocation";
    import Container from "./container.svelte";

    let favorites: GeoLocation[] = []

    // TODO...

</script>

{#if favorites.length > 0}
<Container title="Favorites">
    ...
</Container>
{/if}
