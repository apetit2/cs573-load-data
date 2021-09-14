/* eslint-disable react/no-array-index-key */
import { max, scaleBand, scaleLinear } from 'd3';

import { DSVParsedArray } from 'd3-dsv';

export interface BarChartProps<T> {
  width: number;
  height: number;
  margin: { top: number; right: number; bottom: number; left: number };
  data: DSVParsedArray<T>;
  xColumn: string;
  yColumn: string;
  color: string;
}

export const BarChart = <
  T extends Record<string, number | string | undefined>
>({
  width,
  height,
  margin,
  data,
  xColumn,
  yColumn,
  color,
}: BarChartProps<T>) => {
  const xScale = scaleBand()
    .domain(data.map((row) => row[xColumn]!.toString()))
    .range([0, width]);

  const yScale = scaleLinear()
    .domain([0, max(data, (row) => row[yColumn] as number) ?? 0])
    .range([0, height]);

  return (
    <svg
      width={width}
      height={height}
      style={{
        margin: `${margin.top} ${margin.right} ${margin.bottom} ${margin.left}`,
      }}
    >
      {data.map((row, index) => (
        <rect
          key={index}
          x={xScale(row[xColumn]!.toString())}
          y={yScale(row[yColumn] as number)}
          width={xScale.bandwidth()}
          height={height}
          color={color}
        />
      ))}
    </svg>
  );
};
