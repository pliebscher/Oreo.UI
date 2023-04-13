import type { arcGISExtent } from "./arcGISExtent"
import type { arcGISFeature } from "./arcGISFeature"

export interface arcGISLocation {
    name: string
    extent: arcGISExtent
    feature: arcGISFeature
}