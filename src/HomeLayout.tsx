import {
  AppleOutlined,
  DollarCircleOutlined,
  FireOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import React, { useState } from 'react';

import { AppRouter } from './AppRouter';
import { AppRoutes } from './appRoutes';
import { Helmet } from 'react-helmet-async';
import { Loading } from './components/Loading/Loading';

const { Sider, Content } = Layout;

const MIN_WAGE_TITLE = 'Minimum Wage Data';
const AVOCADO_TITLE = 'Avocado Data';
const HURRICANE_TITLE = 'Hurricane Data';

export interface HomeLayoutProps {}

export const HomeLayout: React.FC<HomeLayoutProps> = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  let selectedTab: string;
  let title: string;
  if (location.pathname.includes('hurricane')) {
    selectedTab = '3';
    title = HURRICANE_TITLE;
  } else if (location.pathname.includes('avocado')) {
    selectedTab = '2';
    title = AVOCADO_TITLE;
  } else {
    selectedTab = '1';
    title = MIN_WAGE_TITLE;
  }

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
          <Menu theme="dark" defaultSelectedKeys={[selectedTab]}>
            <Menu.Item key="1" icon={<DollarCircleOutlined />}>
              <Link to={AppRoutes.MinimumWage}>{MIN_WAGE_TITLE}</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<AppleOutlined />}>
              <Link to={AppRoutes.Avocado}>{AVOCADO_TITLE}</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<FireOutlined />}>
              <Link to={AppRoutes.Hurricane}>{HURRICANE_TITLE}</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <React.Suspense fallback={<Loading />}>
            <Content style={{ margin: '16px 16px' }}>
              <AppRouter />
            </Content>
          </React.Suspense>
        </Layout>
      </Layout>
    </>
  );
};
