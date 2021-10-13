import { Constants } from '../constants';
import { GeospatialChart } from '../../../components/GeospatialChart';
import { Link } from 'react-router-dom';
import { PageLayout } from '../../../layout/PageLayout';
import { Typography } from 'antd';
import { useFallback } from '../../../hooks/useFallback';
import { useHurricaneQuery } from '../../../services/hooks/useQuery';

const { Text } = Typography;

export interface GeospatialChartPageProps {}

export const GeospatialChartPage: React.FC<GeospatialChartPageProps> = () => {
  const { data, isError, isLoading } = useHurricaneQuery();

  const { fallback } = useFallback(isLoading, isError, data);

  if (fallback || !data) {
    return fallback;
  }

  const description = (
    <Text>
      A geospatial chart depicting all pacific hurricanes and tropical storms
      recorded off the coast of the United States since 1949. Each circle
      represents a hurricane or tropical storm spotted at various spots in the
      pacific ocean. This chart visualizes data supplied by NOAA. All data can
      be found in the{' '}
      <Link to={{ pathname: Constants.gistUrl }} target="_blank">
        Pacific Hurricane Dataset
      </Link>
      .
    </Text>
  );

  return (
    <PageLayout
      description={description}
      pageTitle="A Geospatial Chart Depicting Pacific Hurricanes and Tropical Storms"
      generateChart={({ width }) => (
        <GeospatialChart width={width} height={400} rows={data} />
      )}
    />
  );
};
