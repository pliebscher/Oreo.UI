import { Currentobservation } from "./CurrentObservation"
import { Data } from "./Data"
import { Location } from "./Location"
import { Time } from "./Time"

// Root
export class Forecast {

    operationalMode: string = ''
    srsName: string = ''
    creationDate: string = ''
    creationDateLocal: string = ''
    productionCenter: string = ''
    credit: string = ''
    moreInformation: string = ''
    location: Location = new Location
    data: Data = new Data
    currentobservation: Currentobservation = new Currentobservation
    time: Time = new Time

}