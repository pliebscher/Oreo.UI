<script lang="ts">
    import type { Forecast } from "src/models/Forecast";
    import Container from "./container.svelte";

    export let forecast: Forecast

</script>

{#if forecast?.creationDate}
<Container title="Forecast">
    {forecast?.creationDate}
</Container>
{/if}