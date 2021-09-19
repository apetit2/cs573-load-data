import { Col, Row, Select, Space, Typography } from 'antd';
import {
  MinimumWageCol,
  MinimumWageCols,
  MinimumWage as MinimumWageModel,
} from '../../services/models/minimumWage';

import { ScatterPlot } from '../../components/ScatterPlot';
import { SelectAxes } from '../../components/SelectAxes';
import { csvFormat } from 'd3-dsv';
import { useFallback } from '../../hooks/useFallback';
import { useInitializeChart } from '../../hooks/useInitializeChart';
import { useMinimumWageQuery } from '../../services/hooks/useQuery';
import { useResizeChart } from '../../hooks/useResizeChart';
import { useState } from 'react';

const { Text } = Typography;
const { Option } = Select;

export interface MinimumWageProps {}

export const MinimumWage: React.FC<MinimumWageProps> = () => {
  const { data, isError, isLoading } = useMinimumWageQuery();
  const [selectedColor, setSelectedColor] = useState<MinimumWageCol>('state');
  const [xAxis, setXAxis] = useState<MinimumWageCol>('year');
  const [yAxis, setYAxis] = useState<MinimumWageCol>(
    'effectiveMinWageTodayDollars'
  );

  // minimum wage specific
  const xValue = (row: MinimumWageModel) => row[xAxis] as number;
  const xAxisLabel = MinimumWageCols[xAxis].title;
  const yValue = (row: MinimumWageModel) => row[yAxis] as number;
  const yAxisLabel = MinimumWageCols[yAxis].title;
  const colorValue = (row: MinimumWageModel) => row.state as string;

  const xOptions = (Object.keys(MinimumWageCols) as MinimumWageCol[]).map(
    (key) => (
      <Option
        value={key}
        key={key}
        disabled={MinimumWageCols[key].type !== 'number'}
      >
        {MinimumWageCols[key].title}
      </Option>
    )
  );

  const yOptions = (Object.keys(MinimumWageCols) as MinimumWageCol[]).map(
    (key) => (
      <Option
        value={key}
        key={key}
        disabled={MinimumWageCols[key].type !== 'number'}
      >
        {MinimumWageCols[key].title}
      </Option>
    )
  );

  const colorOptions = (Object.keys(MinimumWageCols) as MinimumWageCol[]).map(
    (key) => (
      <Option
        value={key}
        key={key}
        disabled={MinimumWageCols[key].type !== 'string'}
      >
        {MinimumWageCols[key].title}
      </Option>
    )
  );

  const { fallback } = useFallback(isLoading, isError, 'Minimum Wage');

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
              <Text strong>Minimum Wage Data Info</Text>
              <Text>Number of Rows: {data.length}</Text>
              <Text>Number of Columns: {Object.keys(data[0]).length}</Text>
              <Text>Size: {Math.round(csvFormat(data).length / 1024)} kb</Text>
            </Space>
          </Col>
          <Col sm={20} md={12} lg={15}>
            <SelectAxes
              id="minimum-wage"
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
