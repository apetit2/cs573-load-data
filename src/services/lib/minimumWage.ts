import { DSVRowString, csv, DSVParsedArray } from 'd3';
import { accountForInflation } from '../../util/inflation';

import { API } from '../apis';
import { MinimumWage, Rent } from '../models/minimumWage';

const parseMinimumCsv: (
  row: DSVRowString<string>,
  index: number,
  columns: string[]
) => MinimumWage = (row) => {
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

const parseRentCsv: (
  row: DSVRowString<string>,
  index: number,
  columns: string[]
) => Rent = (row) => {
  return {
    state: row.State,
    year: Number(row.Year),
    studio: Number(row['Rent 0 BR']),
    oneBedroom: Number(row['Rent 1 BR']),
    twoBedroom: Number(row['Rent 2 BR']),
    threeBedroom: Number(row['Rent 3 BR']),
    fourBedroom: Number(row['Rent 4 BR']),
    population: Number(row.Population),
    rowType: 'Rent',
  };
};

const merge = (
  rents: DSVParsedArray<Rent>,
  minWages: DSVParsedArray<MinimumWage>
) => {
  const res = minWages.map((minWage) => {
    const rent = rents.find(
      (row) => row.year === minWage.year && row.state === minWage.state
    );

    if (!rent) {
      return minWage;
    }

    return {
      ...minWage,
      studio: accountForInflation(minWage.cpiAverage!, rent.studio!),
      oneBedroom: accountForInflation(minWage.cpiAverage!, rent.oneBedroom!),
      twoBedroom: accountForInflation(minWage.cpiAverage!, rent.twoBedroom!),
      threeBedroom: accountForInflation(
        minWage.cpiAverage!,
        rent.threeBedroom!
      ),
      fourBedroom: accountForInflation(minWage.cpiAverage!, rent.fourBedroom!),
      population: rent.population,
    } as MinimumWage;
  });

  return res as DSVParsedArray<MinimumWage>;
};

export const fetchMinimumWageCSV = async () => {
  const minWages = await csv(API.MinimumWageCSV, parseMinimumCsv);
  const rents = await csv(API.RentCSV, parseRentCsv);

  return merge(rents, minWages);
};

export const fetchRentCSV = async () => {
  const res = await csv(API.RentCSV, parseRentCsv);
  return res;
};
