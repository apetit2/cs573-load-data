import {
  MinimumWage,
  MinimumWageCols,
} from '../../../services/models/minimumWage';
import { ScatterPlot, ScatterPlotAxes } from '../../../components/ScatterPlot';

import { Constants } from '../constants';
import { KeysMatching } from '../../../types/shared';
import { Link } from 'react-router-dom';
import { PageLayout } from '../../../layout/PageLayout';
import { Typography } from 'antd';
import { useFallback } from '../../../hooks/useFallback';
import { useMinimumWageQuery } from '../../../services/hooks/useQuery';
import { useState } from 'react';

const { Text } = Typography;

export interface ScatterPlotPageProps {}

export const ScatterPlotPage: React.FC<ScatterPlotPageProps> = () => {
  const { data, isError, isLoading } = useMinimumWageQuery();

  const [selectedColor, setSelectedColor] =
    useState<KeysMatching<MinimumWage, string | undefined>>('state');
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
        A scatter plot depicting effective minimum wage data for all U.S states
        and territiories since 1968. It visualizes data supplied by the U.S
        Department of Labor. All data can be found in the{' '}
        <Link to={{ pathname: Constants.gistUrl }} target="_blank">
          Minimum Wage Dataset
        </Link>
        .
        <ul>
          <li>
            The current view shows {yAxisLabel} in relation to {xAxisLabel}.
          </li>
          <li>Each circle color represents {selectedColor}</li>
        </ul>
      </Text>
    </>
  );

  return (
    <PageLayout
      pageTitle="Minimum Wage Scatter Plot"
      description={description}
      menuItems={
        <ScatterPlotAxes<MinimumWage>
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
      }
      generateChart={({ width }) => (
        <ScatterPlot<MinimumWage>
          width={width}
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
    />
  );
};
