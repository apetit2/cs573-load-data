import { Col, Row, Space, Typography } from 'antd';
import { Link, useParams } from 'react-router-dom';
import {
  useAvocadoQuery,
  useHurricaneQuery,
  useMinimumWageQuery,
} from '../../services/hooks/useQuery';

import { CSVInfo } from '../../components/CSVInfo';
import { csvFormat } from 'd3-dsv';
import { useFallback } from '../../hooks/useFallback';

const { Text } = Typography;

export interface CSVInfoPageProps {}

export const CSVInfoPage: React.FC<CSVInfoPageProps> = () => {
  const { type } = useParams<{ type: 'hurricane' | 'avocado' | 'min-wage' }>();

  const {
    data: minWageData,
    isLoading: isMinWageLoading,
    isError: isMinWageError,
  } = useMinimumWageQuery({ enabled: type === 'min-wage' });

  const {
    data: hurricaneData,
    isLoading: isHurricaneLoading,
    isError: isHurricaneError,
  } = useHurricaneQuery({ enabled: type === 'hurricane' });

  const {
    data: avocadoData,
    isLoading: isAvocadoLoading,
    isError: isAvocadoError,
  } = useAvocadoQuery({ enabled: type === 'avocado' });

  const isLoading = isMinWageLoading || isHurricaneLoading || isAvocadoLoading;
  const isError = isMinWageError || isHurricaneError || isAvocadoError;

  let name: string;
  switch (type) {
    case 'hurricane':
      name = 'Pacific Hurricane';
      break;
    case 'avocado':
      name = 'Avocado';
      break;
    case 'min-wage':
      name = 'Minimum Wage';
      break;
    default:
      name = '';
      break;
  }

  const { fallback } = useFallback(isLoading, isError, name);

  // for error / loading states
  if (fallback) {
    return fallback;
  }

  // if no data was found for some reason
  // kept out of the fallback hook for typescript issues
  if (
    (type === 'min-wage' && !minWageData) ||
    (type === 'avocado' && !avocadoData) ||
    (type === 'hurricane' && !hurricaneData)
  ) {
    return <Text strong>No Data Found.</Text>;
  }

  const data = minWageData || avocadoData || hurricaneData;

  const generateDescription = () => {
    let specific: string;
    let pathname: string;
    if (type === 'avocado') {
      pathname =
        'https://gist.github.com/apetit2/a3a8f61f0c56a1d1448804a584b7c1bb';
      specific =
        'provides information on average price and volume sold for avocados throughout the United States from 2015 to 2018. Data is supplied by the Hass Avocado Board. The CSV can be found in the ';
    } else if (type === 'hurricane') {
      pathname =
        'https://gist.github.com/apetit2/5c1aa857558bc646281763252ea13d57';
      specific =
        'provides information on pacific hurricanes and tropical storms recorded off the west coast of the United States since 1949. Data is supplied by NOAA. The CSV can be found in the ';
    } else {
      pathname =
        'https://gist.github.com/apetit2/212a7cd715f8ba34eb637d014fffb12f';
      specific =
        'provides information on minimum wage for all U.S states and territories since 1968. Data is supplied by the U.S Department of Labor. The CSV can be found in the ';
    }

    return (
      <>
        The CSV characteristics shown on this page, describe a dataset that{' '}
        {specific}{' '}
        <Link
          to={{
            pathname,
          }}
          target="_blank"
        >
          {name} Dataset
        </Link>
        .
      </>
    );
  };

  return (
    <>
      <Row gutter={[0, 24]} justify="space-between" style={{ width: '100%' }}>
        <Col sm={10} md={7}>
          <CSVInfo
            titleStyle={{ fontSize: '24px' }}
            bodyStyle={{ fontSize: '18px' }}
            dataSetName={name}
            dataSetSize={Math.round(csvFormat(data!).length / 1024)}
            numOfRows={data!.length}
            numOfCols={Object.keys(data![0]).length}
          />
        </Col>
        <Col sm={10} md={13}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Text strong style={{ fontSize: '24px' }}>
              Description
            </Text>
            <Text>{generateDescription()}</Text>
          </Space>
        </Col>
      </Row>
    </>
  );
};
