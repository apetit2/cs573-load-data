/* eslint-disable @typescript-eslint/no-unused-vars */
import { DSVParsedArray, DSVRowString, csv } from 'd3';

import { API } from '../apis';
import { Avocado } from '../models/avocado';
import { parse } from 'date-fns';

const parseCSV: (
  row: DSVRowString<string>,
  index: number,
  columns: string[]
) => Avocado = (row, index, columns) => {
  const date = parse(row.Date ?? '', 'yyyy-MM-dd', new Date());
  return {
    date: row.Date,
    averagePrice: Number(row.AveragePrice),
    totalVolume: Number(row['Total Volume']),
    '4046': Number(row['4046']),
    '4225': Number(row['4225']),
    '4770': Number(row['4770']),
    totalBags: Number(row['Total Bags']),
    smallBags: Number(row['Small Bags']),
    largeBags: Number(row['Large Bags']),
    xLargeBags: Number(row['XLarge Bags']),
    type: row.type,
    year: Number(row.year),
    region: row.region,
    month: date.getMonth() + 1,
    day: date.getDate(),
  };
};

export const fetchAvocadoCSV = async () => {
  const avocadoCSV = (await csv(API.AvocadoCSV, parseCSV)).filter(
    (row) => row.year !== 0
  ) as DSVParsedArray<Avocado>;
  return avocadoCSV;
};
