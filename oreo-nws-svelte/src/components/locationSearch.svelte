<script lang="ts">
    import { onMount } from "svelte";

    import { addFavorite, setCurrentFav } from "../stores/favoriteStore";
    import type { arcGISSearchSuggestion } from "../models/arcGIS/arcGISSearchSuggestion";
    import { getLocation, getSuggestions } from "../services/arcGISService";

    import Container from "./container.svelte";	

    interface Props {
        onLocationSelected?: (location: any) => void;
    }

    let { onLocationSelected }: Props = $props();

    let searchStr = $state('');
    let notFound = $state(false);
    let suggestions = $state<arcGISSearchSuggestion[]>([]);

    // Watch the search box for changes using $effect...
    $effect(() => {
        if (searchStr.length == 0) {
            clearSearch();
        } else {
            search(searchStr);
        }
    });

    async function search(criteria: string) {
        if (searchStr.length > 0) {
            suggestions = await getSuggestions(criteria);
            // Filter non-USA results as they don't work!
            suggestions = suggestions.filter(loc => loc.text.endsWith(', USA'));
        }

        notFound = (suggestions.length == 0 && searchStr.length > 1);
    }

    async function onSearchClick() {
        search(searchStr);
    }

    function clearSearch() {
        notFound = false;
        searchStr = '';
        suggestions = [];
    }

    async function onLocationClick(suggestion: arcGISSearchSuggestion) {
        // Get the location containing the lat/lon needed for the weather and forecast components...
        const location = await getLocation(suggestion.magicKey);
        // Set as current favorite...
        setCurrentFav(suggestion);
        // 
        addFavorite(suggestion);
        // Raise the Selected event...
        onLocationSelected?.(location);
        //
        clearSearch();
    }

    function onSearchClearClick() {
        clearSearch();
    }

    onMount(() => {
        // if (import.meta.env.DEV)
        //     searchStr = 'Piedmont'
    });

</script>

<Container id="search">
<form onsubmit={(e) => { e.preventDefault(); onSearchClick(); }}>
    <div class="bg-slate-800/50 flex rounded-lg p-2 border-2 border-blue-500/40 backdrop-blur-sm shadow-md hover:border-blue-400 transition-all duration-200">
        <button type="button" 
                id="searchBtn"
                aria-label="Search"
                class="border-0
                       pl-2 pr-2
                       rounded-md
                       bg-transparent
                       leading-tight
                       cursor-pointer
                       transition-all duration-200
                       hover:scale-110
                       text-blue-300 hover:text-blue-200" 
                       onclick={onSearchClick}> 
            <svg xmlns="http://www.w3.org/2000/svg" aria-label="Search"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    xml:space="preserve"
                    class="h-5 w-5" 
                    version="1.1" id="srchSvg"
                    viewBox="0 0 56.966 56.966" 
                    style="enable-background:new 0 0 56.966 56.966;"
                    fill="currentColor">
                <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
            </svg>
        </button>
        <input  type="search"
                class="flex 
                        border-0 bg-transparent
                        rounded-md
                        px-2
                        w-full                                
                        text-gray-200
                        placeholder:text-gray-400
                        focus:outline-none
                        focus:ring-1 focus:ring-blue-400/50" 
                placeholder="City [,State] [Zip]" 
                aria-label="Search Text" 
                aria-describedby="search-addon" 
                bind:value={searchStr}/>
        <button type="button" 
                id="clearBtn"
                aria-label="Clear Search"
                class="border-0
                        bg-transparent
                        rounded-md
                        cursor-pointer
                        transition-all duration-200
                        hover:scale-110
                        text-slate-400 hover:text-slate-300"
                        onclick={onSearchClearClick}>
            <svg xmlns="http://www.w3.org/2000/svg" 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    stroke-width="2" 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    aria-label="Clear Search">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        </button> 
    </div>
</form>
{#if suggestions.length > 0}
<div class="flex flex-wrap gap-2 pt-2">
    {#each suggestions as suggestion}
    <!-- svelte-ignore a11y_invalid_attribute -->
    <a class="group" onclick={() => onLocationClick(suggestion)} href="#">
        <div class="
            border-2 rounded-md px-3 py-1.5
            transition-all duration-200 ease-in-out
            cursor-pointer
            border-blue-500/40 bg-slate-800/50 text-gray-200
            hover:border-blue-400 hover:bg-blue-500/10 hover:shadow-md hover:shadow-blue-500/10
        ">
            {suggestion.text.replace(', USA', '')}
        </div>
    </a>
    {/each}
</div>
{/if}
{#if notFound}
<div class="flex flex-wrap pt-2">
    <div class="
        border-2 rounded-md px-3 py-2
        border-red-500/40 bg-red-900/20 text-red-200
        shadow-md
    ">
        No Locations Found 😢
    </div>
</div>
{/if}

</Container>