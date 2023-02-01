import axios from 'axios'

const _baseUrl: string = 'https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/'

const arcGISClient = axios.create({
    baseURL: _baseUrl,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
})

arcGISClient.interceptors.response.use(
    (response) => response,
    handleError
    )
    

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

export default arcGISClient






