export interface MinimumWage
  extends Record<string, number | string | undefined> {
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
  year: { title: 'Year', type: 'number' },
  state: { title: 'State', type: 'string' },
  stateMinWage: { title: 'State Minimum Wage', type: 'number' },
  stateMinWageTodayDollars: {
    title: 'State Minimum Wage (2020 Dollars)',
    type: 'number',
  },
  federalMinWage: { title: 'Federal Minimum Wage', type: 'number' },
  federalMinWageTodayDollars: {
    title: 'Federal Minimum Wage (2020 Dollars)',
    type: 'number',
  },
  effectiveMinWage: { title: 'Effective Minimum Wage', type: 'number' },
  effectiveMinWageTodayDollars: {
    title: 'Effective Minimum Wage (2020 Dollars)',
    type: 'number',
  },
  cpiAverage: { title: 'Average Consumer Price Index', type: 'number' },
  depLaborUncleanData: { title: 'Dep. Of Labor Unclean Data', type: 'string' },
  depLaborCleanedLowValue: {
    title: 'Dep. Of Labor Cleaned Low Value',
    type: 'number',
  },
  depLaborCleanedLowValueTodayDollars: {
    title: 'Dep. Of Labor Cleaned Low Value (2020 Dollars)',
    type: 'number',
  },
  depLaborCleanedHighValue: {
    title: 'Dep. Of Labor Cleaned High Value',
    type: 'number',
  },
  depLaborCleanedHighValueTodayDollars: {
    title: 'Dep. Of Labor Cleaned High Value (2020 Dollars)',
    type: 'number',
  },
  footnote: { title: 'Footnote', type: 'string' },
} as const;

export type MinimumWageCol =
  | 'year'
  | 'state'
  | 'stateMinWage'
  | 'stateMinWageTodayDollars'
  | 'federalMinWage'
  | 'federalMinWageTodayDollars'
  | 'effectiveMinWage'
  | 'effectiveMinWageTodayDollars'
  | 'cpiAverage'
  | 'depLaborUncleanData'
  | 'depLaborCleanedLowValue'
  | 'depLaborCleanedLowValueTodayDollars'
  | 'depLaborCleanedHighValue'
  | 'depLaborCleanedHighValueTodayDollars'
  | 'footnote';
