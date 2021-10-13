/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-array-index-key */
import {
  GeoPath,
  GeoProjection,
  extent,
  geoAlbersUsa,
  geoMercator,
  geoPath,
  interpolateBlues,
  scaleSequential,
} from 'd3';
import { USMap, WorldMap } from '../../services/models/maps';

import { CSVRow } from '../../services/models/shared';
import { Hurricane } from '../../services/models/hurricane';
import { MinimumWage } from '../../services/models/minimumWage';
import { feature } from 'topojson-client';
import { useGeospatialChart } from './hooks/useGeospatialChart';
import { usePanAndZoom } from './hooks/usePanAndZoom';
import { useRef } from 'react';

export interface GeospatialChartProps {
  width: number;
  height: number;
  rows: CSVRow[];
  year?: number;
}

export const GeospatialChart: React.FC<GeospatialChartProps> = ({
  width,
  height,
  rows,
  year,
}) => {
  const { rowType } = rows[0];
  const type = rowType === 'Hurricane' ? 'world' : 'us';

  const ref = useRef<SVGSVGElement>(null);
  const { data, fallback } = useGeospatialChart(type);

  usePanAndZoom(ref, height, type);

  if (fallback) {
    return fallback;
  }

  let projection: GeoProjection;
  let path: GeoPath;
  let features;
  if (type === 'world') {
    const worldData = data as WorldMap;
    projection = geoMercator().center([0, 15]).scale(200).rotate([-100, 0]);
    path = geoPath().projection(projection);
    features = feature(worldData, worldData.objects.countries).features;
  } else {
    const usData = data as USMap;
    projection = geoAlbersUsa()
      .translate([width / 3, height / 2])
      .scale(800);
    path = geoPath().projection(projection);
    features = feature(usData, usData.objects.states).features;
  }

  let coords: [number, number][] = [];
  if (rowType === 'Hurricane') {
    coords = (rows as Hurricane[]).map((row) => [
      row.longitude as number,
      row.latitude as number,
    ]) as [number, number][];
  }

  let minWages: { state: string; minWage: number; color: string }[];
  if (rowType === 'MinWage') {
    const filteredYear = (rows as MinimumWage[]).filter(
      (row) => row.year === year
    );

    const colorSaturationScale = scaleSequential()
      .domain(
        extent(filteredYear, (minimumWage) => {
          return minimumWage.effectiveMinWageTodayDollars;
        }) as [number, number]
      )
      .interpolator(interpolateBlues);

    minWages = filteredYear.reduce((acc, current) => {
      acc.push({
        state: current.state ?? '',
        minWage: Number(current.effectiveMinWageTodayDollars),
        color: colorSaturationScale(
          Number(current.effectiveMinWageTodayDollars)
        ),
      });
      return acc;
    }, [] as { state: string; minWage: number; color: string }[]);
  }

  return (
    <div
      style={{
        width,
        height,
        display: 'grid',
        overflowX: 'auto',
        justifyContent: 'center',
      }}
    >
      <svg height={height} width={1100} ref={ref}>
        {type === 'world' && (
          <g id="countries">
            {features.map((value, index) => (
              <path
                key={index}
                d={path(value) as string}
                stroke="#FFFFFF"
                strokeWidth={0.5}
              />
            ))}
            {coords.map((value, index) => (
              <circle
                key={index}
                cx={projection(value)?.[0] ?? 0}
                cy={projection(value)?.[1] ?? 0}
                r={1}
              />
            ))}
          </g>
        )}
        {type === 'us' && (
          <g id="states">
            {features.map((value, index) => (
              <path
                key={index}
                d={path(value) as string}
                stroke="black"
                strokeWidth={0.5}
                fill={
                  minWages!.find((el) => el.state === value.properties.name)
                    ?.color ?? 'green'
                }
              />
            ))}
          </g>
        )}
      </svg>
    </div>
  );
};
