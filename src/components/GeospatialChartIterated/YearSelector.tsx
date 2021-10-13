import { Slider, Space, Switch, Typography } from 'antd';

const { Text } = Typography;

export interface YearSelectorProps {
  defaultYear: number;
  minYear: number;
  maxYear: number;
  incrementYearDisabled: boolean;
  onChange: (year: number) => void;
  toggleIncrementYear: (disable: boolean) => void;
}

export const YearSelector: React.FC<YearSelectorProps> = ({
  defaultYear,
  minYear,
  maxYear,
  incrementYearDisabled,
  onChange,
  toggleIncrementYear,
}) => {
  return (
    <Space style={{ width: '100%' }} direction="vertical">
      <Space
        direction="horizontal"
        style={{ justifyContent: 'space-between', width: '100%' }}
      >
        <Text strong>
          Select a Year: <Text style={{ color: 'green' }}>{defaultYear}</Text>
        </Text>
        <Space direction="horizontal" size="small">
          <Switch
            onChange={(val) => toggleIncrementYear(!val)}
            checked={!incrementYearDisabled}
          />
          <Text strong>
            {incrementYearDisabled ? 'Enable' : 'Disable'} Auto Increment
          </Text>
        </Space>
      </Space>
      <Slider
        min={minYear}
        max={maxYear}
        value={defaultYear}
        onChange={onChange}
      />
    </Space>
  );
};
