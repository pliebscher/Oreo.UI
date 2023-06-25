<script lang="ts">
	import type { nwsForecast } from "src/models/nwsForecast";
	import Container from "./container.svelte";

    export let forecast: nwsForecast | undefined

</script>

{#if forecast?.data.hazard[0]}
<Container id="hazard">
    <table class="w-full">
        <tr>
            <td class="w-7">
                <img src="/images/warning.png" alt="Tools" aria-label="Tools" class=" w-5" />
            </td>
            <td class="">
                {forecast?.data.hazard[0]}
            </td>
        </tr>
    </table>
</Container>
{/if}