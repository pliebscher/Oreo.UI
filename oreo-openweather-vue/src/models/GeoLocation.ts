export interface IGeoLocation {
    name: string
    state: string
    country: string
    lat: number
    lon: number
}

export class GeoLocation implements IGeoLocation {

    GeoLocation() {}

    name: string = ""
    state: string = ""
    country: string = ""
    lat: number = 0
    lon: number = 0    
}