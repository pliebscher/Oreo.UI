import type { arcGISLocationResults } from "src/models/arcGISLocationResults";
import type { arcGISSearchResult } from "src/models/arcGISSearchResults";
import arcGISClient from "./arcGISClient";

// 1. Locations search results..
//  https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/suggest?f=json&countryCode=USA,PRI,VIR,GUM,ASM&category=Postal,Populated%20Place&maxSuggestions=5&text=pied
export async function getSuggestions(search: string) {
    const query = `suggest?f=json&countryCode=USA,PRI,VIR,GUM,ASM&category=Postal,Populated%20Place&maxSuggestions=5&text=${search}`
    return (await arcGISClient.get<arcGISSearchResult>(query)).data.suggestions
}

// 2. Retreive Lat/Long location data
//  https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/find?magicKey=dHA9MCNsb2M9MzYyMzYyNiNsbmc9NTQjcGw9NTc3NDg3I2xicz0xNDo0MTQzMzE3&f=json
export async function getLocation(magicKey: string) {
    const query = `find?magicKey=${magicKey}&f=json`
    return (await arcGISClient.get<arcGISLocationResults>(query)).data.locations[0]
}