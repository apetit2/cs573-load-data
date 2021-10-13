import { Col, Row, Select, Space, Typography } from 'antd';

import { CSVRow } from '../../services/models/shared';
import { DSVParsedArray } from 'd3-dsv';
import { KeysMatching } from '../../types/shared';
import { PropsWithChildren } from 'react';

const { Text } = Typography;
const { Option } = Select;

export interface ScatterPlotAxesProps<T extends CSVRow> {
  id: string;
  selectedX: KeysMatching<T, number | undefined>;
  selectedY: KeysMatching<T, number | undefined>;
  selectedColor: KeysMatching<T, string | undefined>;
  onSelectX: (xAxis: KeysMatching<T, number | undefined>) => void;
  onSelectY: (yAxis: KeysMatching<T, number | undefined>) => void;
  onSelectColor: (color: KeysMatching<T, string | undefined>) => void;
  data: DSVParsedArray<T>;
  labels: Record<string, string>;
}

export const ScatterPlotAxes = <T extends CSVRow>({
  id,
  selectedX,
  selectedY,
  selectedColor,
  onSelectX,
  onSelectY,
  onSelectColor,
  data,
  labels,
}: PropsWithChildren<ScatterPlotAxesProps<T>>) => {
  // this is probably not the best way of doing this
  const numericOptions = Object.entries(data[0])
    .filter((col) => typeof col[1] === 'number')
    .map((col) => col[0]);

  const stringOptions = Object.entries(data[0])
    .filter((col) => typeof col[1] === 'string')
    .map((col) => col[0]);

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
            defaultValue={selectedX as string}
            onChange={onSelectX as (value: string) => void}
          >
            {numericOptions.map((key) => (
              <Option value={key} key={key}>
                {labels[key]}
              </Option>
            ))}
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
            defaultValue={selectedY as string}
            onChange={onSelectY as (value: string) => void}
          >
            {numericOptions.map((key) => (
              <Option value={key} key={key}>
                {labels[key]}
              </Option>
            ))}
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
            defaultValue={selectedColor as string}
            onChange={onSelectColor as (value: string) => void}
          >
            {stringOptions.map((key) => (
              <Option value={key} key={key}>
                {labels[key]}
              </Option>
            ))}
          </Select>
        </Space>
      </Col>
    </Row>
  );
};
