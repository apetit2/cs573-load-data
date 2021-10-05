import { Col, Row, Space, Typography } from 'antd';
import {
  HurricaneCols,
  Hurricane as HurricaneModel,
} from '../../services/models/hurricane';
import { Link, useParams } from 'react-router-dom';

import { KeysMatching } from '../../types/shared';
import { ScatterPlot } from '../../components/ScatterPlot';
import { SelectAxes } from '../../components/SelectAxes';
import { TopoChart } from '../../components/TopoChart';
import { useFallback } from '../../hooks/useFallback';
import { useHurricaneQuery } from '../../services/hooks/useQuery';
import { useResizeChart } from '../../hooks/useResizeChart';
import { useState } from 'react';

const { Text } = Typography;

export interface HurricanePageProps {}

export const HurricanePage: React.FC<HurricanePageProps> = () => {
  const { plotType } = useParams<{ plotType: string }>();

  const { data, isError, isLoading } = useHurricaneQuery();
  const [selectedColor, setSelectedColor] =
    useState<KeysMatching<HurricaneModel, string | undefined>>('status');
  const [xAxis, setXAxis] =
    useState<KeysMatching<HurricaneModel, number | undefined>>('year');
  const [yAxis, setYAxis] =
    useState<KeysMatching<HurricaneModel, number | undefined>>('maxWind');

  // hurricane specific
  const xAxisLabel = HurricaneCols[xAxis];
  const yAxisLabel = HurricaneCols[yAxis];

  const { fallback } = useFallback(isLoading, isError, 'Hurricane');

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
        A {plotType === 'scatter-plot' ? 'scatter plot' : 'geospatial chart'}
        depicting all pacific hurricanes and tropical storms recorded off the
        coast of the United States since 1949. {notShared} This chart visualizes
        data supplied by NOAA. All data can be found in the{' '}
        <Link
          to={{
            pathname:
              'https://gist.github.com/apetit2/5c1aa857558bc646281763252ea13d57',
          }}
          target="_blank"
        >
          Pacific Hurricane Dataset
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
              Pacific Hurricanes and Tropical Storms{' '}
              {plotType === 'scatter-plot'
                ? 'Scatter Plot'
                : 'Geospatial Chart'}
            </Text>
          </Col>
          {plotType === 'scatter-plot' && (
            <Col sm={13}>
              <SelectAxes<HurricaneModel>
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
            </Col>
          )}
        </Row>
        {plotType === 'scatter-plot' && (
          <ScatterPlot
            width={dimensions.width}
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
        {plotType === 'topography' && (
          <TopoChart width={dimensions.width} height={400} rows={data} />
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
                'Each circle represents a hurricane or tropical storm spotted at various spots in the pacific ocean.'
              )}
            </Text>
          )}
        </Space>
      </Space>
    </div>
  );
};
