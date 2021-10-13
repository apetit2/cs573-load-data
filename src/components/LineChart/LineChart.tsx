/* eslint-disable react/no-array-index-key */
import {
  DSVParsedArray,
  extent,
  interpolateTurbo,
  scaleLinear,
  scaleOrdinal,
} from 'd3';
import { PropsWithChildren, ReactElement } from 'react';

import { AxisBottom } from './AxisBottom';
import { AxisLeft } from './AxisLeft';
import { CSVRow } from '../../services/models/shared';
import { KeysMatching } from '../../types/shared';

interface LinePoint {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  stroke: string;
  strokeWidth: number;
  opacity: string;
}

export interface LineChartProps<T extends CSVRow> {
  filter?: string;
  grouping: KeysMatching<T, string | undefined>;
  width: number;
  height: number;
  margin: { top: number; right: number; bottom: number; left: number };
  x: KeysMatching<T, number | undefined>;
  y: KeysMatching<T, number | undefined>;
  xLabel: string;
  yLabel: string;
  opacity?: string;
  data: DSVParsedArray<T>;
  strokeWidth?: number;
  stroke?: string;
}

const drawLines = (lines: Map<string, LinePoint[]>) => {
  const entries: ReactElement[] = [];

  lines.forEach((linePoints, key) => {
    (linePoints as LinePoint[]).forEach((linePoint) => {
      entries.push(
        <line key={`${key}-${linePoint.x1}-${linePoint.y1}`} {...linePoint} />
      );
    });
  });
  return entries;
};

export const LineChart = <T extends CSVRow>({
  filter,
  grouping,
  width,
  height = 400,
  margin,
  x,
  y,
  xLabel,
  yLabel,
  data,
  opacity = '.3',
  strokeWidth = 3,
  stroke,
}: PropsWithChildren<LineChartProps<T>>) => {
  const xValue = (row: T) => row[x] as number;
  const yValue = (row: T) => row[y] as number;
  const colorValue = (row: T) => row[grouping] as string;

  const yRange = extent(data, yValue) as [number, number];
  const xRange = extent(data, xValue) as [number, number];

  const paddedHeight = height - margin.top - margin.bottom;
  const paddedWidth = width - margin.left - margin.right;

  const xScale = scaleLinear().domain(xRange).range([0, paddedWidth]).nice();
  const yScale = scaleLinear().domain(yRange).range([paddedHeight, 0]);

  const marginsForAxes = {
    ...margin,
    left: yRange[1].toString().length * 8.75 + 20,
  };

  const xAxisLabelOffset = 50;
  const yAxisLabelOffset = yRange[1].toString().length * 8.75 + 10;

  const lines: Map<string, LinePoint[]> = new Map();

  const uniqueOrdinalValues = Array.from(new Set(data.map(colorValue)));
  const numUniqueOrdinalValues = uniqueOrdinalValues.length;

  const colors = uniqueOrdinalValues.map((_, index) => {
    return interpolateTurbo(index / numUniqueOrdinalValues);
  });

  const colorScale = scaleOrdinal<string>()
    .domain(data.map(colorValue))
    .range(colors);

  data
    .filter(
      (row) =>
        filter === undefined ||
        (row[grouping] as string).toLowerCase() === filter.toLowerCase()
    )
    .sort((rowOne, rowTwo) => {
      return (rowOne[grouping] as string).localeCompare(
        rowTwo[grouping] as string
      );
    })
    .forEach((row, index, arr) => {
      if (
        index < arr.length - 1 &&
        (row[grouping] as string) === (arr[index + 1][grouping] as string)
      ) {
        if (lines.has(row[grouping] as string)) {
          lines.set(row[grouping] as string, [
            ...lines.get(row[grouping] as string)!,
            {
              x1: xScale(xValue(row)),
              y1: yScale(yValue(row)),
              x2: xScale(xValue(arr[index + 1])),
              y2: yScale(yValue(arr[index + 1])),
              stroke: stroke || colorScale(colorValue(row)),
              strokeWidth,
              opacity,
            },
          ]);
        } else {
          lines.set(row[grouping] as string, [
            {
              x1: xScale(xValue(row)),
              y1: yScale(yValue(row)),
              x2: xScale(xValue(arr[index + 1])),
              y2: yScale(yValue(arr[index + 1])),
              stroke: stroke || colorScale(colorValue(row)),
              strokeWidth,
              opacity,
            },
          ]);
        }
      }
    });

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${marginsForAxes.left},${marginsForAxes.top})`}>
        <AxisBottom xScale={xScale} height={paddedHeight} tickOffset={10} />

        <text
          className="axis-label"
          textAnchor="middle"
          transform={`translate(${-yAxisLabelOffset},${
            paddedHeight / 2
          }) rotate(-90)`}
        >
          {yLabel}
        </text>

        <AxisLeft yScale={yScale} width={paddedWidth} tickOffset={5} />

        <text
          className="axis-label"
          x={paddedWidth / 2}
          y={paddedHeight + xAxisLabelOffset}
          textAnchor="middle"
        >
          {xLabel}
        </text>

        {drawLines(lines)}
      </g>
    </svg>
  );
};
