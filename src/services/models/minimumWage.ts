import { CSVRow } from './shared';

export interface MinimumWage extends CSVRow {
  year?: number;
  state?: string;
  stateMinWage?: number;
  stateMinWageTodayDollars?: number;
  federalMinWage?: number;
  federalMinWageTodayDollars?: number;
  effectiveMinWage?: number;
  effectiveMinWageTodayDollars?: number;
  cpiAverage?: number;
  depLaborUncleanData?: string;
  depLaborCleanedLowValue?: number;
  depLaborCleanedLowValueTodayDollars?: number;
  depLaborCleanedHighValue?: number;
  depLaborCleanedHighValueTodayDollars?: number;
  footnote?: string;
  studio?: number;
  oneBedroom?: number;
  twoBedroom?: number;
  threeBedroom?: number;
  fourBedroom?: number;
  population?: number;
}

export interface Rent extends CSVRow {
  state?: string;
  year?: number;
  studio?: number;
  oneBedroom?: number;
  twoBedroom?: number;
  threeBedroom?: number;
  fourBedroom?: number;
  population?: number;
}

export const MinimumWageCols = {
  year: 'Year',
  state: 'State',
  stateMinWage: 'State Minimum Wage',
  stateMinWageTodayDollars: 'State Minimum Wage (2020 Dollars)',
  federalMinWage: 'Federal Minimum Wage',
  federalMinWageTodayDollars: 'Federal Minimum Wage (2020 Dollars)',
  effectiveMinWage: 'Effective Minimum Wage',
  effectiveMinWageTodayDollars: 'Effective Minimum Wage (2020 Dollars)',
  cpiAverage: 'Average Consumer Price Index',
  depLaborUncleanData: 'Dep. Of Labor Unclean Data',
  depLaborCleanedLowValue: 'Dep. Of Labor Cleaned Low Value',
  depLaborCleanedLowValueTodayDollars:
    'Dep. Of Labor Cleaned Low Value (2020 Dollars)',
  depLaborCleanedHighValue: 'Dep. Of Labor Cleaned High Value',
  depLaborCleanedHighValueTodayDollars:
    'Dep. Of Labor Cleaned High Value (2020 Dollars)',
  footnote: 'Footnote',
  studio: 'Average Studio Apartment Cost',
  oneBedroom: 'Average One Bedroom Apartment Cost',
  twoBedroom: 'Average Two Bedroom Apartment Cost',
  threeBedroom: 'Average Three Bedroom Apartment Cost',
  fourBedroom: 'Average Four Bedroom Apartment Cost',
  population: 'Population',
} as const;

export const RentCols = {
  state: 'State',
  year: 'Year',
  studio: 'Average Studio Apartment Cost',
  oneBedroom: 'Average One Bedroom Apartment Cost',
  twoBedroom: 'Average Two Bedroom Apartment Cost',
  threeBedroom: 'Average Three Bedroom Apartment Cost',
  fourBedroom: 'Average Four Bedroom Apartment Cost',
  population: 'Population',
} as const;

export type MinimumWageCol = typeof MinimumWageCols;
