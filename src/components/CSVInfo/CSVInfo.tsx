import { Space, Typography } from 'antd';

const { Text } = Typography;

export interface CSVInfoProps {
  dataSetName: string;
  dataSetSize: number;
  numOfRows: number;
  numOfCols: number;
  titleStyle?: React.CSSProperties;
  bodyStyle?: React.CSSProperties;
}

export const CSVInfo: React.FC<CSVInfoProps> = ({
  dataSetName,
  dataSetSize,
  numOfRows,
  numOfCols,
  titleStyle,
  bodyStyle,
}) => {
  return (
    <Space size="small" direction="vertical">
      <Text strong style={titleStyle}>
        {dataSetName} CSV Characteristics
      </Text>
      <Text style={bodyStyle}>Size: {dataSetSize} KB</Text>
      <Text style={bodyStyle}>Number of Rows: {numOfRows}</Text>
      <Text style={bodyStyle}>Number of Columns: {numOfCols}</Text>
    </Space>
  );
};
