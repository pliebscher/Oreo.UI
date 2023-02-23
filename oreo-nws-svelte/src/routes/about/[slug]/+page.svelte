<script lang="ts">
// Test page to demonstrate url slug routing //

import { page } from '$app/stores';
console.info($page)

</script>

slug: {$page.params.slug}