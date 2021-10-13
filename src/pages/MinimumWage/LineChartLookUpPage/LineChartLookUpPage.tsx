import {
  MinimumWage,
  MinimumWageCols,
} from '../../../services/models/minimumWage';

import { LineChart } from '../../../components/LineChart';
import { PageLayout } from '../../../layout/PageLayout';
import { Typography } from 'antd';
import { useFallback } from '../../../hooks/useFallback';
import { useMinimumWageQuery } from '../../../services/hooks/useQuery';
import { useParams } from 'react-router-dom';

const { Text } = Typography;

export interface LineChartLookUpPageProps {}

export const LineChartLookUpPage: React.FC<LineChartLookUpPageProps> = () => {
  const { state } = useParams<{ state: string }>();

  const { data, isError, isLoading } = useMinimumWageQuery();

  const { fallback } = useFallback<MinimumWage>(isLoading, isError, data);

  if (fallback || !data) {
    return fallback;
  }

  const xAxisLabel = MinimumWageCols.year;
  const yAxisLabel = MinimumWageCols.effectiveMinWageTodayDollars;

  const description = (
    <>
      <Text>Need to add this</Text>
    </>
  );

  return (
    <PageLayout
      pageTitle={`Effective Minimum Wage For ${state}`}
      description={description}
      generateChart={({ width }) => (
        <LineChart<MinimumWage>
          width={width}
          height={400}
          margin={{ top: 30, right: 30, bottom: 50, left: 0 }}
          data={data}
          xLabel={xAxisLabel}
          yLabel={yAxisLabel}
          x="year"
          y="effectiveMinWageTodayDollars"
          grouping="state"
          filter={state}
          opacity=".4"
          strokeWidth={3}
          stroke="blue"
        />
      )}
    />
  );
};
