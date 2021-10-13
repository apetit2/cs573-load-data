import {
  useUSMapQuery,
  useWorldMapQuery,
} from '../../../services/hooks/useQuery';

import { Loading } from '../../Loading/Loading';
import { Map } from '../../../services/models/maps';
import { ReactElement } from 'react';
import { Typography } from 'antd';

const { Text } = Typography;

export const useGeospatialChart: (type: 'world' | 'us') => {
  data: Map;
  fallback: ReactElement | undefined;
} = (type = 'world') => {
  const {
    data: worldData,
    isError: isWorldDataError,
    isLoading: isWorldDataLoading,
  } = useWorldMapQuery();

  const {
    data: usData,
    isError: isUSDataError,
    isLoading: isUSDataLoading,
  } = useUSMapQuery();

  const isLoading = isWorldDataLoading || isUSDataLoading;
  const isError = isWorldDataError || isUSDataError;
  const data = type === 'world' ? worldData : usData;

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
