import { Constants } from '../constants';
import { DatasetInfoLayout } from '../../../layout/DatasetInfoLayout';
import { Link } from 'react-router-dom';
import { MinimumWage } from '../../../services/models/minimumWage';
import { Typography } from 'antd';
import { useFallback } from '../../../hooks/useFallback';
import { useMinimumWageQuery } from '../../../services/hooks/useQuery';

const { Text } = Typography;

export interface CSVInfoPageProps {}

export const CSVInfoPage: React.FC<CSVInfoPageProps> = () => {
  const { data, isLoading, isError } = useMinimumWageQuery();

  const { fallback } = useFallback<MinimumWage>(isLoading, isError, data);

  if (fallback || !data) {
    return fallback;
  }

  const description = (
    <Text>
      provides information on minimum wage for all U.S states and territories
      since 1968. Data is supplied by the U.S Department of Labor. The CSV can
      be found in the{' '}
      <Link to={{ pathname: Constants.gistUrl }} target="_blank">
        Minimum Wage Dataset
      </Link>
      .
    </Text>
  );

  return (
    <DatasetInfoLayout<MinimumWage>
      description={description}
      datasetName="Minimum Wage"
      data={data}
    />
  );
};
