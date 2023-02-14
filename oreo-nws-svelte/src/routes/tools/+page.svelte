<script lang="ts">
    import { clearFavorites } from "../../stores/favoriteStore";
    import Container from "../../components/container.svelte";

</script>

<Container title="Tools" id="tools">
    <table class="">
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
</Container>
