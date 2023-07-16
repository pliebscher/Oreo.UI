<script lang="ts">
    import { onMount } from 'svelte';
	import Container from './container.svelte';
  
    let isMobile = false;
  
    onMount(() => {
      const userAgent = navigator.userAgent.toLowerCase();
      isMobile = /mobile|android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
    });

</script>

{#if !isMobile}
<Container id="mobile-first">
    <table class="w-full shadow-lg rounded-sm bg-sky-700 mt-0 mb-0">
        <tr>
            <td class="w-7 align-top">
                <img src="/images/info.png" alt="Mobile App" aria-label="This is a mobile-first app." class="w-6 align-top" />
            </td>
            <td class="">
                This site is currently designed to be mobile-first. Please use a phone or tablet for the best experience.
            </td>
        </tr>
    </table>
</Container>
{/if}