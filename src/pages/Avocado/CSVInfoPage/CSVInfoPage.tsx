import { Avocado } from '../../../services/models/avocado';
import { Constants } from '../constants';
import { DatasetInfoLayout } from '../../../layout/DatasetInfoLayout';
import { Link } from 'react-router-dom';
import { Typography } from 'antd';
import { useAvocadoQuery } from '../../../services/hooks/useQuery';
import { useFallback } from '../../../hooks/useFallback';

const { Text } = Typography;

export interface CSVInfoPageProps {}

export const CSVInfoPage: React.FC<CSVInfoPageProps> = () => {
  const { data, isLoading, isError } = useAvocadoQuery();

  const { fallback } = useFallback<Avocado>(isLoading, isError, data);

  if (fallback || !data) {
    return fallback;
  }

  const description = (
    <Text>
      The CSV characteristics shown on this page, describe a dataset that
      provides information on average price and volume sold for avocados
      throughout the United States from 2015 to 2018.{' '}
      <Link to={{ pathname: Constants.gistUrl }} target="_blank">
        Avocado Dataset
      </Link>
      .
    </Text>
  );

  return (
    <DatasetInfoLayout<Avocado>
      datasetName="Avocado"
      data={data}
      description={description}
    />
  );
};
