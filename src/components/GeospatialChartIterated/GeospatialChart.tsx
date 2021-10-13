import './GeospatialChart.css';

import { DSVParsedArray, geoAlbersUsa, geoPath } from 'd3';
import { MouseEvent, useEffect, useState } from 'react';
import { Space, Typography } from 'antd';

import { CSVRow } from '../../services/models/shared';
import { KeysMatching } from '../../types/shared';
import ReactTooltip from 'react-tooltip';
import { USMap } from '../../services/models/maps';
import { currencyFormatter } from '../../util/currency';
import { feature } from 'topojson-client';
import { useFetchStateData } from './hooks/useFetchStateData';
import { useGeospatialChart } from './hooks/useGeospatialChart';
import { usePanAndZoom } from './hooks/usePanAndZoom';

const { Text } = Typography;

export interface GeospatialChartProps<T extends CSVRow> {
  width: number;
  height: number;
  rows: DSVParsedArray<CSVRow>;
  timeField: KeysMatching<T, number | undefined>;
  stateField: KeysMatching<T, string | undefined>;
  colorRepresentation: KeysMatching<T, number | undefined>;
  chosenTimeField: number;
  onMouseOver?: (event: MouseEvent<SVGPathElement>, state: string) => void;
  onClick?: (event: MouseEvent<SVGPathElement>, state: string) => void;
}

export const GeospatialChart = <T extends CSVRow>({
  width,
  height,
  rows,
  timeField,
  stateField,
  colorRepresentation,
  chosenTimeField,
  onMouseOver,
  onClick,
}: GeospatialChartProps<T>) => {
  const [ref, setRef] = useState<SVGSVGElement | null>(null);
  const { data, fallback } = useFetchStateData();

  useEffect(() => {
    ReactTooltip.rebuild();
  }, []);

  usePanAndZoom(ref, height, width);
  const { findFieldByStateOrDefault, splitByCapitalLetter } =
    useGeospatialChart(
      rows,
      timeField as string,
      stateField as string,
      colorRepresentation as string,
      chosenTimeField
    );

  if (fallback) {
    return fallback;
  }

  const generateScale = () => {
    if (width / 1.3 > 800) {
      return 800;
    }

    return width / 1.3;
  };

  const usData = data as USMap;
  const projection = geoAlbersUsa()
    .translate([width / 2, height / 2])
    .scale(generateScale());
  const path = geoPath().projection(projection);
  const { features } = feature(usData, usData.objects.states);

  return (
    <>
      <svg height={height} width={width} ref={setRef}>
        <g id="states">
          {features.map((value) => (
            <path
              data-tip={value.properties.name}
              data-for="states-tooltip"
              className="state"
              d={path(value) as string}
              stroke="black"
              strokeWidth={0.5}
              key={`${value.properties.name}`}
              onClick={(event) => {
                ReactTooltip.rebuild();
                if (onClick) {
                  onClick(event, value.properties.name);
                }
              }}
              onMouseOver={
                onMouseOver
                  ? (event) => onMouseOver(event, value.properties.name)
                  : undefined
              }
              fill={findFieldByStateOrDefault<string>(
                value.properties.name,
                'color',
                'green'
              )}
            />
          ))}
        </g>
      </svg>
      <ReactTooltip
        id="states-tooltip"
        place="top"
        effect="float"
        getContent={(state) => {
          return (
            <Space direction="vertical">
              <Text style={{ color: 'white' }}>State: {state}</Text>
              <Text style={{ color: 'white' }}>
                {splitByCapitalLetter(colorRepresentation as string)}:{' '}
                {currencyFormatter.format(
                  findFieldByStateOrDefault<number>(state, 'value', 0)
                )}
              </Text>
            </Space>
          );
        }}
      />
    </>
  );
};
