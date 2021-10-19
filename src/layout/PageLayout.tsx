import { Col, Row, Space, Typography } from 'antd';

import { ReactElement } from 'react';
import { useResizeChart } from '../hooks/useResizeChart';

const { Text } = Typography;

export interface PageLayoutProps {
  pageTitle: string;
  generateChart: (dimensions: {
    width: number;
    height: number;
  }) => ReactElement;
  description?: ReactElement;
  menuItems?: ReactElement;
  showDescriptionTitle?: boolean;
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  pageTitle,
  menuItems,
  description,
  generateChart,
  showDescriptionTitle = true,
}) => {
  const { ref, dimensions } = useResizeChart();

  return (
    <div style={{ width: '100%' }} ref={ref}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Row style={{ width: '100%' }} justify="space-between" gutter={[0, 24]}>
          <Col xs={7}>
            <Text strong style={{ fontSize: 32 }}>
              {pageTitle}
            </Text>
          </Col>
          <Col xs={13}>{menuItems}</Col>
        </Row>
        {generateChart(dimensions)}
        <Space direction="vertical">
          {showDescriptionTitle && (
            <Text strong style={{ fontSize: 24 }}>
              Description
            </Text>
          )}
          <Text style={{ fontSize: 14 }}>{description}</Text>
        </Space>
      </Space>
    </div>
  );
};
