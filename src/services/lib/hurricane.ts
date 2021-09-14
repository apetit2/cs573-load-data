/* eslint-disable @typescript-eslint/no-unused-vars */
import { DSVRowString, csv } from 'd3';

import { API } from '../apis';
import { Hurricane } from '../models/hurricane';
import { parse } from 'date-fns';

const parseCSV: (
  row: DSVRowString<string>,
  index: number,
  columns: string[]
) => Hurricane = (row, index, columns) => {
  const date = parse(row.Date ?? '', 'yyyyMMdd', new Date());

  return {
    id: row.ID,
    name: row.Name,
    date: row.Date,
    time: Number(row.time),
    event: row.Event,
    status: row.Status,
    latitude: row.Latitude,
    longitude: row.Longitude,
    maxWind: Number(row['Maximum Wind']),
    minPressure: Number(row['Minimum Pressure']),
    lowWindNE: Number(row['Low Wind NE']),
    lowWindSE: Number(row['Low Wind SE']),
    lowWindSW: Number(row['Low Wind SW']),
    lowWindNW: Number(row['Low Wind NW']),
    moderateWindNE: Number(row['Moderate Wind NE']),
    moderateWindSE: Number(row['Moderate Wind SE']),
    moderateWindSW: Number(row['Moderate Wind SW']),
    moderateWindNW: Number(row['Moderate Wind NW']),
    highWindNE: Number(row['High Wind NE']),
    highWindSE: Number(row['High Wind SE']),
    highWindSW: Number(row['High Wind SW']),
    highWindNW: Number(row['High Wind NW']),
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
  };
};

export const fetchHurricaneCSV = async () => {
  const hurricaneCSV = await csv(API.HurricaneCSV, parseCSV);
  return hurricaneCSV;
};
