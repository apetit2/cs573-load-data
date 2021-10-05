import { CSVRow } from './shared';

export interface Avocado extends CSVRow {
  date?: string;
  averagePrice?: number;
  totalVolume?: number;
  '4046'?: number;
  '4225'?: number;
  '4770'?: number;
  totalBags?: number;
  smallBags?: number;
  largeBags?: number;
  xLargeBags?: number;
  type?: string;
  year?: number;
  region?: string;
  month?: number;
  day?: number;
}

export const AvocadoCols = {
  date: 'Date Measurement Taken',
  averagePrice: 'Average Price of Avocado',
  totalVolume: 'Total Volume of Avocados Sold',
  '4046': '4046 Variant of Avocados',
  '4225': '4225 Variant of Avocados',
  '4770': '4770 Variant of Avocados',
  totalBags: 'Total Bags sold of Avocados',
  smallBags: 'Small Bags sold of Avocados',
  largeBags: 'Large Bags sold of Avocados',
  xLargeBags: 'XLarge Bags sold of Avocados',
  type: 'Type of Avocado sold',
  year: 'Year Measurement was Taken',
  month: 'Month Measurement was Taken',
  day: 'Day Measurement was Taken',
  region: 'Region in U.S Where Measurement was Taken',
} as const;

export type AvocadoCol = typeof AvocadoCols;
