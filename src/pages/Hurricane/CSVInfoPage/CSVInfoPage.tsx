import { Constants } from '../constants';
import { DatasetInfoLayout } from '../../../layout/DatasetInfoLayout';
import { Hurricane } from '../../../services/models/hurricane';
import { Link } from 'react-router-dom';
import { Typography } from 'antd';
import { useFallback } from '../../../hooks/useFallback';
import { useHurricaneQuery } from '../../../services/hooks/useQuery';

const { Text } = Typography;

export interface CSVInfoPageProps {}

export const CSVInfoPage: React.FC<CSVInfoPageProps> = () => {
  const { data, isLoading, isError } = useHurricaneQuery();

  const { fallback } = useFallback<Hurricane>(isLoading, isError, data);

  if (fallback || !data) {
    return fallback;
  }

  const description = (
    <Text>
      The CSV characteristics shown on this page, describe a dataset that
      provides information on pacific hurricanes and tropical storms recorded
      off the west coast of the United States since 1949. Data is supplied by
      NOAA. The CSV can be found in the{' '}
      <Link to={{ pathname: Constants.gistUrl }} target="_blank">
        Hurricane Dataset
      </Link>
      .
    </Text>
  );

  return (
    <DatasetInfoLayout<Hurricane>
      datasetName="Hurricane"
      data={data}
      description={description}
    />
  );
};
