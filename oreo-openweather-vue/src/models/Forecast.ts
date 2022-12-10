import { Metrics } from "./Metrics"
import type { Weather } from "./Weather"

export class Forecast {
	metrics: Metrics = new Metrics()
    weather: Weather[] = []
    unixEpochTime: string = ''
    localDateTime: string = ''
}