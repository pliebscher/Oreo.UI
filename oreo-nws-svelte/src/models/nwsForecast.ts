import { nwsObservation } from "./nwsObservation"
import { nwsData } from "./nwsData"
import { nwsLocation } from "./nwsLocation"
import { nwsTime } from "./nwsTime"

// Root
export class nwsForecast {

    operationalMode: string = ''
    srsName: string = ''
    creationDate: string = ''
    creationDateLocal: string = ''
    productionCenter: string = ''
    credit: string = ''
    moreInformation: string = ''
    location: nwsLocation = new nwsLocation
    data: nwsData = new nwsData
    currentobservation: nwsObservation = new nwsObservation
    time: nwsTime = new nwsTime

}