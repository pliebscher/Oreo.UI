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
    <div class=" p-3">
        <div class=" box rounded-xl shadow-ms flex  md:w-auto ">
            <div>
                <div v-if='title' class="text-xl font-medium text-slate">
                    {{title}}
                </div>
                <hr v-if='title' />            
                <p class="text-slate-500">
                    <slot />
                </p>
            </div>            
        </div>
    </div>
</template>

<style scoped>
.box { /* TODO: Replace with Tailwind classes */
  border: 2px solid #73AD21; 
  padding: 20px;
  background: rgb(62, 60, 60);
}
</style>