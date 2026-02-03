<script lang="ts">
    import { onMount } from 'svelte';
	import Container from './container.svelte';
  
    let isMobile = $state(false);
  
    onMount(() => {
      const userAgent = navigator.userAgent.toLowerCase();
      isMobile = /mobile|android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
    });

</script>

{#if !isMobile}
<Container id="mobile-first">
<div class="w-full shadow-lg rounded-lg border-2 border-blue-500/40 bg-gradient-to-br from-slate-800 to-blue-900/60 mt-0 mb-0 backdrop-blur-sm">
    <div class="flex items-start gap-3 p-3">
        <div class="flex-shrink-0 mt-0.5">
            <img 
                src="/images/info.png" 
                alt="Mobile App" 
                aria-label="This is a mobile-first app." 
                class="w-6 transition-all duration-200 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]" 
            />
        </div>
        <div class="flex-1 text-blue-100 text-sm leading-relaxed">
            This site is designed to be mobile-first. Please use a phone or tablet for the best experience.
        </div>
    </div>
</div>
</Container>
{/if}