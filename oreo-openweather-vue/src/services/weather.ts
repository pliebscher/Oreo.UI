import axios from 'axios'
import type { GeoLocation } from '@/models/GeoLocation'

const axiosClient = axios.create({
    baseURL: `http://localhost:36416/api/`,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
});

// TODO: Handle Axios errors...

export async function getLocations(city?: string, state?: string, country?: string) {
    const query = "GeoLocation?City=" + city + "&State=" + (state ? state : "") + "&Country=" + (country ? country : "US")
    const locationResponse = await axiosClient.get<GeoLocation[]>(query)
    return locationResponse.data
}

export async function getWeather(location?: GeoLocation) {
  if (location?.lat && location?.lon) {
      const weatherResponse = await axiosClient.get<WeatherResponse>('Weather?Lat=' + location.lat + '&Lon=' + location.lon)
      return weatherResponse.data
  }
}