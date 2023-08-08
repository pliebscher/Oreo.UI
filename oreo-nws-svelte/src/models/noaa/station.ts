export interface station {
    id: string;
    name: string;
    lat: number;
    lng: number;
    state: string;
    type: string;
    timemeridian: number;
    reference_id: string;
    timezonecorr: number;
    tidepredoffsets: {
      self: string;
    };
}