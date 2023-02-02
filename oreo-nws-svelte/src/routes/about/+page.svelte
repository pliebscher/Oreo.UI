<script lang="ts">
	import Header from "../../components/header.svelte";
    import { clearFavorites } from "../../stores/favoriteStore"
    import { version } from '$app/environment'
    import { onMount } from "svelte";

    // Play Canvas...
    let canvas: HTMLCanvasElement

    onMount(() => {
        //const ctx = canvas.getContext('2d')        
    })

</script>

<Header />

<div class="mt-10 w-full"> 
      <table class="ml-2 w-full">
        <tr>
            <td class="p-1">
                <a href="https://svelte.dev/" aria-label="Svelte">
                    <img src="svelte.png" alt="Svelte" aria-label="Svelte" class="mr-1" width="23px" height="23px" />
                </a>
            </td>
            <td class="">
                <a href="https://svelte.dev/" aria-label="Svelte">
                    Svelte + SvelteKit
                </a>
            </td>
        </tr>
        <tr>
            <td class="p-1">
                <a href="https://tailwindcss.com/" aria-label="Tailwind">
                    <img src="tailwind.svg" alt="Tailwind" aria-label="Tailwind" class="mr-1" width="23px" height="23px" />
                </a>
            </td>
            <td>
                <a href="https://tailwindcss.com/" aria-label="Tailwind">
                    Tailwind CSS
                </a>
            </td>
        </tr>
        <tr>
            <td class="p-1">
                <a href="https://www.weather.gov/" aria-label="National Weather Service">
                    <img src="nws.png" alt="National Weather Service" aria-label="National Weather Service" class="mr-1" width="23px" height="23px" />
                </a>
            </td>
            <td>
                <a href="https://www.weather.gov/">
                    National Weather Service
                </a>
            </td>
        </tr>

        <tr>
            <td class="p-1">
                <a href="https://www.arcgis.com" aria-label="ArcGIS Online">
                    <img src="arcgis-online-icon.png" alt="ArcGIS Online" aria-label="ArcGIS Online" class="mr-1" width="23px" height="23px" />
                </a>
            </td>
            <td>
                <a href="https://www.arcgis.com">
                    ArcGIS Online
                </a>
            </td>
        </tr>

        <tr>
            <td class="p-1">
                <a href="https://github.com/pliebscher/Oreo.UI/tree/master/oreo-nws-svelte" aria-label="GitHub">
                    <img src="GitHub.png" alt="GitHub" aria-label="GitHub" class="mr-1" width="23px" height="23px" />
                </a>
            </td>
            <td>
                <a href="https://github.com/pliebscher/Oreo.UI/tree/master/oreo-nws-svelte" aria-label="GitHub">
                    GitHub Repository
                </a>
            </td>
        </tr>
        <tr> 
            <td colspan="2"><hr /></td>
        </tr>
        <tr>
            <td class="p-1">
                <!-- svelte-ignore a11y-invalid-attribute -->
                <a href="#" on:click={ () => { clearFavorites(); alert('Favorites cleared!') } }>🗑️</a>
            </td>
            <td>
                <!-- svelte-ignore a11y-invalid-attribute -->
                <a href="#" on:click={ () => { clearFavorites(); alert('Favorites cleared!') } } aria-label="Clear Favorites">
                    Clear Favorites
                </a>
            </td>
        </tr>
      </table>
      <canvas bind:this={canvas} class="w-full">

      </canvas>
</div>