import {
  MinimumWageCol,
  MinimumWageCols,
} from '../../../services/models/minimumWage';
import { Select, Space, Typography } from 'antd';

const { Text } = Typography;
const { Option } = Select;

export interface SelectAxesProps {
  selectedX: MinimumWageCol;
  selectedY: MinimumWageCol;
  selectedColor: MinimumWageCol;
  onSelectX: (xAxis: MinimumWageCol) => void;
  onSelectY: (yAxis: MinimumWageCol) => void;
  onSelectColor: (color: MinimumWageCol) => void;
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
            {(Object.keys(MinimumWageCols) as MinimumWageCol[]).map((key) => (
              <Option
                value={key}
                key={key}
                disabled={MinimumWageCols[key].type !== 'number'}
              >
                {MinimumWageCols[key].title}
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
            {(Object.keys(MinimumWageCols) as MinimumWageCol[]).map((key) => (
              <Option
                value={key}
                key={key}
                disabled={MinimumWageCols[key].type !== 'number'}
              >
                {MinimumWageCols[key].title}
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
            {(Object.keys(MinimumWageCols) as MinimumWageCol[]).map((key) => (
              <Option
                value={key}
                key={key}
                disabled={MinimumWageCols[key].type !== 'string'}
              >
                {MinimumWageCols[key].title}
              </Option>
            ))}
          </Select>
        </Space>
      </Space>
    </Space>
  );
};
