import { LineChart, LineChartAxes } from '../../../components/LineChart';
import {
  MinimumWage,
  MinimumWageCols,
} from '../../../services/models/minimumWage';

import { Constants } from '../constants';
import { KeysMatching } from '../../../types/shared';
import { Link } from 'react-router-dom';
import { PageLayout } from '../../../layout/PageLayout';
import { Typography } from 'antd';
import { useFallback } from '../../../hooks/useFallback';
import { useMinimumWageQuery } from '../../../services/hooks/useQuery';
import { useState } from 'react';

const { Text } = Typography;

export interface LineChartPageProps {}

export const LineChartPage: React.FC<LineChartPageProps> = () => {
  const { data, isError, isLoading } = useMinimumWageQuery();

  const [selectedGrouping, setSelectedGrouping] =
    useState<KeysMatching<MinimumWage, string | undefined>>('state');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [xAxis, setXAxis] =
    useState<KeysMatching<MinimumWage, number | undefined>>('year');
  const [yAxis, setYAxis] = useState<
    KeysMatching<MinimumWage, number | undefined>
  >('effectiveMinWageTodayDollars');

  const { fallback } = useFallback<MinimumWage>(isLoading, isError, data);

  if (fallback || !data) {
    return fallback;
  }

  const xAxisLabel = MinimumWageCols[xAxis];
  const yAxisLabel = MinimumWageCols[yAxis];

  const description = (
    <>
      <Text>
        A line chart depicting effective minimum wage data for all U.S states
        and territiories since 1968. It visualizes data supplied by the U.S
        Department of Labor. All data can be found in the{' '}
        <Link to={{ pathname: Constants.gistUrl }} target="_blank">
          Minimum Wage Dataset
        </Link>
        .
      </Text>
      <ul>
        <li>
          The current view shows {yAxisLabel} in relation to {xAxisLabel}.
        </li>
        <li>Each line color represents {selectedGrouping}</li>
      </ul>
    </>
  );

  return (
    <PageLayout
      pageTitle="Minimum Wage Line Chart"
      description={description}
      menuItems={
        <LineChartAxes<MinimumWage>
          id="minimum-wage"
          selectedX={xAxis}
          selectedY={yAxis}
          selectedGrouping={selectedGrouping}
          onSelectX={setXAxis}
          onSelectY={setYAxis}
          onSelectGrouping={setSelectedGrouping}
          onSelectFilter={setSelectedFilter}
          selectedFilter={selectedFilter}
          data={data}
          labels={MinimumWageCols}
        />
      }
      generateChart={({ width }) => (
        <LineChart<MinimumWage>
          width={width}
          height={400}
          margin={{ top: 30, right: 30, bottom: 50, left: 0 }}
          data={data}
          xLabel={xAxisLabel}
          yLabel={yAxisLabel}
          x={xAxis}
          y={yAxis}
          grouping={selectedGrouping}
          filter={selectedFilter === 'All' ? undefined : selectedFilter}
          opacity=".4"
          strokeWidth={3}
          stroke={selectedFilter !== 'All' ? 'blue' : undefined}
        />
      )}
    />
  );
};
