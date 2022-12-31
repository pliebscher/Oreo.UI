export class GeoLocation {

    name: string = ''
    state: string = ''
    country: string = ''
    lat: number = 0
    lon: number = 0
    // TODO: Init this only once...
    key: string = this.lat.toString() + '_' + this.lon.toString()
    
}