<script lang="ts">
	import Container from "./container.svelte";

    const currentYear = new Date().getFullYear();

</script>

<Container id="footer">
    <div>
        &copy; {currentYear} Weather Fish
    </div>
</Container>