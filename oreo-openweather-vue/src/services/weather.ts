import axios from 'axios'
import type { GeoLocation } from '@/models/GeoLocation'

const axiosClient = axios.create({
    baseURL: `http://localhost:36416/api/`,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });

export default async function getLocations(city?: string, state?: string, country?: string) {
    const query = "GeoLocation?City=" + city + "&State=" + (state ? state : "") + "&Country=" + (country ? country : "US")
    const locationResponse = await axiosClient.get<GeoLocation[]>(query)
    return locationResponse.data
}