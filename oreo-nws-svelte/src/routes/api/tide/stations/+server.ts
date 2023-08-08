// This API returns all the tide stations withing (n) mile range of given
// lat and lon...

import type { stationsResponse } from 'src/models/noaa/stationsResponse';
import {writable} from 'svelte/store';
import { fail, json } from '@sveltejs/kit';
import axios from 'axios';

const posts = writable([]);

// Graphical realtime tide data...
// https://tidesandcurrents.noaa.gov/noaatidepredictions.html?id=8669346

// 1. ALL - tide stations... 3321... Needs caching
// GET https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/stations.json?type=tidepredictions

// NOAA seems to only return all stations so we'll hae to filter on our own...
function getAllStations() {
    

}

// Filter out the stations that are out of range of the location we're interested in...
function getStationsInRange(lat: number, lon: number, range: number) {


}

// http://localhost:5173/api/tide/stations
export async function GET(event) {

    const params = event.url.searchParams

	const lat = params.get('lat')
	const lon = params.get('lon')

    return json(`{` + lat + `}`)

}


  



