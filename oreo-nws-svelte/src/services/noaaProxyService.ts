import axios from 'axios'
import type { arcGISLocation } from 'src/models/arcGISLocation';
import type { noaaStationsResult } from 'src/models/noaaStationData';

const _baseUrl: string = '/api/' // Weather Fish API route

const wfClient = axios.create({
    baseURL: _baseUrl,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
})

export async function getTideStations(location: arcGISLocation) {
    const query = `tideStations?lat=${location.feature.geometry.y}&lon=${location.feature.geometry.x}`
    console.debug(query)
    return (await wfClient.get<noaaStationsResult>(query)).data.data.results
}
