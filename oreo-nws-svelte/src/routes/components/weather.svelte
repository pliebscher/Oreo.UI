<script lang="ts">
	import type { GeoLocation } from "../../models/GeoLocation";
    import type { Forecast } from "../../models/Forecast";
    import Container from "./container.svelte";

    // Props...
    export let location: GeoLocation
    export let forecast: Forecast | undefined

</script>
   
{#if location?.lat}
<Container title="{location?.name}, {location?.state}">
    <div id="weather" class="w-full shadow-lg rounded-lg bg-sky-700 mt-2 mb-0">
        <div class="grid grid-flow-col auto-cols-max  ">
            <div class="p-4">
                <img class=" rounded-md" width="60px" height="60px" src="{forecast?.data.iconLink[0]}" alt="{forecast?.data.weather[0]}" />
            </div>

            <div class="py-4  ">    
                <div class="pl-3 text-2xl ">
                    {forecast?.currentobservation.Temp}&deg;
                </div>                
                <div class="pl-3">
                    {forecast?.data.weather[0]}
                </div>
            </div>
            
            <!-- <div class="pt-5 pl-1">
                <div>H : </div>
                <div>L : </div>
            </div> -->
        </div>
        <div class="border-0 ml-4 mr-3 text-right pb-2 text-sm">
            {forecast?.currentobservation.Date}
        </div>
    </div>
</Container>
{/if}
