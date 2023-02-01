import type { arcGISSearchSuggestion } from "./arcGISSearchSuggestion";

// Root: https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/suggest?f=json&countryCode=USA,PRI,VIR,GUM,ASM&category=Postal,Populated%20Place&maxSuggestions=5&text=pied
export interface arcGISSearchResult {
    suggestions: arcGISSearchSuggestion[]
}