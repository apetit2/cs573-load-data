export interface Avocado extends Record<string, number | string | undefined> {
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
  date: { title: 'Date Measurement Taken', type: 'string' },
  averagePrice: { title: 'Average Price of Avocado', type: 'number' },
  totalVolume: { title: 'Total Volume of Avocados Sold', type: 'number' },
  '4046': { title: '4046 Variant of Avocados', type: 'number' },
  '4225': { title: '4225 Variant of Avocados', type: 'number' },
  '4770': { title: '4770 Variant of Avocados', type: 'number' },
  totalBags: { title: 'Total Bags sold of Avocados', type: 'number' },
  smallBags: { title: 'Small Bags sold of Avocados', type: 'number' },
  largeBags: { title: 'Large Bags sold of Avocados', type: 'number' },
  xLargeBags: { title: 'XLarge Bags sold of Avocados', type: 'number' },
  type: { title: 'Type of Avocado sold', type: 'string' },
  year: { title: 'Year Measurement was Taken', type: 'number' },
  month: { title: 'Month Measurement was Taken', type: 'number' },
  day: { title: 'Day Measurement was Taken', type: 'number' },
  region: {
    title: 'Region in U.S Where Measurement was Taken',
    type: 'string',
  },
} as const;

export type AvocadoCol =
  | 'date'
  | 'averagePrice'
  | 'totalVolume'
  | '4046'
  | '4225'
  | '4770'
  | 'totalBags'
  | 'smallBags'
  | 'largeBags'
  | 'xLargeBags'
  | 'type'
  | 'year'
  | 'region'
  | 'month'
  | 'day';
