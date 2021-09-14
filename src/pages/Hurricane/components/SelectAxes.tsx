import {
  HurricaneCol,
  HurricaneCols,
} from '../../../services/models/hurricane';
import { Select, Space, Typography } from 'antd';

const { Text } = Typography;
const { Option } = Select;

export interface SelectAxesProps {
  selectedX: HurricaneCol;
  selectedY: HurricaneCol;
  selectedColor: HurricaneCol;
  onSelectX: (xAxis: HurricaneCol) => void;
  onSelectY: (yAxis: HurricaneCol) => void;
  onSelectColor: (color: HurricaneCol) => void;
}

export const SelectAxes: React.FC<SelectAxesProps> = ({
  selectedX,
  selectedY,
  selectedColor,
  onSelectX,
  onSelectY,
  onSelectColor,
}) => {
  return (
    <Space direction="vertical" size="large">
      <Space direction="horizontal" size="middle">
        <Space direction="vertical" size="small">
          <Text strong style={{ fontSize: 12 }}>
            X Axis:
          </Text>
          <Select
            style={{ width: 150 }}
            defaultValue={selectedX}
            onChange={onSelectX}
          >
            {(Object.keys(HurricaneCols) as HurricaneCol[]).map((key) => (
              <Option
                value={key}
                key={key}
                disabled={HurricaneCols[key].type !== 'number'}
              >
                {HurricaneCols[key].title}
              </Option>
            ))}
          </Select>
        </Space>
        <Space direction="vertical" size="small">
          <Text strong style={{ fontSize: 12 }}>
            Y Axis:
          </Text>
          <Select
            style={{ width: 150 }}
            defaultValue={selectedY}
            onChange={onSelectY}
          >
            {(Object.keys(HurricaneCols) as HurricaneCol[]).map((key) => (
              <Option
                value={key}
                key={key}
                disabled={HurricaneCols[key].type !== 'number'}
              >
                {HurricaneCols[key].title}
              </Option>
            ))}
          </Select>
        </Space>
      </Space>
      <Space direction="horizontal" size="middle">
        <Space direction="vertical" size="small">
          <Text strong style={{ fontSize: 12 }}>
            Color:
          </Text>
          <Select
            style={{ width: 150 }}
            defaultValue={selectedColor}
            onChange={onSelectColor}
          >
            {(Object.keys(HurricaneCols) as HurricaneCol[]).map((key) => (
              <Option
                value={key}
                key={key}
                disabled={HurricaneCols[key].type !== 'string'}
              >
                {HurricaneCols[key].title}
              </Option>
            ))}
          </Select>
        </Space>
      </Space>
    </Space>
  );
};
