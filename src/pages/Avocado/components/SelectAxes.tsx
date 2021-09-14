import { AvocadoCol, AvocadoCols } from '../../../services/models/avocado';
import { Select, Space, Typography } from 'antd';

const { Text } = Typography;
const { Option } = Select;

export interface SelectAxesProps {
  selectedX: AvocadoCol;
  selectedY: AvocadoCol;
  selectedColor: AvocadoCol;
  onSelectX: (xAxis: AvocadoCol) => void;
  onSelectY: (yAxis: AvocadoCol) => void;
  onSelectColor: (color: AvocadoCol) => void;
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
            {(Object.keys(AvocadoCols) as AvocadoCol[]).map((key) => (
              <Option
                value={key}
                key={key}
                disabled={AvocadoCols[key].type !== 'number'}
              >
                {AvocadoCols[key].title}
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
            {(Object.keys(AvocadoCols) as AvocadoCol[]).map((key) => (
              <Option
                value={key}
                key={key}
                disabled={AvocadoCols[key].type !== 'number'}
              >
                {AvocadoCols[key].title}
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
            {(Object.keys(AvocadoCols) as AvocadoCol[]).map((key) => (
              <Option
                value={key}
                key={key}
                disabled={AvocadoCols[key].type !== 'string'}
              >
                {AvocadoCols[key].title}
              </Option>
            ))}
          </Select>
        </Space>
      </Space>
    </Space>
  );
};
