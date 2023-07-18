export interface noaaStationsResultset {
    offset: number;
    count: number;
    limit: number;
}

export interface noaaStationMetadata {
    resultset: noaaStationsResultset;
}

export interface noaaStation {
    elevation: number;
    mindate: string;
    maxdate: string;
    latitude: number;
    name: string;
    datacoverage: number;
    id: string;
    elevationUnit: string;
    longitude: number;
}

export interface noaaStationData {
    metadata: noaaStationMetadata;
    results: noaaStation[];
}

//Root
export interface noaaStationsResult {
    success: boolean;
    data: noaaStationData;
}