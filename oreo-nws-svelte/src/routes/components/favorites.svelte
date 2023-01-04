<script lang="ts">    
    import { createEventDispatcher } from 'svelte'
	import type { GeoLocation } from "src/models/GeoLocation";
    import Container from "./container.svelte";
    import { favorites, delFavorite } from "../../stores/favoriteStore";

    const dispatch = createEventDispatcher();

     function onLocationClick(location: GeoLocation) {
        dispatch('locationSelected', location)
    }

    function onLocationDelClick(location: GeoLocation) {
        delFavorite(location)        
    }

</script>

{#if $favorites?.length > 0}
<div id="favorites" />
<Container title="">    
    <table class="w-full">    
        {#each $favorites as favorite }
            <tr >                       
                <td class="">
                    <a on:click={() => onLocationClick(favorite)} href="#weather">{favorite.name}</a>&nbsp;{favorite.state}, {favorite.country}
                </td>
                <td class="content-end text-right">
                    <!-- svelte-ignore a11y-invalid-attribute -->
                    <a on:click={() => onLocationDelClick(favorite)} href="#">🗑️</a>
                </td>                        
            </tr>             
        {/each}
    </table>
</Container>
{/if}
