
<template>

    <nav class="navbar navbar-expand-sm box-rnd-green green">
        <div class="container-fluid" >
            <div class="input-group">
                <input type="search" autofocus class="form-control form-control-sm rounded" placeholder="City [,State]" aria-label="City [,State]" aria-describedby="search-addon" />
                <button type="button" class="btn btn-success btn-sm">
                    <img class="svgsearch" src="/public/search.svg" />
                </button>            
            </div>
        </div>
    </nav>

</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent ({


})
</script>

<style scoped>
nav {
    position: fixed;
    background: rgb(62, 60, 60);
}
</style>