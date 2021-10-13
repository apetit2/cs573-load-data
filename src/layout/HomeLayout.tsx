import './HomeLayout.css';

import {
  AppleOutlined,
  DollarCircleOutlined,
  FireOutlined,
  MenuOutlined,
} from '@ant-design/icons';
import { Button, Drawer, Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import React, { useState } from 'react';

import { AppRouter } from '../AppRouter';
import { AppRoutes } from '../appRoutes';
import { Helmet } from 'react-helmet-async';
import { Loading } from '../components/Loading/Loading';

const { Content, Header } = Layout;
const { SubMenu } = Menu;

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
        <meta name="description" content={title} />
      </Helmet>
      <Layout style={{ minHeight: '100vh' }}>
        <Drawer
          bodyStyle={{ backgroundColor: '#001628' }}
          headerStyle={{
            border: 'none',
          }}
          title="Pages"
          width={250}
          placement="left"
          visible={collapsed}
          onClose={() => setCollapsed(false)}
        >
          <Menu theme="dark" selectedKeys={[selectedTab]} mode="inline">
            <SubMenu
              key="1"
              icon={<DollarCircleOutlined />}
              title={MIN_WAGE_TITLE}
            >
              <Menu.Item key="Min-Wage-Scatter-Plot">
                <Link to={AppRoutes.MinimumWageScatterPlot}>Scatter Plot</Link>
              </Menu.Item>
              <Menu.Item key="Min-Wage-Initial-Geospatial">
                <Link to={AppRoutes.MinimumWageGeospatialChart}>
                  Geospatial Chart (Initial)
                </Link>
              </Menu.Item>
              <Menu.Item key="Min-Wage-Iterated-Geospatial">
                <Link to={AppRoutes.MinimumWageGeospatialChartIterated}>
                  Geospatial Chart (Iterated)
                </Link>
              </Menu.Item>
              <Menu.Item key="Min-Wage-Line-Chart">
                <Link to={AppRoutes.MinimumWageLineChart}>Line Chart</Link>
              </Menu.Item>
              <Menu.Item key="Min-Wage-Dataset">
                <Link to={AppRoutes.MinimumWageDatasetInfo}>
                  Dataset Information
                </Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="2" icon={<AppleOutlined />} title={AVOCADO_TITLE}>
              <Menu.Item key="Avocado-Scatter-Plot">
                <Link to={AppRoutes.AvocadoScatterPlot}>Scatter Plot</Link>
              </Menu.Item>
              <Menu.Item key="Avocado-Dataset">
                <Link to={AppRoutes.AvocadoDatasetInfo}>
                  Dataset Information
                </Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="3" icon={<FireOutlined />} title={HURRICANE_TITLE}>
              <Menu.Item key="Hurricane-Scatter-Plot">
                <Link to={AppRoutes.HurricaneScatterPlot}>Scatter Plot</Link>
              </Menu.Item>
              <Menu.Item key="Hurricane-Geospatial">
                <Link to={AppRoutes.HurricaneGeospatialChart}>
                  Geospatial Chart
                </Link>
              </Menu.Item>
              <Menu.Item key="Hurricane-Dataset">
                <Link to={AppRoutes.HurricaneDatasetInfo}>
                  Dataset Information
                </Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Drawer>
        <Layout>
          <Header>
            <Button type="primary" onClick={() => setCollapsed(!collapsed)}>
              <MenuOutlined />
            </Button>
          </Header>
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
