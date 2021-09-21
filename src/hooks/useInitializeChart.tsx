// IN Future, could use this to swap between charts, for now just use as a means to get reused variables
// instead of using a singleton

import {
  DSVParsedArray,
  extent,
  interpolateTurbo,
  scaleLinear,
  scaleOrdinal,
} from 'd3';

import { CSVRow } from '../services/models/shared';

export const useInitializeChart = (
  chartDimensions: { width: number; height: number },
  xValue: (row: CSVRow) => number,
  yValue: (row: CSVRow) => number,
  colorValue: (row: CSVRow) => string,
  data?: DSVParsedArray<CSVRow>
) => {
  const yRange = extent(data ?? [], yValue) as [number, number];
  const xRange = extent(data ?? [], xValue) as [number, number];

  const distinctColorValues = new Set(data?.map(colorValue));
  const numDistinctColors = distinctColorValues.size;

  let i = 0;
  const colors = [];
  while (i < numDistinctColors) {
    colors.push(interpolateTurbo(i / numDistinctColors));
    i += 1;
  }

  const colorScale = scaleOrdinal<string>()
    .domain(data?.map(colorValue) ?? [])
    .range(colors);

  const height = 400;
  const { width } = chartDimensions;
  const margin = {
    top: 30,
    right: 30,
    bottom: 50,
    left: yRange[1]?.toString()?.length
      ? yRange[1].toString().length * 8.75 + 20
      : 70,
  };
  const paddedHeight = height - margin.top - margin.bottom;
  const paddedWidth = width - margin.left - margin.right;
  const xAxisLabelOffset = 50;
  const yAxisLabelOffset = yRange[1]?.toString()?.length
    ? yRange[1].toString().length * 8.75 + 10
    : 10;

  const xScale = scaleLinear().domain(xRange).range([0, paddedWidth]).nice();
  const yScale = scaleLinear().domain(yRange).range([paddedHeight, 0]);

  return {
    height,
    width,
    margin,
    paddedHeight,
    paddedWidth,
    xAxisLabelOffset,
    yAxisLabelOffset,
    xScale,
    yScale,
    colorScale,
  };
};
