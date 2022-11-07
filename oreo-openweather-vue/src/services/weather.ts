import axios from 'axios'

const axiosClient = axios.create({
    baseURL: `http://localhost:36416/api/`,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });

export default async function getLocations(city?: string, state?: string, country?: string) {
    const url = "http://localhost:36416/api/GeoLocation?City=" + city + "&State=" + (state ? state : "") + "&Country=" + (country ? country : "US");
    await axios.get<Location[]>(url)
        .then((res) => {
            return res.data.values; 
        })
        .catch( (error) => { 
                if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
                } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        })
}