import { Hurricane, HurricaneCols } from '../../../services/models/hurricane';
import { ScatterPlot, ScatterPlotAxes } from '../../../components/ScatterPlot';

import { Constants } from '../constants';
import { KeysMatching } from '../../../types/shared';
import { Link } from 'react-router-dom';
import { PageLayout } from '../../../layout/PageLayout';
import { Typography } from 'antd';
import { useFallback } from '../../../hooks/useFallback';
import { useHurricaneQuery } from '../../../services/hooks/useQuery';
import { useState } from 'react';

const { Text } = Typography;

export interface ScatterPlotPageProps {}

export const ScatterPlotPage: React.FC<ScatterPlotPageProps> = () => {
  const { data, isError, isLoading } = useHurricaneQuery();
  const [selectedColor, setSelectedColor] =
    useState<KeysMatching<Hurricane, string | undefined>>('status');
  const [xAxis, setXAxis] =
    useState<KeysMatching<Hurricane, number | undefined>>('year');
  const [yAxis, setYAxis] =
    useState<KeysMatching<Hurricane, number | undefined>>('maxWind');

  const { fallback } = useFallback(isLoading, isError, data);

  if (fallback || !data) {
    return fallback;
  }

  const xAxisLabel = HurricaneCols[xAxis];
  const yAxisLabel = HurricaneCols[yAxis];

  const description = (
    <Text>
      A scatter plot depicating all pacific hurricanes and tropical storms
      recorded off the coast of the United States since 1949. The current view
      shows {yAxisLabel} in relation to {xAxisLabel}. Each circle color
      represents {selectedColor}. This chart visualizes data supplied by NOAA.
      All data can be found in the{' '}
      <Link to={{ pathname: Constants.gistUrl }} target="_blank">
        Pacific Hurricane Dataset
      </Link>
      .
    </Text>
  );

  return (
    <PageLayout
      pageTitle="A Scatter Plot Depicting Pacific Hurricanes and Tropical Storms"
      description={description}
      menuItems={
        <ScatterPlotAxes<Hurricane>
          id="hurricane"
          selectedX={xAxis}
          selectedY={yAxis}
          selectedColor={selectedColor}
          onSelectX={setXAxis}
          onSelectY={setYAxis}
          onSelectColor={setSelectedColor}
          data={data}
          labels={HurricaneCols}
        />
      }
      generateChart={({ width }) => (
        <ScatterPlot<Hurricane>
          width={width}
          height={400}
          margin={{ top: 30, right: 30, bottom: 50, left: 0 }}
          data={data}
          xLabel={xAxisLabel}
          yLabel={yAxisLabel}
          radius={2}
          x={xAxis}
          y={yAxis}
          color={selectedColor}
        />
      )}
    />
  );
};
