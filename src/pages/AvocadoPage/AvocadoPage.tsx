import {
  AvocadoCols,
  Avocado as AvocadoModel,
} from '../../services/models/avocado';
import { Col, Row, Space, Typography } from 'antd';

import { KeysMatching } from '../../types/shared';
import { Link } from 'react-router-dom';
import { ScatterPlot } from '../../components/ScatterPlot';
import { SelectAxes } from '../../components/SelectAxes';
import { useAvocadoQuery } from '../../services/hooks/useQuery';
import { useFallback } from '../../hooks/useFallback';
import { useResizeChart } from '../../hooks/useResizeChart';
import { useState } from 'react';

const { Text } = Typography;

export interface AvocadoPageProps {}

export const AvocadoPage: React.FC<AvocadoPageProps> = () => {
  const { data, isError, isLoading } = useAvocadoQuery();
  const [selectedColor, setSelectedColor] =
    useState<KeysMatching<AvocadoModel, string | undefined>>('type');
  const [xAxis, setXAxis] =
    useState<KeysMatching<AvocadoModel, number | undefined>>('month');
  const [yAxis, setYAxis] =
    useState<KeysMatching<AvocadoModel, number | undefined>>('averagePrice');

  // avocado specific
  const xAxisLabel = AvocadoCols[xAxis];
  const yAxisLabel = AvocadoCols[yAxis];

  const { fallback } = useFallback(isLoading, isError, 'Avocado');

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

  const generateDescription = (notShared: string) => {
    return (
      <>
        A scatter plot depicting avocado prices in all U.S states from 2015 to
        2018. {notShared} This chart visualizes data supplied by the Hass
        Avocado Board. All data can be found in the{' '}
        <Link
          to={{
            pathname:
              'https://gist.github.com/apetit2/a3a8f61f0c56a1d1448804a584b7c1bb',
          }}
          target="_blank"
        >
          Avocado Price Dataset
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
              Avocado Scatter Plot
            </Text>
          </Col>
          <Col xs={13}>
            <SelectAxes<AvocadoModel>
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
          </Col>
        </Row>
        <ScatterPlot<AvocadoModel>
          width={dimensions.width}
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
      </Space>
      <Space direction="vertical">
        <Text strong style={{ fontSize: 24 }}>
          Description
        </Text>
        <Text style={{ fontSize: 14 }}>
          {generateDescription(`The current view shows ${yAxisLabel} in
              relation to ${xAxisLabel}. Each circle color represents ${selectedColor}`)}
        </Text>
      </Space>
    </div>
  );
};
