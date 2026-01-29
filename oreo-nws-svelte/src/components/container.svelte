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

<div id={id} class="w-full rounded border-2 p-2 mt-1 bg-gradient-to-r from-gray-900 to-blue-700">
    {#if title?.length > 0 || undefined}
    <div class="text-xl font-medium">
        {title}
        {#if seperator}
        <div class="w-full">
            <hr />
        </div>
        {/if}
    </div>
    {/if}                        
    <div class="">
        {@render children?.()}
    </div>
</div>