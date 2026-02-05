import axios from 'axios'

import type { arcGISLocation } from '../models/arcGIS/arcGISLocation';
import type { station } from '../models/noaa/station';
import type { tidePrediction } from '../models/noaa/tidePrediction';

const _baseUrl: string = '/api/' // Weather Fish API route

const apiClient = axios.create({
    baseURL: _baseUrl,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
})

export async function getTideStations(location: arcGISLocation) {
    const query = `tide/stations?lat=${location.feature.geometry.y}&lon=${location.feature.geometry.x}`
    return (await apiClient.get<station[]>(query)).data
}

export async function getTidePredictions(stationId: string) {
    const query = `tide/predictions/${stationId}`
    return (await apiClient.get<tidePrediction[]>(query)).data
}
