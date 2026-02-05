export interface Favorite {
    text: string;
    lat: number;
    lon: number;
    timestamp?: number; // Optional: when it was saved
}