import { Col, Row, Select, Space, Typography } from 'antd';
import {
  HurricaneCol,
  HurricaneCols,
  Hurricane as HurricaneModel,
} from '../../services/models/hurricane';
import { Link, useParams } from 'react-router-dom';

import { ScatterPlot } from '../../components/ScatterPlot';
import { SelectAxes } from '../../components/SelectAxes';
import { TopoChart } from '../../components/TopoChart';
import { useFallback } from '../../hooks/useFallback';
import { useHurricaneQuery } from '../../services/hooks/useQuery';
import { useInitializeChart } from '../../hooks/useInitializeChart';
import { useResizeChart } from '../../hooks/useResizeChart';
import { useState } from 'react';

const { Text } = Typography;
const { Option } = Select;

export interface HurricaneProps {}

export const Hurricane: React.FC<HurricaneProps> = () => {
  const { plotType } = useParams<{ plotType: string }>();

  const { data, isError, isLoading } = useHurricaneQuery();
  const [selectedColor, setSelectedColor] = useState<HurricaneCol>('status');
  const [xAxis, setXAxis] = useState<HurricaneCol>('year');
  const [yAxis, setYAxis] = useState<HurricaneCol>('maxWind');

  // hurricane specific
  const xValue = (row: HurricaneModel) => row[xAxis] as number;
  const xAxisLabel = HurricaneCols[xAxis].title;
  const yValue = (row: HurricaneModel) => row[yAxis] as number;
  const yAxisLabel = HurricaneCols[yAxis].title;
  const colorValue = (row: HurricaneModel) => row[selectedColor] as string;

  const xOptions = (Object.keys(HurricaneCols) as HurricaneCol[]).map((key) => (
    <Option
      value={key}
      key={key}
      disabled={HurricaneCols[key].type !== 'number'}
    >
      {HurricaneCols[key].title}
    </Option>
  ));

  const yOptions = (Object.keys(HurricaneCols) as HurricaneCol[]).map((key) => (
    <Option
      value={key}
      key={key}
      disabled={HurricaneCols[key].type !== 'number'}
    >
      {HurricaneCols[key].title}
    </Option>
  ));

  const colorOptions = (Object.keys(HurricaneCols) as HurricaneCol[]).map(
    (key) => (
      <Option
        value={key}
        key={key}
        disabled={HurricaneCols[key].type !== 'string'}
      >
        {HurricaneCols[key].title}
      </Option>
    )
  );

  const { fallback } = useFallback(isLoading, isError, 'Hurricane');

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
        depicting all pacific typhoons recorded off the coast of the United
        States since 1949. {notShared} This chart visualizes data supplied by
        NOAA. All data can be found in the{' '}
        <Link
          to={{
            pathname:
              'https://gist.github.com/apetit2/5c1aa857558bc646281763252ea13d57',
          }}
          target="_blank"
        >
          Pacific Typhoon Dataset
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
              Pacific Typhoons{' '}
              {plotType === 'scatter-plot'
                ? 'Scatter Plot'
                : 'Geospatial Chart'}
            </Text>
          </Col>
          {plotType === 'scatter-plot' && (
            <Col sm={13}>
              <SelectAxes
                id="hurricane"
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
            </Col>
          )}
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
          <TopoChart width={width} height={height} rows={data} />
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
                'Each circle represents a typhoon spotted at various spots in the pacific ocean.'
              )}
            </Text>
          )}
        </Space>
      </Space>
    </div>
  );
};
