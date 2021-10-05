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
} as const;

export type MinimumWageCol = typeof MinimumWageCols;
