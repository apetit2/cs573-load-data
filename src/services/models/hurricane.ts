import { CSVRow } from './shared';

export interface Hurricane extends CSVRow {
  id?: string;
  name?: string;
  date?: string;
  time?: number;
  event?: string;
  status?: string;
  latitude?: number;
  longitude?: number;
  maxWind?: number;
  minPressure?: number;
  lowWindNE?: number;
  lowWindSE?: number;
  lowWindSW?: number;
  lowWindNW?: number;
  moderateWindNE?: number;
  moderateWindSE?: number;
  moderateWindSW?: number;
  moderateWindNW?: number;
  highWindNE?: number;
  highWindSE?: number;
  highWindSW?: number;
  highWindNW?: number;
  year?: number;
  month?: number;
  day?: number;
}

export const HurricaneCols = {
  id: 'ID',
  name: 'Hurricane Name',
  date: 'Date Measurement Recorded',
  time: 'Time Measurement Recorded',
  event: 'Event',
  status: 'Hurricane Status (Tropical Storm | Hurricane)',
  latitude: 'Latitude Where Reading Was Taken',
  longitude: 'Longitude Where Reading Was Taken',
  maxWind: 'Maximum Wind Recorded at Time of Measurement',
  minPressure: 'Minimum Pressure Recorded at Time of Measurment',
  lowWindNE: 'Low Wind NE',
  lowWindSE: 'Low Wind SE',
  lowWindSW: 'Low Wind SW',
  lowWindNW: 'Low Wind NW',
  moderateWindNE: 'Moderate Wind NE',
  moderateWindSE: 'Moderate Wind SE',
  moderateWindSW: 'Moderate Wind SW',
  moderateWindNW: 'Moderate Wind NW',
  highWindNE: 'High Wind NE',
  highWindSE: 'High Wind SE',
  highWindSW: 'High Wind SW',
  highWindNW: 'High Wind NW',
  year: 'Year Measured',
  month: 'Month Measured',
  day: 'Day Measured',
} as const;

export type HurricaneCol = typeof HurricaneCols;
