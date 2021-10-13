import {
  GeospatialChart,
  YearSelector,
} from '../../../components/GeospatialChart';

import { Constants } from '../constants';
import { Link } from 'react-router-dom';
import { MinimumWage } from '../../../services/models/minimumWage';
import { PageLayout } from '../../../layout/PageLayout';
import { Typography } from 'antd';
import { useFallback } from '../../../hooks/useFallback';
import { useMinimumWageQuery } from '../../../services/hooks/useQuery';
import { useState } from 'react';

export interface GeospatialChartPageProps {}

const { Text } = Typography;

export const GeospatialChartPage: React.FC<GeospatialChartPageProps> = () => {
  const { data, isError, isLoading } = useMinimumWageQuery();
  const [selectedYear, setSelectedYear] = useState(1968);

  const { fallback } = useFallback<MinimumWage>(isLoading, isError, data);

  // for error / loading states
  if (fallback || !data) {
    return fallback;
  }

  const description = (
    <>
      <Text>
        A geospatial chart depicting effective minimum wage data for all U.S
        states and territories since 1968. It visualizes data supplied by the
        U.S Department of Labor. All data can be found in the{' '}
        <Link to={{ pathname: Constants.gistUrl }} target="_blank">
          Minimum Wage Dataset
        </Link>
        .
      </Text>
      <ul>
        <li>Dollar amounts shown are in 2020 dollars.</li>
        <li>Darker state colors represent higher minimum wages.</li>
      </ul>
    </>
  );

  return (
    <PageLayout
      pageTitle="Minimum Wage Geospatial Chart"
      menuItems={
        <YearSelector
          minYear={data[0].year!}
          maxYear={data[data.length - 1].year!}
          onChange={setSelectedYear}
        />
      }
      generateChart={({ width }) => (
        <GeospatialChart
          width={width}
          height={400}
          rows={data}
          year={selectedYear}
        />
      )}
      description={description}
    />
  );
};
