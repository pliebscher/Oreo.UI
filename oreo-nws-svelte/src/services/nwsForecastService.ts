import nwsClient from './nwsClient';

import type { nwsForecast } from 'src/models/nwsForecast';

// https://forecast.weather.gov/MapClick.php?=&lat=37.82&lon=-122.23&FcstType=json
export async function getForecast(lat: string, lon: string) {
    const query = `MapClick.php?=&lat=${lat}&lon=${lon}&FcstType=json`
    return (await nwsClient.get<nwsForecast>(query)).data
}