
// https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?product=predictions&begin_date=20230803&end_date=20230806&datum=MLLW&station=8669346&time_zone=lst_ldt&units=english&interval=hilo&format=json&application=NOS.COOPS.TAC.TidePred
import type { tidePrediction } from "./tidePrediction";

export interface tidePredictions {
    predictions: tidePrediction[];
}