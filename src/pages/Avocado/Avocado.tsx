import {
  AvocadoCol,
  AvocadoCols,
  Avocado as AvocadoModel,
} from '../../services/models/avocado';
import { Space, Typography } from 'antd';

import { ScatterPlot } from '../../components/ScatterPlot';
import { SelectAxes } from './components/SelectAxes';
import { csvFormat } from 'd3-dsv';
import { useAvocadoQuery } from '../../services/hooks/useQuery';
import { useFallback } from '../../hooks/useFallback';
import { useInitializeChart } from '../../hooks/useInitializeChart';
import { useResizeChart } from '../../hooks/useResizeChart';
import { useState } from 'react';

const { Text } = Typography;

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
        <Space
          direction="horizontal"
          style={{ justifyContent: 'space-between', width: '100%' }}
        >
          <Space direction="vertical" size="middle">
            <Text strong>Avocado Data Info</Text>
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
