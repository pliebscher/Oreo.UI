<script lang="ts">
    import { clearFavorites } from "../../stores/favoriteStore";
    import Container from "../../components/container.svelte";

	import Favorites from "../../components/favorites.svelte";

</script>

<Favorites edit={true} />

<Container title="Tools" id="tools">
    <table class="w-full">
        <tbody>
            <tr>
                <td class="p-1">
                        <!-- svelte-ignore a11y-invalid-attribute -->
                        <a href="#" on:click={ () => { clearFavorites() } }>🗑️</a>
                </td>
                <td>
                    <!-- svelte-ignore a11y-invalid-attribute -->
                    <a href="#" on:click={ () => { clearFavorites() } } aria-label="Clear Favorites">
                        Clear History
                    </a>
                </td>
            </tr>
        </tbody>
    </table>
</Container>
