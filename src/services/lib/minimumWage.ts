/* eslint-disable @typescript-eslint/no-unused-vars */
import { DSVRowString, csv } from 'd3';

import { API } from '../apis';
import { MinimumWage } from '../models/minimumWage';

const parseCsv: (
  row: DSVRowString<string>,
  index: number,
  columns: string[]
) => MinimumWage = (row, index, columns) => {
  return {
    year: Number(row.Year),
    state: row.State,
    stateMinWage: Number(row['State.Minimum.Wage']),
    stateMinWageTodayDollars: Number(row['State.Minimum.Wage.2020.Dollars']),
    federalMinWage: Number(row['Federal.Minimum.Wage']),
    federalMinWageTodayDollars: Number(
      row['Federal.Minimum.Wage.2020.Dollars']
    ),
    effectiveMinWage: Number(row['Effective.Minimum.Wage']),
    effectiveMinWageTodayDollars: Number(
      row['Effective.Minimum.Wage.2020.Dollars']
    ),
    cpiAverage: Number(row['CPI.Average']),
    depLaborUncleanData: row['Department.Of.Labor.Uncleaned.Data'],
    depLaborCleanedLowValue: Number(
      row['Department.Of.Labor.Cleaned.Low.Value']
    ),
    depLaborCleanedLowValueTodayDollars: Number(
      row['Department.Of.Labor.Cleaned.Low.Value.2020.Dollars']
    ),
    depLaborCleanedHighValue: Number(
      row['Department.Of.Labor.Cleaned.High.Value']
    ),
    depLaborCleanedHighValueTodayDollars: Number(
      row['Department.Of.Labor.Cleaned.High.Value.2020.Dollars']
    ),
    footnote: row.Footnote,
    rowType: 'MinWage',
  };
};

export const fetchMinimumWageCSV = async () => {
  const res = await csv(API.MinimumWageCSV, parseCsv);
  return res;
};
