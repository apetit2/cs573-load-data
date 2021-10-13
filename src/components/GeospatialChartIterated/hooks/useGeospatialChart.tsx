import { DSVParsedArray, extent, interpolateBlues, scaleSequential } from 'd3';

import { CSVRow } from '../../../services/models/shared';

export const useGeospatialChart = (
  rows: DSVParsedArray<CSVRow>,
  timeField: string,
  stateField: string,
  colorRepresentation: string,
  chosenTimeFieldValue: number
) => {
  // filter the rows by some time value (preferably year)
  const filteredRows = rows.filter(
    (row) => Number(row[timeField]) === chosenTimeFieldValue
  );

  // color saturation scale
  const colorSaturationScale = scaleSequential()
    .domain(
      extent(filteredRows, (row) => {
        return Number(row[colorRepresentation]);
      }) as [number, number]
    )
    .interpolator(interpolateBlues);

  // create an array of states with some representation of some value
  const states = filteredRows.reduce((acc, current) => {
    acc.push({
      state: current[stateField]?.toString() ?? '',
      value: Number(current[colorRepresentation]),
      color: colorSaturationScale(Number(current[colorRepresentation])),
    });
    return acc;
  }, [] as { state: string; value: number; color: string }[]);

  // create max and min for color values
  const colorExtent = states.reduce(
    (acc: null | { max: number; min: number }, curr) => {
      if (!acc) {
        return { max: curr.value, min: curr.value };
      }

      if (curr.value > acc.max) {
        return { max: curr.value, min: acc.min };
      }

      if (curr.value < acc.min) {
        return { max: acc.min, min: curr.value };
      }

      return acc;
    },
    null
  );

  const splitByCapitalLetter = (text: string) =>
    text
      .split(/(?=[A-Z])/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

  const findFieldByStateOrDefault = <T extends string | number>(
    state: string,
    field: 'value' | 'color',
    defaultValue: T
  ): T => {
    return (
      (states.find((el) => el.state === state)?.[field] as T) ?? defaultValue
    );
  };

  return {
    colorSaturationScale,
    filteredRows,
    states,
    colorExtent,
    splitByCapitalLetter,
    findFieldByStateOrDefault,
  };
};
