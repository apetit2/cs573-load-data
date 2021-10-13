import { Slider, Space, Typography } from 'antd';

const { Text } = Typography;

export interface YearSelectorProps {
  minYear: number;
  maxYear: number;
  onChange: (year: number) => void;
}

export const YearSelector: React.FC<YearSelectorProps> = ({
  minYear,
  maxYear,
  onChange,
}) => {
  return (
    <Space style={{ width: '100%' }} direction="vertical">
      <Text strong>Select Date:</Text>
      <Slider min={minYear} max={maxYear} onAfterChange={onChange} />
    </Space>
  );
};
