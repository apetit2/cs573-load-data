import { Col, Row, Select, Space, Typography } from 'antd';

import { ReactElement } from 'react';

const { Text } = Typography;

export interface SelectAxesProps {
  id: string;
  selectedX: string;
  onSelectX: (xAxis: string) => void;
  xOptions: ReactElement[];
  selectedY: string;
  onSelectY: (yAxis: string) => void;
  yOptions: ReactElement[];
  selectedColor: string;
  onSelectColor: (color: string) => void;
  colorOptions: ReactElement[];
}

export const SelectAxes: React.FC<SelectAxesProps> = ({
  id,
  selectedX,
  onSelectX,
  xOptions,
  selectedY,
  onSelectY,
  yOptions,
  selectedColor,
  onSelectColor,
  colorOptions,
}) => {
  return (
    <Row style={{ width: '100%' }} gutter={[12, 12]}>
      <Col sm={7} md={7} lg={8}>
        <Space direction="vertical" size="small" style={{ width: '100%' }}>
          <Text id={`${id}-x-axis-label`} strong style={{ fontSize: 12 }}>
            X Axis:
          </Text>
          <Select
            aria-labelledby={`${id}-x-axis-label`}
            style={{ width: '100%', maxWidth: '200px' }}
            defaultValue={selectedX}
            onChange={onSelectX}
          >
            {xOptions}
          </Select>
        </Space>
      </Col>
      <Col sm={7} md={7} lg={8}>
        <Space direction="vertical" size="small" style={{ width: '100%' }}>
          <Text strong style={{ fontSize: 12 }}>
            Y Axis:
          </Text>
          <Select
            style={{ width: '100%', maxWidth: '200px' }}
            defaultValue={selectedY}
            onChange={onSelectY}
          >
            {yOptions}
          </Select>
        </Space>
      </Col>
      <Col sm={7} md={7} lg={8}>
        <Space direction="vertical" size="small" style={{ width: '100%' }}>
          <Text strong style={{ fontSize: 12 }}>
            Color:
          </Text>
          <Select
            style={{ width: '100%', maxWidth: '200px' }}
            defaultValue={selectedColor}
            onChange={onSelectColor}
          >
            {colorOptions}
          </Select>
        </Space>
      </Col>
    </Row>
  );
};
