import { Typography } from 'antd';

const { Text } = Typography;

export interface NotFoundProps {}

export const NotFound: React.FC<NotFoundProps> = () => {
  return <Text>Not Found</Text>;
};
