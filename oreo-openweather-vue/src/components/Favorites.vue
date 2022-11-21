<script lang="ts">
import { defineComponent } from 'vue'
import type { GeoLocation } from '@/models/GeoLocation'
import { useFavoritesStore } from '@/stores/favorites'

export default defineComponent({
    name: "Favorites",
    setup() {
        const favoriteStore = useFavoritesStore()
        return { favoriteStore }
    },
    data() {
        return {
            favorites: [] as GeoLocation[],
        };
    },
    emits: {
        onLocationChanged(location: GeoLocation) { return location }
    },
    methods: {
        async selectLocation(location: GeoLocation) {
            this.$emit("onLocationChanged", location);
        },
    }
})
</script>

<template>
    <div id="favorites" v-if="favoriteStore.favorites?.length > 0" class="box-rnd-green">
        <div>
            <h3>Favorite Locations</h3>
            <hr />
            <table class="table table-striped table-hover">    
                <TransitionGroup name="favs">            
                    <tr v-for="location in favoriteStore.favorites" :key="location.lat + location.lon">                       
                        <td class="loc">
                            <a @click="selectLocation(location)" href="#weather">{{location.name}}</a>{{location.state}}, {{location.country}}
                        </td>
                        <td class="fav">
                            <a @click="favoriteStore.delFovorite(location)" href="#favorites" alt="Nuke Favorite">🗑️</a>
                        </td>                        
                    </tr>             
                </TransitionGroup>   
            </table>
        </div>
    </div>
</template>

<style scoped>
.loc {
    color: rgba(235, 235, 235, 0.64);
}

.fav {
    text-align: right;
}

.favs-enter-active, .favs-leave-active {
  transition: all 1s ease;
}

.favs-enter-from, .favs-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

</style>