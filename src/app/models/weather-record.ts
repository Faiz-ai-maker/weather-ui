export interface WeatherRecord {
date: string;
minTemperature: number | null;
maxTemperature: number | null;
precipitation: number | null;
status: string;
errorMessage: string | null;
}