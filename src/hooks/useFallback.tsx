import { Loading } from '../components/Loading/Loading';
import { Typography } from 'antd';

const { Text } = Typography;

export const useFallback = (
  isLoading: boolean,
  isError: boolean,
  dataSet: string
) => {
  let fallback = null;

  if (isError) {
    fallback = (
      <Text strong style={{ color: 'red' }}>
        {`Failed To Load ${dataSet} Data`}
      </Text>
    );
  }

  if (isLoading) {
    fallback = <Loading />;
  }

  return { fallback };
};
