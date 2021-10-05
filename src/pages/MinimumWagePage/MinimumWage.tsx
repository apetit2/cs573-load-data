import { Col, Divider, Row, Space, Typography } from 'antd';
import { LinePlot, LinePlotAxes } from '../../components/LinePlot';
import { Link, useParams } from 'react-router-dom';
import {
  MinimumWageCols,
  MinimumWage as MinimumWageModel,
} from '../../services/models/minimumWage';

import { BetterTopoChart } from '../../components/BetterTopoChart';
import { BetterYearSelector } from './components/BetterYearSelector';
import { KeysMatching } from '../../types/shared';
import { ScatterPlot } from '../../components/ScatterPlot';
import { SelectAxes } from '../../components/SelectAxes';
import { TopoChart } from '../../components/TopoChart';
import { YearSelector } from './components/YearSelector';
import { useFallback } from '../../hooks/useFallback';
import { useIncrementYear } from '../../hooks/useIncrementYear';
import { useMinimumWageQuery } from '../../services/hooks/useQuery';
import { useResizeChart } from '../../hooks/useResizeChart';
import { useState } from 'react';

const { Text } = Typography;

export interface MinimumWagePageProps {}

export const MinimumWagePage: React.FC<MinimumWagePageProps> = () => {
  const { plotType } = useParams<{
    plotType:
      | 'scatter-plot'
      | 'topography'
      | 'geospatial-chart-iterated'
      | 'line';
  }>();

  const { data, isError, isLoading } = useMinimumWageQuery();
  const [shouldDisableAutoIncrementYear, setShouldDisableAutoIncrementYear] =
    useState(true);
  const [selectedYear, setSelectedYear] = useState<number>(1968);
  const [selectedColor, setSelectedColor] =
    useState<KeysMatching<MinimumWageModel, string | undefined>>('state');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [xAxis, setXAxis] =
    useState<KeysMatching<MinimumWageModel, number | undefined>>('year');
  const [yAxis, setYAxis] = useState<
    KeysMatching<MinimumWageModel, number | undefined>
  >('effectiveMinWageTodayDollars');

  useIncrementYear(
    2020,
    1968,
    plotType === 'geospatial-chart-iterated' && !shouldDisableAutoIncrementYear,
    selectedYear,
    setSelectedYear
  );

  // minimum wage specific
  const xAxisLabel = MinimumWageCols[xAxis];
  const yAxisLabel = MinimumWageCols[yAxis];

  const { fallback } = useFallback(isLoading, isError, 'Minimum Wage');

  const { dimensions, setContainerDiv } = useResizeChart();

  // for error / loading states
  if (fallback) {
    return fallback;
  }

  // if no data was found for some reason
  // kept out of the fallback hook for typescript issues
  if (!data) {
    return <Text strong>No Data Found.</Text>;
  }

  const generateDescription = () => {
    return (
      <>
        A {plotType === 'scatter-plot' && 'scatter plot'}
        {plotType === 'line' && 'line plot'}
        {plotType !== 'line' &&
          plotType !== 'scatter-plot' &&
          'geospatial chart'}{' '}
        depicting effective minimum wage data for all U.S states and territories
        since 1968. It visualizes data supplied by the U.S Department of Labor.
        All data can be found in the{' '}
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
              Minimum Wage {plotType === 'scatter-plot' && 'Scatter Plot'}
              {plotType === 'topography' ||
                (plotType === 'geospatial-chart-iterated' &&
                  'Geospatial Chart')}
              {plotType === 'line' && 'Line Plot'}
            </Text>
          </Col>
          <Col xs={13}>
            {plotType === 'scatter-plot' && (
              <SelectAxes<MinimumWageModel>
                id="minimum-wage"
                selectedX={xAxis}
                selectedY={yAxis}
                selectedColor={selectedColor}
                onSelectX={setXAxis}
                onSelectY={setYAxis}
                onSelectColor={setSelectedColor}
                data={data}
                labels={MinimumWageCols}
              />
            )}
            {plotType === 'line' && (
              <LinePlotAxes<MinimumWageModel>
                id="minimum-wage"
                selectedX={xAxis}
                selectedY={yAxis}
                selectedGrouping={selectedColor}
                onSelectX={setXAxis}
                onSelectY={setYAxis}
                onSelectGrouping={setSelectedColor}
                onSelectFilter={setSelectedFilter}
                selectedFilter={selectedFilter}
                data={data}
                labels={MinimumWageCols}
              />
            )}
            {plotType === 'topography' && (
              <YearSelector
                minYear={data[0].year!}
                maxYear={data[data.length - 1].year!}
                onChange={setSelectedYear}
              />
            )}
            {plotType === 'geospatial-chart-iterated' && (
              <BetterYearSelector
                defaultYear={selectedYear}
                minYear={data[0].year!}
                maxYear={data[data.length - 1].year!}
                incrementYearDisabled={shouldDisableAutoIncrementYear}
                toggleIncrementYear={setShouldDisableAutoIncrementYear}
                onChange={setSelectedYear}
              />
            )}
          </Col>
        </Row>
        {plotType === 'line' && (
          <LinePlot<MinimumWageModel>
            width={dimensions.width}
            height={400}
            margin={{ top: 30, right: 30, bottom: 50, left: 0 }}
            data={data}
            xLabel={xAxisLabel}
            yLabel={yAxisLabel}
            x={xAxis}
            y={yAxis}
            grouping={selectedColor}
            filter={selectedFilter === 'All' ? undefined : selectedFilter}
            opacity=".8"
            strokeWidth={4}
          />
        )}
        {plotType === 'scatter-plot' && (
          <ScatterPlot<MinimumWageModel>
            width={dimensions.width}
            height={400}
            margin={{ top: 30, right: 30, bottom: 50, left: 0 }}
            data={data}
            xLabel={xAxisLabel}
            yLabel={yAxisLabel}
            x={xAxis}
            y={yAxis}
            color={selectedColor}
            radius={2}
          />
        )}
        {plotType === 'topography' && (
          <TopoChart
            width={dimensions.width}
            height={400}
            rows={data}
            year={selectedYear}
          />
        )}
        {plotType === 'geospatial-chart-iterated' && (
          <BetterTopoChart
            width={dimensions.width}
            height={400}
            rows={data}
            year={selectedYear}
          />
        )}
        <Space direction="vertical">
          <Text strong style={{ fontSize: 24 }}>
            Description
          </Text>
          {(plotType === 'scatter-plot' || plotType === 'line') && (
            <>
              <Text style={{ fontSize: 14 }}>{generateDescription()}</Text>
              <ul>
                <li>
                  The current view shows {yAxisLabel} in relation to{' '}
                  {xAxisLabel}.
                </li>
                <li>
                  Each {plotType === 'scatter-plot' ? 'circle' : 'line'} color
                  represents {selectedColor}
                </li>
              </ul>
            </>
          )}
          {(plotType === 'topography' ||
            plotType === 'geospatial-chart-iterated') && (
            <>
              <Text style={{ fontSize: 14 }}>{generateDescription()}</Text>
              <ul>
                <li>Dollar amounts shown are in 2020 dollars.</li>
                <li>Darker state colors represent higher minimum wages.</li>
              </ul>
            </>
          )}
          {plotType === 'geospatial-chart-iterated' && (
            <>
              <Divider />
              <Text strong style={{ fontSize: 24 }}>
                What&apos;s New
              </Text>
              <ul>
                <li>Toggle that automates year incrementation</li>
                <li>
                  Legend showing what colors represent on the geospatial chart
                </li>
                <li>
                  When hovering on a state, show the effective minimum wage for
                  that state in a box below the chart
                </li>
                <li>Zoom and pan functionality is working.</li>
              </ul>
              <Divider />
              <Text strong style={{ fontSize: 24 }}>
                Still To Do
              </Text>
              <ul>
                <li>
                  For smaller screen sizes, figure out why the chart does not
                  center properly on load
                </li>
                <li>
                  Implement an actual tooltip that appears when hovering on a
                  state
                </li>
              </ul>
            </>
          )}
        </Space>
      </Space>
    </div>
  );
};
