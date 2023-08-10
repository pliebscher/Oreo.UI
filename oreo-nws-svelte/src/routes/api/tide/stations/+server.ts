import type { stationsResponse } from '../../../../models/noaa/stationsResponse';
import type { station } from '../../../../models/noaa/station';

import { fail, json } from '@sveltejs/kit';
import axios from 'axios';

// Graphical realtime tide data...
// https://tidesandcurrents.noaa.gov/noaatidepredictions.html?id=8669346

// 1. ALL - tide stations... 3321... Needs caching
// GET https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/stations.json?type=tidepredictions
// TODO: This is a nasty API call and should be cached server-side!
const apiUrl: string = 'https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/stations.json?type=tidepredictions'
const searchRadius = 5 // the area in miles around the given lat/long to look for stations

let response: stationsResponse // This lets us cache the response for this instance of the API

// http://localhost:5173/api/tide/stations
export async function GET(event) {

    const params = event.url.searchParams

	const lat: string | null = params.get('lat')
	const lon: string | null = params.get('lon')

    let lat1: number = 0
    let lon1: number = 0

    if (lat)
        lat1 = parseFloat(lat)

    if (lon)
        lon1 = parseFloat(lon)

    if (!response) {
        console.debug('Fetching NOAA Tide Station List...')
        response = (await axios.get<stationsResponse>(apiUrl)).data;
    }    

    const stationsInRange: station[] = []

    for (const station of response.stations) {

        if (areCoordinatesInRange(lat1, lon1, station.lat, station.lng, searchRadius))
            stationsInRange.push(station)
    }

    return json(stationsInRange)

}

// Credit ChatGPT: "provide a typescript function that determines if two sets of latitude and longitude are in a (n) mile radius"
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const earthRadiusInMiles = 3958.8; // Earth's radius in miles

    const dLat = degToRad(lat2 - lat1);
    const dLon = degToRad(lon2 - lon1);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(degToRad(lat1)) * Math.cos(degToRad(lat2)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadiusInMiles * c;

    return distance;
}
  
function degToRad(deg: number): number {
    return deg * (Math.PI / 180);
}
  
function areCoordinatesInRange(lat1: number, lon1: number, lat2: number, lon2: number, radius: number): boolean {
    const distance = calculateDistance(lat1, lon1, lat2, lon2);
    return distance <= radius;
}

  



