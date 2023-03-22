<script lang="ts">    
    import { createEventDispatcher } from 'svelte'

    import { favorites, delFavorite, setCurrentFav, currentFav } from "../stores/favoriteStore";
	import type { arcGISSearchSuggestion } from '../models/arcGISSearchSuggestion';
	import { getLocation } from '../services/arcGISService';

    import Container from "./container.svelte";

    export let edit: boolean = false

    const dispatch = createEventDispatcher();

    async function onFavoriteClick(suggestion: arcGISSearchSuggestion) {
        // Get the location containing the lat/lon needed for the weather and forecast components...
        const location = await getLocation(suggestion.magicKey)
        // Save the currently selected favorite...
        setCurrentFav(suggestion)
        // Raise the location selected/changed event...
        dispatch('locationSelected', location)
    }

    function onFavoriteDelClick(suggestion: arcGISSearchSuggestion) {
        delFavorite(suggestion)        
    }

</script>

{#if $favorites?.length > 0}
    {#if edit}
    <Container id="favorites" title="Manage Favorites">
        <hr class="mt-1" />
        <table class="w-full mt-1">    
            {#each $favorites as favorite }
                <tr>                       
                    <td class="">
                        {favorite.text.replace(', USA', '')}
                    </td>
                    <td class="content-end text-right">
                        <!-- svelte-ignore a11y-invalid-attribute -->
                        <a on:click={() => onFavoriteDelClick(favorite)} href="#search">🗑️</a>
                    </td>                        
                </tr>             
            {/each}
        </table>
    </Container>
    {:else}
    <Container id="favorites">
        <div class="flex flex-wrap">
        {#each $favorites as favorite }
            <!-- svelte-ignore a11y-invalid-attribute -->
            <a class="" on:click={() => onFavoriteClick(favorite)} href="#favorites">
                <div  class="border rounded m-0.5 px-1 {$currentFav.magicKey == favorite.magicKey ? 'bg-gray-600' : ''}">
                    {favorite.text.replace(', USA', '')}
                </div>
            </a>
        {/each}
        </div>
    </Container>
    {/if}
{/if}
