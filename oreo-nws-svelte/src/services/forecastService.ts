import axios from 'axios'
import type { Forecast } from 'src/models/Forecast';

let apiBaseURL: string = 'https://forecast.weather.gov/'

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

// https://forecast.weather.gov/MapClick.php?=&lat=37.82&lon=-122.23&FcstType=json
export async function getForecast(lat: string, lon: string) {
    const query = `MapClick.php?=&lat=${lat}&lon=${lon}&FcstType=json`
    return (await axiosClient.get<Forecast>(query)).data
}