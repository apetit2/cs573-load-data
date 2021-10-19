/* eslint-disable react/no-array-index-key */
import {
  DSVParsedArray,
  extent,
  interpolateTurbo,
  scaleLinear,
  scaleOrdinal,
  line,
  curveBasis,
  brushX,
  select,
} from 'd3';
import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { AxisBottom } from './AxisBottom';
import { AxisLeft } from './AxisLeft';
import { CSVRow } from '../../services/models/shared';
import { KeysMatching } from '../../types/shared';
import { AnimatedGroup } from '../AnimatedGroup';

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
  focusable?: boolean;
}

const xAxisLabelOffset = 50;
const brushedSectionSize = 0.2;

const filterData = <T extends CSVRow>(
  data: DSVParsedArray<T>,
  grouping: KeysMatching<T, string | undefined>,
  filter?: string,
  brushExtent?: [number, number],
  x?: KeysMatching<T, number | undefined>
) => {
  const lines: T[][] = [];
  let rowIndex = 0;
  // no great way to make this efficient
  data
    .filter((row) => {
      if (brushExtent && x) {
        return (
          (filter === undefined ||
            (row[grouping] as string).toLowerCase() === filter.toLowerCase()) &&
          (row[x] as number) >= brushExtent[0] &&
          (row[x] as number) <= brushExtent[1]
        );
      }

      return (
        filter === undefined ||
        (row[grouping] as string).toLowerCase() === filter.toLowerCase()
      );
    })
    .sort((rowOne, rowTwo) => {
      return (rowOne[grouping] as string).localeCompare(
        rowTwo[grouping] as string
      );
    })
    .forEach((row, index, arr) => {
      if (
        index >= 1 &&
        (row[grouping] as string) !== (arr[index - 1][grouping] as string)
      ) {
        lines.push([row]);
        rowIndex += 1;
      } else if (index === 0) {
        lines.push([row]);
      } else {
        lines[rowIndex].push(row);
      }
    });

  return lines;
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
  focusable = true,
}: PropsWithChildren<LineChartProps<T>>) => {
  const [brushExtent, setBrushExtent] = useState<[number, number]>();
  const brushRef = useRef<SVGGElement>(null);

  const xValue = useCallback((row: T) => row[x] as number, [x]);
  const yValue = useCallback((row: T) => row[y] as number, [y]);
  const colorValue = useCallback(
    (row: T) => row[grouping] as string,
    [grouping]
  );

  const brushedSectionHeight = useMemo(
    () => brushedSectionSize * height,
    [height]
  );

  const yRange = useMemo(
    () => extent(data, yValue) as [number, number],
    [data, yValue]
  );
  const xRange = useMemo(
    () => extent(data, xValue) as [number, number],
    [data, xValue]
  );
  const focusXRange = useMemo(
    () => extent(data, xValue) as [number, number],
    [data, xValue]
  );

  const paddedHeight = useMemo(
    () => height - margin.top - margin.bottom,
    [height, margin]
  );
  const paddedWidth = useMemo(
    () => width - margin.left - margin.right,
    [width, margin]
  );

  const xScale = useMemo(
    () =>
      scaleLinear()
        .domain(brushExtent || xRange)
        .range([0, paddedWidth])
        .nice(),
    [paddedWidth, xRange, brushExtent]
  );
  const yScale = useMemo(
    () => scaleLinear().domain(yRange).range([paddedHeight, 0]),
    [paddedHeight, yRange]
  );
  const focusXScale = useMemo(
    () => scaleLinear().domain(focusXRange).range([0, paddedWidth]).nice(),
    [paddedWidth, focusXRange]
  );
  const focusYScale = useMemo(
    () =>
      scaleLinear()
        .domain(yRange)
        .range([height * brushedSectionSize, 0]),
    [yRange, height]
  );

  const colorScale = useMemo(() => {
    const uniqueOrdinalValues = Array.from(new Set(data.map(colorValue)));
    const numUniqueOrdinalValues = uniqueOrdinalValues.length;

    const colors = uniqueOrdinalValues.map((_, index) => {
      return interpolateTurbo(index / numUniqueOrdinalValues);
    });
    return scaleOrdinal<string>().domain(data.map(colorValue)).range(colors);
  }, [data, colorValue]);

  const marginsForAxes = useMemo(
    () => ({
      ...margin,
      left: yRange[1].toString().length * 8.75 + 20,
    }),
    [margin, yRange]
  );

  const yAxisLabelOffset = useMemo(
    () => yRange[1].toString().length * 8.75 + 10,
    [yRange]
  );

  const drawLines = useMemo(() => {
    return line<T>()
      .x((row) => xScale(xValue(row)))
      .y((row) => yScale(yValue(row)))
      .curve(curveBasis);
  }, [xScale, yScale, yValue, xValue]);

  const drawFocus = useMemo(() => {
    return line<T>()
      .x((row) => focusXScale(xValue(row)))
      .y((row) => focusYScale(yValue(row)))
      .curve(curveBasis);
  }, [focusXScale, focusYScale, yValue, xValue]);

  useEffect(() => {
    if (brushRef.current && paddedWidth > 0) {
      const brush = brushX().extent([
        [0, 0],
        [paddedWidth, brushedSectionHeight],
      ]);
      brush(select<SVGGElement, unknown>(brushRef.current));
      brush.on('brush end', (event) => {
        setBrushExtent(
          event.selection && event.selection.map(focusXScale.invert)
        );
      });
    }
  }, [paddedWidth, brushedSectionHeight, brushRef, focusXScale]);

  const lines = useMemo(
    () => filterData(data, grouping, filter, brushExtent, x),
    [data, grouping, filter, brushExtent, x]
  );

  const focusLines = useMemo(() => {
    if (focusable) {
      return filterData(data, grouping, filter);
    }
    return undefined;
  }, [data, grouping, filter, focusable]);

  return (
    <svg
      width={width}
      height={focusable ? height + height * brushedSectionSize + 50 : height}
    >
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

        {!focusable && (
          <text
            className="axis-label"
            x={paddedWidth / 2}
            y={paddedHeight + xAxisLabelOffset}
            textAnchor="middle"
          >
            {xLabel}
          </text>
        )}

        <AnimatedGroup>
          {lines.map((toDrawLine) => (
            <path
              key={toDrawLine[0][grouping]}
              d={drawLines(toDrawLine)!}
              stroke={stroke || colorScale(colorValue(toDrawLine[0]))}
              strokeWidth={strokeWidth}
              opacity={opacity}
              fill="none"
            />
          ))}
        </AnimatedGroup>
      </g>
      {focusable && (
        <AnimatedGroup
          ref={brushRef}
          transform={`translate(${marginsForAxes.left}, ${
            height + margin.bottom + margin.top - brushedSectionHeight
          })`}
        >
          <AxisBottom
            xScale={focusXScale}
            height={brushedSectionHeight}
            tickOffset={10}
          />

          {focusLines?.map((toDrawLine) => (
            <path
              key={toDrawLine[0][grouping]}
              d={drawFocus(toDrawLine)!}
              stroke={stroke || colorScale(colorValue(toDrawLine[0]))}
              strokeWidth={strokeWidth}
              opacity={opacity}
              fill="none"
            />
          ))}
        </AnimatedGroup>
      )}
    </svg>
  );
};
