import { Space, Spin } from 'antd';

export const Loading: React.FC = () => (
  <Space
    align="center"
    direction="horizontal"
    style={{
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      paddingTop: 100,
    }}
  >
    <Spin tip="Loading..." />
  </Space>
);
