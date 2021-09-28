import { Slider, Space, Switch, Typography } from 'antd';

const { Text } = Typography;

export interface BetterYearSelectorProps {
  defaultYear: number;
  minYear: number;
  maxYear: number;
  incrementYearDisabled: boolean;
  onChange: (year: number) => void;
  toggleIncrementYear: (disable: boolean) => void;
}

export const BetterYearSelector: React.FC<BetterYearSelectorProps> = ({
  defaultYear,
  minYear,
  maxYear,
  incrementYearDisabled,
  onChange,
  toggleIncrementYear,
}) => {
  // console.log(defaultYear);

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
