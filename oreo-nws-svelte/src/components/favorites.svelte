<script lang="ts">    
    import { createEventDispatcher } from 'svelte'

    import { favorites, delFavorite, setCurrentFav } from "../stores/favoriteStore";
	import type { arcGISSearchSuggestion } from '../models/arcGISSearchSuggestion';
	import { getLocation } from '../services/arcGISService';

    import Container from "./container.svelte";

    const dispatch = createEventDispatcher();

    async function onLocationClick(suggestion: arcGISSearchSuggestion) {
        // Get the location containing the lat/lon needed for the weather and forecast components...
        const location = await getLocation(suggestion.magicKey)
        // Save the currently selected favorite...
        setCurrentFav(suggestion)
        // Raise the location selected/changed event...
        dispatch('locationSelected', location)
    }

    function onLocationDelClick(suggestion: arcGISSearchSuggestion) {
        delFavorite(suggestion)        
    }

</script>

{#if $favorites?.length > 0}
<Container id="favorites">    
    <table class="w-full">    
        {#each $favorites as favorite }
            <tr >                       
                <td class="">
                    <!-- svelte-ignore a11y-invalid-attribute -->
                    <a on:click={() => onLocationClick(favorite)} href="#favorites">{favorite.text}</a>
                </td>
                <td class="content-end text-right">
                    <!-- svelte-ignore a11y-invalid-attribute -->
                    <a on:click={() => onLocationDelClick(favorite)} href="#search">🗑️</a>
                </td>                        
            </tr>             
        {/each}
    </table>
</Container>
{/if}
