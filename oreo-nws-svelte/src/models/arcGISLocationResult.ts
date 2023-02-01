import type { arcGISExtent } from "./arcGISExtent"
import type { arcGISFeature } from "./arcGISFeature"

export interface arcGISLocationResult {
    name: string
    extent: arcGISExtent
    feature: arcGISFeature
}