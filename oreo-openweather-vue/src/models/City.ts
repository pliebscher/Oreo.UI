import { Coords } from "./Coords"

export class City {
    name: string = ''
    country: string = ''
    population: number = 0
    timezone: number = 0
    sunrise: number = 0
    sunset: number = 0
    coords: Coords = new Coords()
}
