<script lang="ts">
import { defineComponent } from 'vue'
import type { GeoLocation } from '@/models/GeoLocation'
import { useFavoritesStore } from '@/stores/favorites'
import ContentBox from './ContentBox.vue'

export default defineComponent({
    name: "Favorites",
    setup() {
        const favoriteStore = useFavoritesStore();
        return { favoriteStore };
    },
    data() {
        return {
            favorites: [] as GeoLocation[],
        };
    },
    emits: {
        onLocationChanged(location: GeoLocation) { return location; }
    },
    methods: {
        async selectLocation(location: GeoLocation) {
            this.$emit("onLocationChanged", location);
        },
    },
    components: { ContentBox }
})
</script>

<template>
    <ContentBox id="favorites" v-if="favoriteStore.favorites?.length > 0" title="Favorite Locations">
        <div>
            <table>    
                <TransitionGroup name="favs">            
                    <tr v-for="location in favoriteStore.favorites" :key="location.lat + location.lon">                       
                        <td class="">
                            <a @click="selectLocation(location)" href="#weather">{{location.name}}</a>&nbsp;{{location.state}}, {{location.country}}
                        </td>
                        <td class="">
                            <a @click="favoriteStore.delFovorite(location)" href="#favorites" alt="Nuke Favorite">🗑️</a>
                        </td>                        
                    </tr>             
                </TransitionGroup>   
            </table>
        </div>
    </ContentBox>
</template>

<style scoped>

.favs-enter-active, .favs-leave-active {
  transition: all 1s ease;
}

.favs-enter-from, .favs-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

</style>