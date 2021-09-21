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
  id: { title: 'ID', type: 'string' },
  name: { title: 'Hurricane Name', type: 'string' },
  date: { title: 'Date Measurement Recorded', type: 'string' },
  time: { title: 'Time Measurement Recorded', type: 'number' },
  event: { title: 'Event', type: 'string' },
  status: {
    title: 'Hurricane Status (Tropical Storm | Hurricane)',
    type: 'string',
  },
  latitude: { title: 'Latitude Where Reading Was Taken', type: 'number' },
  longitude: { title: 'Longitude Where Reading Was Taken', type: 'number' },
  maxWind: {
    title: 'Maximum Wind Recorded at Time of Measurement',
    type: 'number',
  },
  minPressure: {
    title: 'Minimum Pressure Recorded at Time of Measurment',
    type: 'number',
  },
  lowWindNE: { title: 'Low Wind NE', type: 'number' },
  lowWindSE: { title: 'Low Wind SE', type: 'number' },
  lowWindSW: { title: 'Low Wind SW', type: 'number' },
  lowWindNW: { title: 'Low Wind NW', type: 'number' },
  moderateWindNE: { title: 'Moderate Wind NE', type: 'number' },
  moderateWindSE: { title: 'Moderate Wind SE', type: 'number' },
  moderateWindSW: { title: 'Moderate Wind SW', type: 'number' },
  moderateWindNW: { title: 'Moderate Wind NW', type: 'number' },
  highWindNE: { title: 'High Wind NE', type: 'number' },
  highWindSE: { title: 'High Wind SE', type: 'number' },
  highWindSW: { title: 'High Wind SW', type: 'number' },
  highWindNW: { title: 'High Wind NW', type: 'number' },
  year: { title: 'Year Measured', type: 'number' },
  month: { title: 'Month Measured', type: 'number' },
  day: { title: 'Day Measured', type: 'number' },
} as const;

export type HurricaneCol =
  | 'id'
  | 'name'
  | 'date'
  | 'time'
  | 'event'
  | 'status'
  | 'latitude'
  | 'longitude'
  | 'maxWind'
  | 'minPressure'
  | 'lowWindNE'
  | 'lowWindSE'
  | 'lowWindSW'
  | 'lowWindNW'
  | 'moderateWindNE'
  | 'moderateWindSE'
  | 'moderateWindSW'
  | 'moderateWindNW'
  | 'highWindNE'
  | 'highWindSE'
  | 'highWindSW'
  | 'highWindNW'
  | 'year'
  | 'month'
  | 'day';
