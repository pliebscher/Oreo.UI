import { arcGISExtent } from "./arcGISExtent"
import { arcGISFeature } from "./arcGISFeature"

export class arcGISLocation {
    name: string = ''
    extent: arcGISExtent = new arcGISExtent()
    feature: arcGISFeature = new arcGISFeature()
}