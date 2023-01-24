<script lang="ts">    
    import { createEventDispatcher } from 'svelte'
	import type { GeoLocation } from "src/models/GeoLocation";
    import Container from "./container.svelte";
    import { favorites, delFavorite, setCurrentFav } from "../stores/favoriteStore";

    const dispatch = createEventDispatcher();

     function onLocationClick(location: GeoLocation) {

        // Save the currently selected favorite...
        setCurrentFav(location)

        // Raise the location selected/changed event...
        dispatch('locationSelected', location)
    }

    function onLocationDelClick(location: GeoLocation) {
        delFavorite(location)        
    }

</script>

{#if $favorites?.length > 0}
<Container id="favorites">    
    <table class="w-full">    
        {#each $favorites as favorite }
            <tr >                       
                <td class="">
                    <!-- svelte-ignore a11y-invalid-attribute -->
                    <a on:click={() => onLocationClick(favorite)} href="#favorites">{favorite.name}</a>&nbsp;{favorite.state}, {favorite.country}
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
