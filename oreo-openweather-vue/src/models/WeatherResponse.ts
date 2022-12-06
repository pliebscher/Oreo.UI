import { Metrics } from "./Metrics"
import type { Weather } from "./Weather"

export class WeatherResponse {
    timezone: number = 0
    weather: Weather[] = []
    metrics: Metrics = new Metrics
    unixEpochTime: string = ''
    city: string = ''
}
