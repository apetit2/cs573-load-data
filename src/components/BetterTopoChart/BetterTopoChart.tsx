/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-array-index-key */
import './BetterTopoChart.css';

import { Col, Divider, Row, Space, Typography } from 'antd';
import { MouseEvent, useState } from 'react';
import { USMap, WorldMap } from '../../services/models/maps';
import {
  extent,
  geoAlbersUsa,
  geoPath,
  interpolateBlues,
  scaleSequential,
} from 'd3';

import { CSVRow } from '../../services/models/shared';
import { MinimumWage } from '../../services/models/minimumWage';
import { feature } from 'topojson-client';
import { usePanAndZoom } from './hooks/usePanAndZoom';
import { useTopoChart } from './hooks/useTopoChart';

const { Text } = Typography;

export interface BetterTopoChartProps {
  width: number;
  height: number;
  rows: CSVRow[];
  year?: number;
}

export const BetterTopoChart: React.FC<BetterTopoChartProps> = ({
  width,
  height,
  rows,
  year,
}) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const [ref, setRef] = useState<SVGSVGElement | null>(null);
  const [chosenState, setChosenState] = useState<string | undefined>();
  const { data, fallback } = useTopoChart();

  usePanAndZoom(ref, height);

  if (fallback) {
    return fallback;
  }

  const usData = data as USMap;
  const projection = geoAlbersUsa()
    .translate([width / 2, height / 2])
    .scale(800);
  const path = geoPath().projection(projection);
  const { features } = feature(usData, usData.objects.states);

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

  const minWages = filteredYear.reduce((acc, current) => {
    acc.push({
      state: current.state ?? '',
      minWage: Number(current.effectiveMinWageTodayDollars),
      color: colorSaturationScale(Number(current.effectiveMinWageTodayDollars)),
    });
    return acc;
  }, [] as { state: string; minWage: number; color: string }[]);

  const onMouseOver = (event: MouseEvent<SVGPathElement>, state: string) => {
    setChosenState(state);
  };

  const minAndMax = minWages.reduce(
    (acc: null | { max: number; min: number }, curr) => {
      if (!acc) {
        return { max: curr.minWage, min: curr.minWage };
      }

      if (curr.minWage > acc.max) {
        return { max: curr.minWage, min: acc.min };
      }

      if (curr.minWage < acc.min) {
        return { max: acc.min, min: curr.minWage };
      }

      return acc;
    },
    null
  );

  const generateLegend = () => {
    let min = minAndMax?.min || 0;
    const colors: string[] = [];
    const max = minAndMax?.max || 0;

    const incrementor = (max - min) / 8;

    while (colors.length < 8) {
      colors.push(colorSaturationScale(min));
      min += incrementor;
    }

    const w = 200 / colors.length;
    const cols = colors.map((color) => (
      <Col
        span={3}
        key={color}
        style={{
          height: '25px',
          width: w,
          backgroundColor: color,
        }}
      />
    ));

    return (
      <>
        <Row justify="end">{cols}</Row>
        <Row justify="space-between">
          <Text>{formatter.format(minAndMax?.min ?? 0)}</Text>
          <Text>{formatter.format(minAndMax?.max ?? 0)}</Text>
        </Row>
      </>
    );
  };

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <div
        style={{
          width,
          height,
          display: 'grid',
          overflowX: 'auto',
          justifyContent: 'center',
        }}
      >
        <svg height={height} width={1100} ref={setRef}>
          <g id="states">
            {features.map((value, index) => (
              <path
                className="state"
                key={index}
                d={path(value) as string}
                stroke="black"
                strokeWidth={0.5}
                onMouseOver={(el) => onMouseOver(el, value.properties.name)}
                fill={
                  minWages.find((el) => el.state === value.properties.name)
                    ?.color ?? 'green'
                }
              />
            ))}
          </g>
        </svg>
      </div>
      <Row gutter={[0, 24]} justify="space-between">
        <Col span={10}>
          {chosenState && (
            <Space direction="vertical">
              <Text strong style={{ fontSize: 24 }}>
                State: {chosenState}
              </Text>
              <Text style={{ fontSize: 14 }}>
                Effective Minimum Wage in 2020 Dollars:{' '}
                {formatter.format(
                  minWages.find((minWage) => minWage.state === chosenState)
                    ?.minWage ?? 0
                )}
              </Text>
            </Space>
          )}
        </Col>
        <Col span={10}>{generateLegend()}</Col>
      </Row>
      <Divider />
    </Space>
  );
};
