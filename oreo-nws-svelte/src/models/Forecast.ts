import { Currentobservation } from "./CurrentObservation"
import { Data } from "./Data"
import { Location } from "./Location"

export class Forecast {

    operationalMode: string = ''
    srsName: string = ''
    creationDate: string = ''
    creationDateLocal: string = ''
    productionCenter: string = ''
    credit: string = ''
    moreInformation: string = ''
    location: Location = new Location
    time: string = ''
    data: Data = new Data
    currentobservation: Currentobservation = new Currentobservation

}