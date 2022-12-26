// TODO: Switch to ArcGIS...
// https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/suggest?
// callback=jQuery11020631306415855886_1672093525924&f=json 
// &countryCode=USA,PRI,VIR,GUM,ASM
// &category=Land Features,Bay,Channel,Cove,Dam,Delta,Gulf,Lagoon,Lake,Ocean,Reef,Reservoir,Sea,Sound,Strait,Waterfall,Wharf,Amusement Park,Historical Monument,Landmark,Tourist Attraction,Zoo,College,Beach,Campground,Golf Course,Harbor,Nature Reserve,Other Parks and Outdoors,Park,Racetrack,Scenic Overlook,Ski Resort,Sports Center,Sports Field,Wildlife Reserve,Airport,Ferry,Marina,Pier,Port,Resort,Postal,Populated Place
// &maxSuggestions=5&text=piedmont, ca

import axios from 'axios'
import type { GeoLocation } from "../models/GeoLocation";

let apiBaseURL: string = import.meta.env['VITE_DEV_WEATHER_API_URL']

if(import.meta.env.PROD)
  apiBaseURL = import.meta.env['VITE_PRD_WEATHER_API_URL']

const axiosClient = axios.create({
    baseURL: apiBaseURL,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
});

// Error hanldling...
axiosClient.interceptors.response.use(
  response => response,
  handleError
);

function handleError(error: any) {
  // check for errorHandle config
  if( error.config.hasOwnProperty('errorHandle') && error.config.errorHandle === false ) {
    return Promise.reject(error);
  }
  // if has response show the error
  if (error.response) {
    const msg = error.response.status + ' - ' + error.response.statusText + ': ' + error.response.data.title
    console.error(msg)
    // TODO: Send error to an error service API...
    throw msg
  }
}

export async function getLocations(city?: string, state?: string, country?: string) {
    const query = "GeoLocation?City=" + (city ? city : "") + "&State=" + (state ? state : "") + "&Country=" + (country ? country : "US")
    return (await axiosClient.get<GeoLocation[]>(query)).data
}