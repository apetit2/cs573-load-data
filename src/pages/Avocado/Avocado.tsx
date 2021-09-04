import { Space, Typography } from 'antd';

import { csvFormat } from 'd3-dsv';
import { useAvocadoQuery } from '../../services/hooks/useQuery';

const { Text } = Typography;

export interface AvocadoProps {}

export const Avocado: React.FC<AvocadoProps> = () => {
  const { data } = useAvocadoQuery();

  if (!data) {
    return (
      <Text strong style={{ color: 'red' }}>
        Failed To Load Avocado Data
      </Text>
    );
  }

  return (
    <Space direction="vertical" size="middle">
      <Text strong>Avocado Data Info</Text>
      <Text>Number of Rows: {data.length}</Text>
      <Text>Number of Columns: {data.columns.length}</Text>
      <Text>Size: {Math.round(csvFormat(data).length / 1024)} kb</Text>
    </Space>
  );
};
