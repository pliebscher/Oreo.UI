<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent ({
    name: "contentBox",
    props: {
        title: String
    }
})
</script>

<template>
    <div class="rounded-xl border-2 p-3 m-1 bg-gradient-to-r from-gray-900 to-blue-700">
        <div v-if='title' class="text-xl font-medium">
            {{title}}
            <hr />
        </div>                        
        <div class="">
            <slot />
        </div>
    </div>
</template>
