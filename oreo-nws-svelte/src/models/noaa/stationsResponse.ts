import type { station } from "./station";

export interface stationsResponse {
    count: number;
    units: string;
    stations: station[];
}