<script lang="ts">
    import { onMount } from "svelte";
    import { createEventDispatcher } from 'svelte';

    import { addFavorite, setCurrentFav } from "../stores/favoriteStore";
    import type { arcGISSearchSuggestion } from "../models/arcGISSearchSuggestion";
    import { getLocation, getSuggestions } from "../services/arcGISService";

    import Container from "./container.svelte";	

	const dispatch = createEventDispatcher();

    let searchStr: string = ''
    let notFound: boolean = false

    let suggestions: arcGISSearchSuggestion[] = []

    // Watch the search box for changes...
    $: {
        if (searchStr.length == 0) {
            clearSearch()
        } else {
            search(searchStr)
        }
    }

    async function search(criteria: string) {
        if (searchStr.length > 0) {
            suggestions = await getSuggestions(criteria)        
            // Filter non-USA results as they don't work!
            suggestions = suggestions.filter(loc => loc.text.endsWith(', USA'))
        }

        notFound = (suggestions.length == 0 && searchStr.length > 1)
    }

	async function onSearchClick() {
        search(searchStr)
    }

    function clearSearch() {
        notFound = false
        searchStr = ''
        suggestions = []
    }

    async function onLocationClick(suggestion: arcGISSearchSuggestion) {
        // Get the location containing the lat/lon needed for the weather and forecast components...
        const location = await getLocation(suggestion.magicKey)
        // Set as current favorite...
        setCurrentFav(suggestion)
        // 
        addFavorite(suggestion)
        // Raise the Selected event...
        dispatch('locationSelected', location);
    }

    function onSearchClearClick() {
        clearSearch()
    }

    onMount(() => {
        if (import.meta.env.DEV)
            searchStr = 'Piedmont'
    })

</script>

<Container id="search">
    <form on:submit|preventDefault={onSearchClick}>
        <div class="bg-white flex rounded p-.5 border-slate-50">
            <button type="button" 
                    id="searchBtn"
                    aria-label="Search"
                    class="border-0
                           pl-2 pt-1 pr-2
                           rounded 
                           bg-white 
                           leading-tight
                           cursor-pointer" 
                           on:click={onSearchClick}> 
                <svg xmlns="http://www.w3.org/2000/svg" aria-label="Search"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        xml:space="preserve"
                        class="h-5 w-4" 
                        version="1.1" id="srchSvg"
                        viewBox="0 0 56.966 56.966" 
                        style="enable-background:new 0 0 56.966 56.966;">
                    <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                </svg>
            </button>
            <input  type="search"
                    class=" flex 
                            border-0 border-white bg-white
                            rounded
                            pl-2
                            w-full                                
                            text-gray-500                                 
                            focus:outline-none " 
                    placeholder="City [,State] [Zip]" 
                    aria-label="Search Text" 
                    aria-describedby="search-addon" 
                    bind:value={searchStr}/>
            <button type="button" 
                    id="clearBtn"
                    aria-label="Clear Search"
                    class=" border-0
                            pt-1
                          bg-white
                            rounded 
                            cursor-pointer"
                            on:click={onSearchClearClick}>
                <svg xmlns="http://www.w3.org/2000/svg" 
                        width="20" 
                        height="20" 
                        viewBox="0 0 24 24" 
                        stroke="#64748b" 
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
    <div class="flex flex-wrap pt-1">
        {#each suggestions as suggestion}
        <!-- svelte-ignore a11y-invalid-attribute -->
        <a class="" on:click={() => onLocationClick(suggestion)} href="#favorites">
            <div class="border rounded m-0.5 px-1">
                {suggestion.text.replace(', USA', '')}
            </div>
        </a>
        {/each}
    </div>
    {/if}

    {#if notFound}
    <div class="flex flex-wrap pt-1">
        <div class="border rounded m-0.5 px-1">
            No Locations Found 😢
        </div>
    </div>
    {/if}

</Container>