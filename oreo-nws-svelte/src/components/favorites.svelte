<script lang="ts">    
    import { favorites, delFavorite, setCurrentFav, currentFav } from "../stores/favoriteStore";
    import type { arcGISSearchSuggestion } from '../models/arcGISSearchSuggestion';
    import { getLocation } from '../services/arcGISService';
    import Container from "./container.svelte";
    
    interface Props {
        edit?: boolean;
        onLocationSelected?: (location: any) => void;
    }
    
    let { edit = false, onLocationSelected }: Props = $props();
    
    async function onFavoriteClick(suggestion: arcGISSearchSuggestion) {
        // Get the location containing the lat/lon needed for the weather and forecast components...
        const location = await getLocation(suggestion.magicKey)
        // Save the currently selected favorite...
        setCurrentFav(suggestion)
        // Raise the location selected/changed event...
        onLocationSelected?.(location)
    }
    
    function onFavoriteDelClick(suggestion: arcGISSearchSuggestion) {
        delFavorite(suggestion)        
    }
</script>

{#if $favorites?.length > 0}
    {#if edit}
    <Container id="favorites" title="Manage History">
        <hr class="mt-1" />
        <table class="w-full mt-1">    
            <tbody>
                {#each $favorites as favorite }
                    <tr>                       
                        <td class="">
                            {favorite.text.replace(', USA', '')}
                        </td>
                        <td class="content-end text-right">
                            <!-- svelte-ignore a11y_invalid_attribute -->
                            <a onclick={() => onFavoriteDelClick(favorite)} href="#">🗑️</a>
                        </td>                        
                    </tr>             
                {/each}
            </tbody>
        </table>
    </Container>
    {:else}
    <Container>
<div class="flex flex-wrap gap-2">
    {#each $favorites as favorite }
        <!-- svelte-ignore a11y_invalid_attribute -->
        <a class="group" onclick={() => onFavoriteClick(favorite)} href="#">
            <div class="
                border-2 rounded-md px-3 py-1.5
                transition-all duration-200 ease-in-out
                cursor-pointer
                {$currentFav.magicKey == favorite.magicKey 
                    ? 'border-blue-400 bg-blue-500/20 text-blue-100 shadow-lg shadow-blue-500/20' 
                    : 'border-blue-500/40 bg-slate-800/50 text-gray-200 hover:border-blue-400 hover:bg-blue-500/10 hover:shadow-md hover:shadow-blue-500/10'}
            ">
                {favorite.text.replace(', USA', '')}
            </div>
        </a>
    {/each}
</div>
    </Container>
    {/if}
{/if}