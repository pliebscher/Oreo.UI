// This does not need to be in a API method, but who cares!
import type { tidePredictions } from '../../../../../models/noaa/tidePredictions';
import type { tidePrediction } from '../../../../../models/noaa/tidePrediction';

import { fail, json } from '@sveltejs/kit';
import axios from 'axios';

// 2. CURRENT - tide data for an individual stations, by Station ID, H=High, L=Low
// GET https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?product=predictions&begin_date=20230803&end_date=20230806&datum=MLLW&station=8669346&time_zone=lst_ldt&units=english&interval=hilo&format=json&application=NOS.COOPS.TAC.TidePred

//const currentDate = new Date();
const fromDate = new Date().toISOString().substring(0, 10).replaceAll('-', '');

// http://localhost:5173/api/tide/predictions/8669346
export async function GET(event: { params: { slug: any; }; }) {

    const stationId = event.params.slug
    const apiUrl = `https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?product=predictions&begin_date=${fromDate}&end_date=${fromDate}&datum=MLLW&station=${stationId}&time_zone=lst_ldt&units=english&interval=hilo&format=json&application=NOS.COOPS.TAC.TidePred`

    let response: tidePrediction[] = []

    try {
        response = (await axios.get<tidePredictions>(apiUrl)).data.predictions
    }
    catch {
        // This is bad, I know, but NOAA returns 200 even if the station is not found which should generally not be the case from the front-end UI
    }   

    console.debug(response)
    return json(response)

}