// https://learn.svelte.dev/tutorial/get-handlers
// https://www.ncdc.noaa.gov/cdo-web/webservices/v2#stations
import { fail, json } from '@sveltejs/kit';
import axios from 'axios';

const apiUrl = 'https://www.ncei.noaa.gov/cdo-web/api/v2/stations';
const apiKey = 'picpvejsjAiQUKUgLifyIkWojGYdFYkj' // TODO: Move to secrets.ts

export async function GET(event) {

	const params = event.url.searchParams

	const lat = params.get('lat')
	const lon = params.get('lon')

	// TODO: Validate lat and lon

	// 37.83, -122.22 Piedmont
	const coords = getBoundingRect((lat ? parseFloat(lat) : 0), (lon ? parseFloat(lon) : 0), 1)
	const coordsParam = `${coords[0][0]},${coords[0][1]},${coords[1][0]},${coords[1][1]}`
	const response = json({
		success: true,
		data: await getTideStations(coordsParam),
	  });

	return response
}

async function getTideStations(coords: string) {

console.debug(coords)

    const params = {
        extent: coords,
        radius: 1,
		//datatypeid: 'EMNT&datatypeid=EMXT&datatypeid=HTMN',
    };
    
	const headers = {
	'token': `${apiKey}`,
	};
    
	const response = await axios.get(apiUrl, { params, headers });
	//console.log(response.data)

	if (response.status === 200) {
		return response.data;
	} else {
		throw new Error(response.statusText);
	}
}

function convertMilesToDegrees(miles: number): number {
	const milesPerDegree = 69.0; // Approximate value for latitude
	return miles / milesPerDegree;
}
  
function getBoundingRect(latitude: number, longitude: number, areaInMiles: number): [[number, number], [number, number]] {
	const latitudeDegrees = convertMilesToDegrees(areaInMiles);
	const longitudeDegrees = convertMilesToDegrees(areaInMiles) / Math.cos(latitude * (Math.PI / 180));
  
	const lowerLeft: [number, number] = [latitude - latitudeDegrees, longitude - longitudeDegrees];
	const upperRight: [number, number] = [latitude + latitudeDegrees, longitude + longitudeDegrees];
  
	return [lowerLeft, upperRight];
}
  
  // Example usage
//   const latitude = 37.7749; // Example latitude
//   const longitude = -122.4194; // Example longitude
//   const areaInMiles = 10; // Example area in miles
  
//   const [lowerLeft, upperRight] = generateBoundingBox(latitude, longitude, areaInMiles);
  
//   console.log("Lower Left Coordinate:", lowerLeft);
//   console.log("Upper Right Coordinate:", upperRight);