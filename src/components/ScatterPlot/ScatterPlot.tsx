/* eslint-disable react/no-array-index-key */
import {
  DSVParsedArray,
  extent,
  interpolateTurbo,
  scaleLinear,
  scaleOrdinal,
} from 'd3';

import { AxisBottom } from './AxisBottom';
import { AxisLeft } from './AxisLeft';
import { CSVRow } from '../../services/models/shared';
import { KeysMatching } from '../../types/shared';
import { AnimatedGroup } from '../AnimatedGroup';
import { PropsWithChildren, useCallback, useMemo } from 'react';
import ReactTooltip from 'react-tooltip';
import { Space, Typography } from 'antd';
import { currencyFormatter } from '../../util/currency';

const { Text } = Typography;

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
  showTooltip?: boolean;
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
  showTooltip = false,
  opacity = '.3',
}: PropsWithChildren<ScatterPlotProps<T>>) => {
  const xAxisLabelOffset = 50;

  const xValue = useCallback((row: T) => row[x] as number, [x]);
  const yValue = useCallback((row: T) => row[y] as number, [y]);
  const colorValue = useCallback(
    (row: T) => {
      return color ? (row[color] as string) : undefined;
    },
    [color]
  );

  const xRange = useMemo(() => {
    return extent(data, xValue) as [number, number];
  }, [xValue, data]);

  const yRange = useMemo(() => {
    return extent(data, yValue) as [number, number];
  }, [yValue, data]);

  const paddedHeight = useMemo(() => {
    return height - margin.top - margin.bottom;
  }, [height, margin]);

  const paddedWidth = useMemo(() => {
    return width - margin.left - margin.right;
  }, [width, margin]);

  const xScale = useMemo(() => {
    return scaleLinear().domain(xRange).range([0, paddedWidth]).nice();
  }, [xRange, paddedWidth]);

  const yScale = useMemo(() => {
    return scaleLinear().domain(yRange).range([paddedHeight, 0]);
  }, [yRange, paddedHeight]);

  const { colorScale } = useMemo(() => {
    if (color) {
      const uniqueOrdinalValues = Array.from(
        new Set(data.map(colorValue))
      ) as string[];
      const numUniqueOrdinalValues = uniqueOrdinalValues.length;
      const range = uniqueOrdinalValues.map((_, index) => {
        return interpolateTurbo(index / numUniqueOrdinalValues);
      });

      const scale = scaleOrdinal<string>()
        .domain(data.map(colorValue as (row: T) => string))
        .range(range);

      return { colorRange: range, colorScale: scale };
    }

    return { colorRange: undefined, colorScale: undefined };
  }, [colorValue, data, color]);

  const marginsForAxes = useMemo(() => {
    return {
      ...margin,
      left: yRange[1].toString().length * 8.75 + 20,
    };
  }, [yRange, margin]);

  const yAxisLabelOffset = useMemo(() => {
    return yRange[1].toString().length * 8.75 + 10;
  }, [yRange]);

  const yAxisLabel = useMemo(() => {
    return (
      <text
        className="axis-label"
        textAnchor="middle"
        transform={`translate(${-yAxisLabelOffset},${
          paddedHeight / 2
        }) rotate(-90)`}
      >
        {yLabel}
      </text>
    );
  }, [yAxisLabelOffset, paddedHeight, yLabel]);

  const findFieldByValue = (value: string): { x: number; y: number } => {
    const tmp = data.find((el) => (el[color!] as string) === value);

    return tmp
      ? { x: tmp[x!] as number, y: tmp[y!] as number }
      : { x: 0, y: 0 };
  };

  return (
    <>
      <svg width={width} height={height}>
        <g
          transform={`translate(${marginsForAxes.left},${marginsForAxes.top})`}
        >
          <AxisBottom xScale={xScale} height={paddedHeight} tickOffset={10} />

          {yAxisLabel}

          <AxisLeft yScale={yScale} width={paddedWidth} tickOffset={5} />

          <text
            className="axis-label"
            x={paddedWidth / 2}
            y={paddedHeight + xAxisLabelOffset}
            textAnchor="middle"
          >
            {xLabel}
          </text>

          <AnimatedGroup>
            {data.map((row, index) => {
              return (
                <circle
                  data-tip={colorValue(row)}
                  data-for="tooltip"
                  key={index}
                  cx={xScale(xValue(row))}
                  cy={yScale(yValue(row))}
                  r={radius}
                  opacity={opacity}
                  fill={colorScale ? colorScale(colorValue(row)!) : 'green'}
                />
              );
            })}
          </AnimatedGroup>
        </g>
      </svg>
      {showTooltip && (
        <ReactTooltip
          id="tooltip"
          place="top"
          effect="float"
          getContent={(val) => {
            const xAndY = findFieldByValue(val);

            return (
              <Space direction="vertical">
                <Text style={{ color: 'white' }}>
                  {color}: {val}
                </Text>
                <Text style={{ color: 'white' }}>
                  {x}: {currencyFormatter.format(xAndY.x)}
                </Text>
                <Text style={{ color: 'white' }}>
                  {y}: {currencyFormatter.format(xAndY.y)}
                </Text>
              </Space>
            );
          }}
        />
      )}
    </>
  );
};
