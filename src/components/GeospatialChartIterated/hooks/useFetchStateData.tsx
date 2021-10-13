import { Loading } from '../../Loading/Loading';
import { Map } from '../../../services/models/maps';
import { ReactElement } from 'react';
import { Typography } from 'antd';
import { useUSMapQuery } from '../../../services/hooks/useQuery';

const { Text } = Typography;

export const useFetchStateData: () => {
  data: Map;
  fallback: ReactElement | undefined;
} = () => {
  const { data, isError, isLoading } = useUSMapQuery();

  let fallback: ReactElement | undefined;
  if (isLoading) {
    fallback = <Loading />;
  }

  if (isError || !data) {
    fallback = <Text>Some error</Text>;
  }

  return {
    data: data!,
    fallback,
  };
};
