import { Col, Row, Select, Space, Typography } from 'antd';
import { Link, useParams } from 'react-router-dom';
import {
  MinimumWageCol,
  MinimumWageCols,
  MinimumWage as MinimumWageModel,
} from '../../services/models/minimumWage';

import { ScatterPlot } from '../../components/ScatterPlot';
import { SelectAxes } from '../../components/SelectAxes';
import { TopoChart } from '../../components/TopoChart';
import { YearSelector } from './components/YearSelector';
import { useFallback } from '../../hooks/useFallback';
import { useInitializeChart } from '../../hooks/useInitializeChart';
import { useMinimumWageQuery } from '../../services/hooks/useQuery';
import { useResizeChart } from '../../hooks/useResizeChart';
import { useState } from 'react';

const { Text } = Typography;
const { Option } = Select;

export interface MinimumWageProps {}

export const MinimumWage: React.FC<MinimumWageProps> = () => {
  const { plotType } = useParams<{ plotType: string }>();

  const { data, isError, isLoading } = useMinimumWageQuery();
  const [selectedYear, setSelectedYear] = useState<number>(1968);
  const [selectedColor, setSelectedColor] = useState<MinimumWageCol>('state');
  const [xAxis, setXAxis] = useState<MinimumWageCol>('year');
  const [yAxis, setYAxis] = useState<MinimumWageCol>(
    'effectiveMinWageTodayDollars'
  );

  // minimum wage specific
  const xValue = (row: MinimumWageModel) => row[xAxis] as number;
  const xAxisLabel = MinimumWageCols[xAxis].title;
  const yValue = (row: MinimumWageModel) => row[yAxis] as number;
  const yAxisLabel = MinimumWageCols[yAxis].title;
  const colorValue = (row: MinimumWageModel) => row.state as string;

  const xOptions = (Object.keys(MinimumWageCols) as MinimumWageCol[]).map(
    (key) => (
      <Option
        value={key}
        key={key}
        disabled={MinimumWageCols[key].type !== 'number'}
      >
        {MinimumWageCols[key].title}
      </Option>
    )
  );

  const yOptions = (Object.keys(MinimumWageCols) as MinimumWageCol[]).map(
    (key) => (
      <Option
        value={key}
        key={key}
        disabled={MinimumWageCols[key].type !== 'number'}
      >
        {MinimumWageCols[key].title}
      </Option>
    )
  );

  const colorOptions = (Object.keys(MinimumWageCols) as MinimumWageCol[]).map(
    (key) => (
      <Option
        value={key}
        key={key}
        disabled={MinimumWageCols[key].type !== 'string'}
      >
        {MinimumWageCols[key].title}
      </Option>
    )
  );

  const { fallback } = useFallback(isLoading, isError, 'Minimum Wage');

  const { dimensions, setContainerDiv } = useResizeChart();
  const {
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
  } = useInitializeChart(dimensions, xValue, yValue, colorValue, data);

  // for error / loading states
  if (fallback) {
    return fallback;
  }

  // if no data was found for some reason
  // kept out of the fallback hook for typescript issues
  if (!data) {
    return <Text strong>No Data Found.</Text>;
  }

  const generateDescription = (notShared: string) => {
    return (
      <>
        A {plotType === 'scatter-plot' ? 'scatter plot' : 'geospatial chart'}
        depicting minimum wage data for all U.S states and territories since
        1968. {notShared} This chart visualizes data supplied by the U.S
        Department of Labor. All data can be found in the{' '}
        <Link
          to={{
            pathname:
              'https://gist.github.com/apetit2/212a7cd715f8ba34eb637d014fffb12f',
          }}
          target="_blank"
        >
          Minimum Wage Dataset
        </Link>
        .
      </>
    );
  };

  return (
    <div style={{ width: '100%' }} ref={(el) => setContainerDiv(el)}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Row style={{ width: '100%' }} justify="space-between" gutter={[0, 24]}>
          <Col xs={7}>
            <Text strong style={{ fontSize: 32 }}>
              Minimum Wage{' '}
              {plotType === 'scatter-plot'
                ? 'Scatter Plot'
                : 'Geospatial Chart'}
            </Text>
          </Col>
          <Col xs={13}>
            {plotType === 'scatter-plot' && (
              <SelectAxes
                id="minimum-wage"
                selectedX={xAxis}
                selectedY={yAxis}
                selectedColor={selectedColor}
                onSelectX={setXAxis as (xAxis: string) => void}
                onSelectY={setYAxis as (yAxis: string) => void}
                onSelectColor={setSelectedColor as (color: string) => void}
                xOptions={xOptions}
                yOptions={yOptions}
                colorOptions={colorOptions}
              />
            )}
            {plotType === 'topography' && (
              <YearSelector
                minYear={data[0].year!}
                maxYear={data[data.length - 1].year!}
                onChange={setSelectedYear}
              />
            )}
          </Col>
        </Row>
        {plotType === 'scatter-plot' && (
          <ScatterPlot
            width={width}
            height={height}
            paddedWidth={paddedWidth}
            paddedHeight={paddedHeight}
            margin={margin}
            data={data}
            xScale={xScale}
            yScale={yScale}
            colorScale={colorScale}
            xValue={xValue}
            yValue={yValue}
            colorValue={colorValue}
            xAxisLabel={xAxisLabel}
            yAxisLabel={yAxisLabel}
            radius={2}
            xAxisLabelOffset={xAxisLabelOffset}
            yAxisLabelOffset={yAxisLabelOffset}
          />
        )}
        {plotType === 'topography' && (
          <TopoChart
            width={width}
            height={height}
            rows={data}
            year={selectedYear}
          />
        )}
        <Space direction="vertical">
          <Text strong style={{ fontSize: 24 }}>
            Description
          </Text>
          {plotType === 'scatter-plot' && (
            <Text style={{ fontSize: 14 }}>
              {generateDescription(`The current view shows ${yAxisLabel} in
              relation to ${xAxisLabel}. Each circle color represents ${selectedColor}`)}
            </Text>
          )}
          {plotType === 'topography' && (
            <Text style={{ fontSize: 14 }}>
              {generateDescription(
                'Darker state colors represent higher minimum wages.'
              )}
            </Text>
          )}
        </Space>
      </Space>
    </div>
  );
};
