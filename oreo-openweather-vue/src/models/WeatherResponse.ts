interface WeatherResponse {
    city: City
    forecast: Forecast[]
}

// "weatherResponse": {
//     "forecast": [
//       {
//         "unixEpochTime": 1666807200,
//         "metrics": {
//           "temp": 63,
//           "feelsLike": 62.56,
//           "tempMin": 63,
//           "tempMax": 64.69,
//           "pressure": 1023,
//           "humidity": 76
//         },
//         "weather": [
//           {
//             "code": 500,
//             "summary": "Rain",
//             "description": "light rain",
//             "icon": "10n"
//           }
//         ],
//         "wind": {
//           "speed": 12.03,
//           "deg": 80,
//           "gust": 12.57
//         },
//         "visibility": 10000,
//         "localDateTime": "2022-10-26 18:00:00"
//       }
//     ],
//     "city": {
//       "name": "Qidong Yanchang",
//       "coord": {
//         "lat": 32,
//         "lon": 122
//       },
//       "country": "CN",
//       "population": 1000,
//       "timezone": 28800,
//       "sunrise": 1666821839,
//       "sunset": 1666861656
//     }
//   }