import {
  MinimumWageCol,
  MinimumWageCols,
  MinimumWage as MinimumWageModel,
} from '../../services/models/minimumWage';
import { Space, Typography } from 'antd';

import { ScatterPlot } from '../../components/ScatterPlot';
import { SelectAxes } from './components/SelectAxes';
import { csvFormat } from 'd3-dsv';
import { useFallback } from '../../hooks/useFallback';
import { useInitializeChart } from '../../hooks/useInitializeChart';
import { useMinimumWageQuery } from '../../services/hooks/useQuery';
import { useResizeChart } from '../../hooks/useResizeChart';
import { useState } from 'react';

const { Text } = Typography;

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
        <Space
          direction="horizontal"
          style={{ justifyContent: 'space-between', width: '100%' }}
        >
          <Space direction="vertical" size="middle">
            <Text strong>Minimum Wage Data Info</Text>
            <Text>Number of Rows: {data.length}</Text>
            <Text>Number of Columns: {Object.keys(data[0]).length}</Text>
            <Text>Size: {Math.round(csvFormat(data).length / 1024)} kb</Text>
          </Space>
          <SelectAxes
            selectedX={xAxis}
            selectedY={yAxis}
            selectedColor={selectedColor}
            onSelectX={setXAxis}
            onSelectY={setYAxis}
            onSelectColor={setSelectedColor}
          />
        </Space>
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
