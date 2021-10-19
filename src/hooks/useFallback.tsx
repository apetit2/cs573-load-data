import { CSVRow } from '../services/models/shared';
import { DSVParsedArray } from 'd3-dsv';
import { Loading } from '../components/Loading/Loading';
import { Typography } from 'antd';

const { Text } = Typography;

export const useFallback = <T extends CSVRow>(
  isLoading: boolean,
  isError: boolean,
  data?: DSVParsedArray<T>
) => {
  let fallback = null;

  if (isError) {
    fallback = (
      <Text strong style={{ color: 'red' }}>
        Failed To Load Dataset.
      </Text>
    );
  }

  if (isLoading) {
    fallback = <Loading />;
  }

  if (!data && !isLoading) {
    fallback = <Text strong>No Data Found.</Text>;
  }

  return { fallback };
};
