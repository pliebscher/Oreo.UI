<script lang="ts">
    import { clearFavorites } from "../../stores/favoriteStore";
    import Container from "../../components/container.svelte";
    import Favorites from "../../components/favorites.svelte";
</script>

<Favorites edit={true} />

<Container title="Tools" id="tools">
    <div class="w-full space-y-2">
        <button 
            type="button"
            class="
                w-full
                flex items-center gap-3
                border-2 rounded-md px-3 py-2
                transition-all duration-200 ease-in-out
                border-blue-500/40 bg-slate-800/50 text-gray-200
                hover:border-blue-400 hover:bg-blue-500/10 hover:shadow-md hover:shadow-blue-500/10
                cursor-pointer
                group
            " 
            onclick={() => clearFavorites()}
        >
            <span class="text-lg transition-all duration-200 group-hover:scale-110">
                🗑️
            </span>
            <span class="flex-1 font-medium text-left">
                Clear History
            </span>
        </button>
    </div>
</Container>
