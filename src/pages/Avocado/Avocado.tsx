import {
  AvocadoCol,
  AvocadoCols,
  Avocado as AvocadoModel,
} from '../../services/models/avocado';
import { Col, Row, Select, Space, Typography } from 'antd';

import { Link } from 'react-router-dom';
import { ScatterPlot } from '../../components/ScatterPlot';
import { SelectAxes } from '../../components/SelectAxes';
import { useAvocadoQuery } from '../../services/hooks/useQuery';
import { useFallback } from '../../hooks/useFallback';
import { useInitializeChart } from '../../hooks/useInitializeChart';
import { useResizeChart } from '../../hooks/useResizeChart';
import { useState } from 'react';

const { Text } = Typography;
const { Option } = Select;

export interface AvocadoProps {}

export const Avocado: React.FC<AvocadoProps> = () => {
  const { data, isError, isLoading } = useAvocadoQuery();
  const [selectedColor, setSelectedColor] = useState<AvocadoCol>('type');
  const [xAxis, setXAxis] = useState<AvocadoCol>('month');
  const [yAxis, setYAxis] = useState<AvocadoCol>('averagePrice');

  // avocado specific
  const xValue = (row: AvocadoModel) => row[xAxis] as number;
  const xAxisLabel = AvocadoCols[xAxis].title;
  const yValue = (row: AvocadoModel) => row[yAxis] as number;
  const yAxisLabel = AvocadoCols[yAxis].title;
  const colorValue = (row: AvocadoModel) => row[selectedColor] as string;

  const xOptions = (Object.keys(AvocadoCols) as AvocadoCol[]).map((key) => (
    <Option value={key} key={key} disabled={AvocadoCols[key].type !== 'number'}>
      {AvocadoCols[key].title}
    </Option>
  ));

  const yOptions = (Object.keys(AvocadoCols) as AvocadoCol[]).map((key) => (
    <Option value={key} key={key} disabled={AvocadoCols[key].type !== 'number'}>
      {AvocadoCols[key].title}
    </Option>
  ));

  const colorOptions = (Object.keys(AvocadoCols) as AvocadoCol[]).map((key) => (
    <Option value={key} key={key} disabled={AvocadoCols[key].type !== 'string'}>
      {AvocadoCols[key].title}
    </Option>
  ));

  const { fallback } = useFallback(isLoading, isError, 'Avocado');

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
            <SelectAxes
              id="avocado"
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
        </Row>
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
