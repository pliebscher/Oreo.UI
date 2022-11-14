import { Coords } from "./Coords"

export class City {
    name: string = ''
    country: string = ''
    population: Number = 0
    timezone: Number = 0
    sunrise: Number = 0
    sunset: Number = 0
    coords: Coords = new Coords()
}
