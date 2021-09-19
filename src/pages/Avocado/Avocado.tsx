import {
  AvocadoCol,
  AvocadoCols,
  Avocado as AvocadoModel,
} from '../../services/models/avocado';
import { Col, Row, Select, Space, Typography } from 'antd';

import { ScatterPlot } from '../../components/ScatterPlot';
import { SelectAxes } from '../../components/SelectAxes';
import { csvFormat } from 'd3-dsv';
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

  return (
    <div style={{ width: '100%' }} ref={(el) => setContainerDiv(el)}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Row style={{ width: '100%' }} justify="space-between" gutter={[0, 24]}>
          <Col sm={20} md={8} lg={5}>
            <Space direction="vertical" size="middle">
              <Text strong>Avocado Data Info</Text>
              <Text>Number of Rows: {data.length}</Text>
              <Text>Number of Columns: {Object.keys(data[0]).length}</Text>
              <Text>Size: {Math.round(csvFormat(data).length / 1024)} kb</Text>
            </Space>
          </Col>
          <Col sm={20} md={12} lg={15}>
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
    </div>
  );
};
