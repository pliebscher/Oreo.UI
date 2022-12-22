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