import type { arcGISLocation } from "./arcGISLocation";

// Root: https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/find?magicKey=dHA9MCNsb2M9MzYyMzYyNiNsbmc9NTQjcGw9NTc3NDg3I2xicz0xNDo0MTQzMzE3&f=json
export class arcGISLocationResults {
    locations: arcGISLocation[] = []
}