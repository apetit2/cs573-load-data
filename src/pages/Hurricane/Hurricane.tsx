import { Space, Typography } from 'antd';

import { csvFormat } from 'd3-dsv';
import { useHurricaneQuery } from '../../services/hooks/useQuery';

const { Text } = Typography;

export interface HurricaneProps {}

export const Hurricane: React.FC<HurricaneProps> = () => {
  const { data } = useHurricaneQuery();

  if (!data) {
    return (
      <Text strong style={{ color: 'red' }}>
        Failed To Load Hurricane Data
      </Text>
    );
  }

  return (
    <Space direction="vertical" size="middle">
      <Text strong>Hurricane Data Info</Text>
      <Text>Number of Rows: {data.length}</Text>
      <Text>Number of Columns: {data.columns.length}</Text>
      <Text>Size: {Math.round(csvFormat(data).length / 1024)} kb</Text>
    </Space>
  );
};
