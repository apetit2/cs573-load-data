/* eslint-disable react/no-array-index-key */
import { DSVParsedArray, ScaleLinear, ScaleOrdinal } from 'd3';

import { AxisBottom } from './AxisBottom';
import { AxisLeft } from './AxisLeft';
import { CSVRow } from '../../services/models/shared';

export interface ScatterPlotProps {
  width: number | string;
  height: number | string;
  paddedWidth: number;
  paddedHeight: number;
  margin: { top: number; right: number; bottom: number; left: number };
  data: DSVParsedArray<CSVRow>;
  xScale: ScaleLinear<number, number, never>;
  yScale: ScaleLinear<number, number, never>;
  colorScale?: ScaleOrdinal<string, string, never>;
  xValue: (row: CSVRow) => number;
  yValue: (row: CSVRow) => number;
  colorValue?: (row: CSVRow) => string;
  xAxisLabel: string;
  yAxisLabel: string;
  xAxisLabelOffset: number;
  yAxisLabelOffset: number;
  radius: number;
  opacity?: string;
}

export const ScatterPlot: React.FC<ScatterPlotProps> = ({
  width,
  height,
  paddedWidth,
  paddedHeight,
  margin,
  data,
  xScale,
  yScale,
  colorScale,
  xValue,
  yValue,
  colorValue,
  xAxisLabel,
  yAxisLabel,
  xAxisLabelOffset,
  yAxisLabelOffset,
  radius,
  opacity = '.3',
}) => {
  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        <AxisBottom xScale={xScale} height={paddedHeight} tickOffset={10} />

        <text
          className="axis-label"
          textAnchor="middle"
          transform={`translate(${-yAxisLabelOffset},${
            paddedHeight / 2
          }) rotate(-90)`}
        >
          {yAxisLabel}
        </text>

        <AxisLeft yScale={yScale} width={paddedWidth} tickOffset={5} />

        <text
          className="axis-label"
          x={paddedWidth / 2}
          y={paddedHeight + xAxisLabelOffset}
          textAnchor="middle"
        >
          {xAxisLabel}
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
