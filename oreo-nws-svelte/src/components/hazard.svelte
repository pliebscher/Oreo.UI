<script lang="ts">
	import type { nwsForecast } from "src/models/nwsForecast";
	import Container from "./container.svelte";

    export let forecast: nwsForecast | undefined

</script>

{#if forecast?.data.hazard[0]}
<Container id="hazard">
    <table class="w-full rounded  p-2 bg-gradient-to-r from-gray-900 to-orange-500">
        <tr>
            <td class="w-7 align-top">
                <img src="/images/warning.png" alt="Weather Alert" aria-label="Weather Alert" class="w-6 align-top" />
            </td>
            <td class="">
                {forecast?.data.hazard[0]}... [<a href="{forecast?.data.hazardUrl[0].replace('amp;', '')}" target="_blank" rel="noreferrer">Detail</a>]
            </td>
        </tr>
    </table>
</Container>
{/if}