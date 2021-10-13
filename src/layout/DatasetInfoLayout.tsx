import { Col, Row, Space, Typography } from 'antd';
import { DSVParsedArray, csvFormat } from 'd3-dsv';

import { CSVInfo } from '../components/CSVInfo';
import { CSVRow } from '../services/models/shared';
import { ReactElement } from 'react';

const { Text } = Typography;

export interface DatasetInfoLayoutProps<T extends CSVRow> {
  description: ReactElement;
  datasetName: string;
  data: DSVParsedArray<T>;
}

export const DatasetInfoLayout = <T extends CSVRow>({
  description,
  datasetName,
  data,
}: DatasetInfoLayoutProps<T>) => {
  return (
    <>
      <Row gutter={[0, 24]} justify="space-between" style={{ width: '100%' }}>
        <Col sm={10} md={7}>
          <CSVInfo
            titleStyle={{ fontSize: '24px' }}
            bodyStyle={{ fontSize: '18px' }}
            dataSetName={datasetName}
            dataSetSize={Math.round(csvFormat<T>(data).length / 1024)}
            numOfRows={data.length}
            numOfCols={Object.keys(data[0]).length}
          />
        </Col>
        <Col sm={10} md={13}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Text strong style={{ fontSize: '24px' }}>
              Description
            </Text>
            {description}
          </Space>
        </Col>
      </Row>
    </>
  );
};
