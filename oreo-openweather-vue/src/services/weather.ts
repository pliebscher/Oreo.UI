import axios from 'axios'
//import process from 'process' // BROKEN, see main.ts
import type { GeoLocation } from '@/models/GeoLocation'
import type { ForecastResponse } from '@/models/ForecastResponse'
import type { WeatherResponse } from '@/models/WeatherResponse';

const axiosClient = axios.create({
    // TODO: Add to dev/prod env/config
    //baseURL: `http://localhost:36416/api/`, // Dev
    baseURL: `http://20.120.148.155/api/`, // Prod
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
    //toast.error(error.response.data.message);
    console.error(error.response.status + ' - ' + error.response.statusText + ': ' + error.response.data.title)
    // TODO: Send error to an error service API...
  }
}

// API calls...
export async function getLocations(city?: string, state?: string, country?: string) {
  const query = "GeoLocation?City=" + (city ? city : "") + "&State=" + (state ? state : "") + "&Country=" + (country ? country : "US")
  return (await axiosClient.get<GeoLocation[]>(query)).data
}

export async function getWeather(location?: GeoLocation) {
  if (location?.lat && location?.lon) {
    return (await axiosClient.get<WeatherResponse>('Weather?Lat=' + location.lat + '&Lon=' + location.lon)).data
  }
}

export async function getForecast(location?: GeoLocation) {
  if (location?.lat && location?.lon) {
    return (await axiosClient.get<ForecastResponse>('Forecast?Lat=' + location.lat + '&Lon=' + location.lon)).data
  }
}