import { MinimumWage } from '../../../services/models/minimumWage';
import { ScatterPlot } from '../../../components/ScatterPlot';
import { YearSelector } from '../../../components/GeospatialChartIterated/YearSelector';

import { Constants } from '../constants';
import { Link } from 'react-router-dom';
import { PageLayout } from '../../../layout/PageLayout';
import { Typography } from 'antd';
import { useFallback } from '../../../hooks/useFallback';
import { useMinimumWageQuery } from '../../../services/hooks/useQuery';
import { useMemo, useState } from 'react';
import { DSVParsedArray } from 'd3-dsv';
import { useIncrementYear } from '../../../hooks/useIncrementYear';

const { Text } = Typography;

export interface ScatterPlotPageProps {}

export const ScatterPlotPage: React.FC<ScatterPlotPageProps> = () => {
  const { data, isError, isLoading } = useMinimumWageQuery();

  // hard code for the time being
  const minYear = 2001;
  const maxYear = 2020;

  const [shouldDisableAutoIncrement, setShouldDisableAutoIncrementYear] =
    useState(true);
  const [selectedYear, setSelectedYear] = useState(minYear);

  const filteredData = useMemo(() => {
    return data?.filter((row) => row.studio && row.year === selectedYear) as
      | DSVParsedArray<MinimumWage>
      | undefined;
  }, [data, selectedYear]);

  useIncrementYear(
    maxYear,
    minYear,
    !shouldDisableAutoIncrement,
    selectedYear,
    setSelectedYear
  );

  const { fallback } = useFallback<MinimumWage>(isLoading, isError, data);

  if (fallback || !filteredData || filteredData.length === 0) {
    return fallback;
  }

  const xAxisLabel = "Studio Apartment Cost (Today's Dollars)";
  const yAxisLabel = "Minimum Wage (Today's Dollars)";
  const selectedColor = 'State';

  const description = (
    <>
      <Text>
        A scatter plot depicting minimum wage as it pertains to rent cost. It
        visualizes data supplied by the U.S Department of Labor and Housing and
        Urban Development Department. Minimum wage data can be found{' '}
        <Link to={{ pathname: Constants.minWageUrl }} target="_blank">
          here
        </Link>
        . Rent data can be found{' '}
        <Link to={{ pathname: Constants.rentUrl }} target="_blank">
          here
        </Link>
        . Each circle color represents {selectedColor}.
      </Text>
    </>
  );

  return (
    <PageLayout
      pageTitle="Minimum Wage Scatter Plot"
      description={description}
      menuItems={
        <YearSelector
          defaultYear={selectedYear}
          minYear={minYear}
          maxYear={maxYear}
          incrementYearDisabled={shouldDisableAutoIncrement}
          toggleIncrementYear={setShouldDisableAutoIncrementYear}
          onChange={setSelectedYear}
        />
      }
      generateChart={({ width }) => (
        <ScatterPlot<MinimumWage>
          width={width}
          height={400}
          margin={{ top: 30, right: 30, bottom: 60, left: 0 }}
          data={filteredData}
          xLabel={xAxisLabel}
          yLabel={yAxisLabel}
          x="studio"
          y="stateMinWageTodayDollars"
          color="state"
          radius={10}
          showTooltip
        />
      )}
    />
  );
};
