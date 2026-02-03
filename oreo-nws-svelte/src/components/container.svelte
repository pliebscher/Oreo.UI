<script lang="ts">
    import type { Snippet } from 'svelte';
    
    interface Props {
        title?: string;
        seperator?: boolean;
        id?: string;
        children?: Snippet;
    }
    
    let { title = '', seperator = false, id = '', children }: Props = $props();
</script>

<div id={id} class="w-full rounded-lg border border-blue-500/30 p-4 mt-2 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900/50 shadow-lg backdrop-blur-sm">
    {#if title?.length > 0 || undefined}
    <div class="text-lg font-semibold text-white mb-3">
        {title}
        {#if seperator}
        <div class="w-full mt-2">
            <hr class="border-blue-500/20" />
        </div>
        {/if}
    </div>
    {/if}                        
    <div>
        {@render children?.()}
    </div>
</div>