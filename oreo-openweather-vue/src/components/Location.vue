<script lang="ts">
import { defineComponent } from 'vue'
import { getLocations } from '@/services/weather'
import type { GeoLocation } from '@/models/GeoLocation'

export default defineComponent({
    name: "Location",
    data() {
        return {
            locations: [] as GeoLocation[],
            searchStr: "Piedmont ",
            locationsVis: false,
            errorVis: false,
        };
    },
    emits: {
        onLocationChanged(location: GeoLocation) {
            console.info('onLocationChanged.Validate: ' + location)
            return location !== undefined
        }
    },
    methods: {
        async getLocations() {
            // Parse location search string... TODO: Do this better!
            if (this.searchStr.length > 0) {
                var locArr = this.searchStr.split(/[\s,]+/);
                if (locArr.length > 0)
                this.locations = await getLocations(locArr[0], locArr[1], "us")
            }

            if (this.locations.length > 0) {
                if (this.locations.length == 1) {
                    this.selectLocation(this.locations[0]);
                    this.locationsVis = false;
                }
                else {
                    this.locationsVis = true;
                }
                this.errorVis = false;
            }
            else { // Location(s) Not Found...
                this.locationsVis = false;
                this.errorVis = true;
            }
        },
        async selectLocation(location: GeoLocation) {
            console.info("Location.selectLocation: " + location.toString());
            this.$emit("onLocationChanged", location);
        }
    },
    async mounted() {

    }
})
</script>

<template>
        <div class="box-rnd-green">
            <div class="row row-no-gutters">
                <div class="col-sm-4">
                    <label for="locationTxt">City [,State]:</label>                                    
                </div>
                <div class="col-sm-5">                    
                    <input type="text" class="form-control form-control-sm" v-model="searchStr" placeholder="City, [State]">
                </div>
                <div class="col-sm-3">
                    <button class="btn btn-success btn-sm" @click="getLocations()">Lookup</button>
                </div>
            </div>
            
        </div>

        <div>&nbsp;</div>

        <div>
            <div v-if="errorVis" class="box-rnd-green green">Location Not Found 😢</div>
            <div v-if="locations?.length > 1" class="box-rnd-green">
                <b>Found {{locations?.length}} Locations</b>
                <hr />
                <div v-for="location in locations">
                    <a @click="selectLocation(location)" href="#">{{location.name}}</a>, {{location.state}}, {{location.country}}
                </div>
            </div>
        </div>

        <div>&nbsp;</div>

</template>

<style scoped>

</style>