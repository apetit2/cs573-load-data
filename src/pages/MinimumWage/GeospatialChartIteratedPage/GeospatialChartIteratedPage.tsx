import {
  ChartLegend,
  GeospatialChart,
  YearSelector,
} from '../../../components/GeospatialChartIterated';
import { Col, Divider, Row, Space, Typography } from 'antd';
import { Link, generatePath, useHistory } from 'react-router-dom';

import { AppRoutes } from '../../../appRoutes';
import { Constants } from '../constants';
import { MinimumWage } from '../../../services/models/minimumWage';
import { PageLayout } from '../../../layout/PageLayout';
import { useFallback } from '../../../hooks/useFallback';
import { useIncrementYear } from '../../../hooks/useIncrementYear';
import { useMinimumWageQuery } from '../../../services/hooks/useQuery';
import { useState } from 'react';

export interface GeospatialChartIteratedPageProps {}

const { Text } = Typography;

export const GeospatialChartIteratedPage: React.FC<GeospatialChartIteratedPageProps> =
  () => {
    const history = useHistory();
    const { data, isError, isLoading } = useMinimumWageQuery();

    const minYear = data?.[0].year || 1968;
    const maxYear = data?.[data.length - 1]?.year || 2020;

    const [shouldDisableAutoIncrement, setShouldDisableAutoIncrementYear] =
      useState(true);
    const [selectedYear, setSelectedYear] = useState(minYear);

    const { fallback } = useFallback<MinimumWage>(isLoading, isError, data);

    useIncrementYear(
      maxYear,
      minYear,
      !shouldDisableAutoIncrement,
      selectedYear || 1968,
      setSelectedYear
    );

    if (fallback || !data) {
      return fallback;
    }

    const description = (
      <Space direction="vertical">
        <Row gutter={[0, 24]} justify="end">
          <Col span={10}>
            <ChartLegend<MinimumWage>
              timeField="year"
              stateField="state"
              colorRepresentation="effectiveMinWageTodayDollars"
              chosenTimeField={selectedYear}
              rows={data}
            />
          </Col>
        </Row>
        <Divider />
        <Text strong style={{ fontSize: 24 }}>
          Description
        </Text>
        <Text>
          A geospatial chart depicting effective minimum wage data for all U.S
          states and territories since 1968. It visualizes data supplied by the
          U.S Department of Labor. All data can be found in the{' '}
          <Link to={{ pathname: Constants.minWageUrl }} target="_blank">
            Minimum Wage Dataset
          </Link>
          .
        </Text>
        <ul>
          <li>Dollar amounts shown are in 2020 dollars.</li>
          <li>Darker state colors represent higher minimum wages.</li>
        </ul>
        <Divider />
        <Text strong style={{ fontSize: 24 }}>
          What&apos;s New
        </Text>
        <ul>
          <li>Toggle that automates year incrementation</li>
          <li>Legend showing what colors represent on the geospatial chart</li>
          <li>
            When hovering on a state, show the effective minimum wage for that
            state in a box below the chart
          </li>
          <li>Zoom and pan functionality is working.</li>
        </ul>
        <Divider />
        <Text strong style={{ fontSize: 24 }}>
          Still To Do
        </Text>
        <ul>
          <li>
            For smaller screen sizes, figure out why the chart does not center
            properly on load
          </li>
          <li>
            Implement an actual tooltip that appears when hovering on a state
          </li>
        </ul>
      </Space>
    );

    return (
      <PageLayout
        pageTitle="Minimum Wage Geospatial Chart"
        description={description}
        showDescriptionTitle={false}
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
          <GeospatialChart<MinimumWage>
            width={width}
            height={400}
            rows={data}
            timeField="year"
            stateField="state"
            colorRepresentation="effectiveMinWageTodayDollars"
            chosenTimeField={selectedYear}
            onClick={(_, state) =>
              history.push(
                generatePath(AppRoutes.MinimumWageLineChartLookUp, { state })
              )
            }
          />
        )}
      />
    );
  };
