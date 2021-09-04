import { Space, Spin, Typography } from 'antd';

import { csvFormat } from 'd3-dsv';
import { useAvocadoQuery } from '../../services/hooks/useQuery';

const { Text } = Typography;

export interface AvocadoProps {}

export const Avocado: React.FC<AvocadoProps> = () => {
  const { data, isError, isLoading } = useAvocadoQuery();

  if (isError) {
    return (
      <Text strong style={{ color: 'red' }}>
        Failed To Load Avocado Data
      </Text>
    );
  }

  if (isLoading) {
    return (
      <Space
        align="center"
        direction="horizontal"
        style={{
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          paddingTop: 100,
        }}
      >
        <Spin tip="Loading..." />
      </Space>
    );
  }

  if (!data) {
    return <Text strong>No Data Found.</Text>;
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
