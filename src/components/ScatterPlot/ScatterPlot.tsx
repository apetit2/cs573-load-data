/* eslint-disable react/no-array-index-key */
import {
  DSVParsedArray,
  ScaleOrdinal,
  extent,
  interpolateTurbo,
  scaleLinear,
  scaleOrdinal,
} from 'd3';

import { AxisBottom } from './AxisBottom';
import { AxisLeft } from './AxisLeft';
import { CSVRow } from '../../services/models/shared';
import { KeysMatching } from '../../types/shared';
import { PropsWithChildren } from 'react';

export interface ScatterPlotProps<T extends CSVRow> {
  width: number;
  height: number;
  margin: { top: number; right: number; bottom: number; left: number };
  x: KeysMatching<T, number | undefined>;
  y: KeysMatching<T, number | undefined>;
  xLabel: string;
  yLabel: string;
  color?: KeysMatching<T, string | undefined>;
  radius: number;
  data: DSVParsedArray<T>;
  opacity?: string;
}

export const ScatterPlot = <T extends CSVRow>({
  width,
  height = 400,
  margin,
  x,
  y,
  xLabel,
  yLabel,
  color,
  radius,
  data,
  opacity = '.3',
}: PropsWithChildren<ScatterPlotProps<T>>) => {
  const xValue = (row: T) => row[x] as number;
  const yValue = (row: T) => row[y] as number;

  const yRange = extent(data, yValue) as [number, number];
  const xRange = extent(data, xValue) as [number, number];

  const paddedHeight = height - margin.top - margin.bottom;
  const paddedWidth = width - margin.left - margin.right;

  const xScale = scaleLinear().domain(xRange).range([0, paddedWidth]).nice();
  const yScale = scaleLinear().domain(yRange).range([paddedHeight, 0]);

  let uniqueOrdinalValues: string[];
  let numUniqueOrdinalValues: number;
  let colors: string[];
  let colorScale: ScaleOrdinal<string, string, never> | undefined;
  let colorValue: (row: T) => string;

  if (color) {
    colorValue = (row: T) => row[color] as string;

    uniqueOrdinalValues = Array.from(new Set(data.map(colorValue)));
    numUniqueOrdinalValues = uniqueOrdinalValues.length;

    colors = uniqueOrdinalValues.map((_, index) => {
      return interpolateTurbo(index / numUniqueOrdinalValues);
    });

    colorScale = scaleOrdinal<string>()
      .domain(data.map(colorValue))
      .range(colors);
  }

  const marginsForAxes = {
    ...margin,
    left: yRange[1].toString().length * 8.75 + 20,
  };

  const xAxisLabelOffset = 50;
  const yAxisLabelOffset = yRange[1].toString().length * 8.75 + 10;

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

        {data.map((row, index) => (
          <circle
            key={index}
            cx={xScale(xValue(row))}
            cy={yScale(yValue(row))}
            r={radius}
            opacity={opacity}
            fill={
              colorScale && colorValue ? colorScale(colorValue(row)) : 'black'
            }
          />
        ))}
      </g>
    </svg>
  );
};
