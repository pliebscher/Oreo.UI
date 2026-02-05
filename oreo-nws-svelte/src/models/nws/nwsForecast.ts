import type { nwsObservation } from "./nwsObservation"
import type { nwsData } from "./nwsData"
import type { nwsLocation } from "./nwsLocation"
import type { nwsTime } from "./nwsTime"

// Root
export interface nwsForecast {

    operationalMode: string
    srsName: string
    creationDate: string
    creationDateLocal: string
    productionCenter: string
    credit: string
    moreInformation: string
    location: nwsLocation
    data: nwsData
    currentobservation: nwsObservation
    time: nwsTime

}