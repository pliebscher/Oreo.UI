<script lang="ts">

    export let title: string = ''

</script>

<div class="rounded-xl border-2 p-3 m-1 bg-gradient-to-r from-gray-900 to-blue-700">
    {#if title != '' || undefined}
    <div class="text-xl font-medium">
        {title}
        <hr />
    </div>
    {/if}                        
    <div class="">
        <slot />
    </div>
</div>