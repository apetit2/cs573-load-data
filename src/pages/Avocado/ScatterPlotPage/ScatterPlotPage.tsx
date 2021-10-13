import { Avocado, AvocadoCols } from '../../../services/models/avocado';
import { ScatterPlot, ScatterPlotAxes } from '../../../components/ScatterPlot';

import { Constants } from '../constants';
import { KeysMatching } from '../../../types/shared';
import { Link } from 'react-router-dom';
import { PageLayout } from '../../../layout/PageLayout';
import { Typography } from 'antd';
import { useAvocadoQuery } from '../../../services/hooks/useQuery';
import { useFallback } from '../../../hooks/useFallback';
import { useState } from 'react';

const { Text } = Typography;

export interface ScatterPlotPageProps {}

export const ScatterPlotPage: React.FC<ScatterPlotPageProps> = () => {
  const { data, isError, isLoading } = useAvocadoQuery();

  const [selectedColor, setSelectedColor] =
    useState<KeysMatching<Avocado, string | undefined>>('type');
  const [xAxis, setXAxis] =
    useState<KeysMatching<Avocado, number | undefined>>('month');
  const [yAxis, setYAxis] =
    useState<KeysMatching<Avocado, number | undefined>>('averagePrice');

  const { fallback } = useFallback<Avocado>(isLoading, isError, data);

  if (fallback || !data) {
    return fallback;
  }

  const xAxisLabel = AvocadoCols[xAxis];
  const yAxisLabel = AvocadoCols[yAxis];

  const description = (
    <Text>
      A scatter plot depicting average avocado prices in each U.S state between
      2015 and 2018.The current view shows {yAxisLabel} in relation to{' '}
      {xAxisLabel}. Each circle color represents {selectedColor}. Data for this
      chart has been supplied by the Hass Avocado Board. All data can be found
      in the{' '}
      <Link to={{ pathname: Constants.gistUrl }} target="_blank">
        Avocado Price Dataset
      </Link>
      .
    </Text>
  );

  return (
    <PageLayout
      pageTitle="Avocado Scatter Plot"
      description={description}
      menuItems={
        <ScatterPlotAxes<Avocado>
          id="avocado"
          selectedX={xAxis}
          selectedY={yAxis}
          selectedColor={selectedColor}
          onSelectX={setXAxis}
          onSelectY={setYAxis}
          onSelectColor={setSelectedColor}
          data={data}
          labels={AvocadoCols}
        />
      }
      generateChart={({ width }) => (
        <ScatterPlot<Avocado>
          width={width}
          height={400}
          margin={{ top: 30, right: 30, bottom: 50, left: 0 }}
          data={data}
          x={xAxis}
          y={yAxis}
          color={selectedColor}
          xLabel={xAxisLabel}
          yLabel={yAxisLabel}
          radius={2}
        />
      )}
    />
  );
};
