export interface Earthquake {
    id: string;
    location: string;
    magnitude: number;
    date: Date;
}

export interface AddEarthquakeInput {
    location: string;
    magnitude: number;
    date: Date;
}

export interface UpdateEarthquakeInput {
    id: string
    location?: string;
    magnitude?: number;
    date?: Date;
}