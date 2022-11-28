
<template>

    <nav class="green">
        <div class="" >
            <div class="input-group">
                <input type="search" autofocus class="rounded" placeholder="City [,State]" aria-label="City [,State]" aria-describedby="search-addon" />
                <button type="button" class="">
                    <img class="svgsearch" src="/search.svg" />
                </button>            
            </div>
        </div>
    </nav>

</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent ({

    // https://getbootstrap.com/docs/5.0/components/navbar/#placement ^^^

})
</script>

<style scoped>
nav {
    position: fixed;
    background: rgb(62, 60, 60);
}
</style>