import axios from 'axios'
import type { arcGISLocation } from 'src/models/arcGISLocation';
import type { noaaStationsResult } from 'src/models/noaaStationData';

import type { station } from 'src/models/noaa/station';

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

export async function getTideStation(stationId: number) {
    const query = `tide/station/${stationId}`
    return (await apiClient.get<station>(query)).data
}
