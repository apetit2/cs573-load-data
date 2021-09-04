import { useEffect, useState } from 'react';

import { Avocado } from './pages/Avocado';
import { Helmet } from 'react-helmet-async';
import { Hurricane } from './pages/Hurricane';
import { MinimumWage } from './pages/MinimumWage';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

const MIN_WAGE_TITLE = 'Minimum Wage Data';
const AVOCADO_TITLE = 'Avocado Data';
const HURRICANE_TITLE = 'Hurricane Data';

export interface DataTabsProps {}

export const DataTabs: React.FC<DataTabsProps> = () => {
  const [selectedTab, setSelectedTab] = useState('1');
  const [title, setTitle] = useState(MIN_WAGE_TITLE);

  useEffect(() => {
    switch (selectedTab) {
      case '1':
        setTitle(MIN_WAGE_TITLE);
        break;
      case '2':
        setTitle(AVOCADO_TITLE);
        break;
      case '3':
        setTitle(HURRICANE_TITLE);
        break;
      default:
        setTitle(MIN_WAGE_TITLE);
    }
  }, [selectedTab]);

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Tabs
        defaultActiveKey="1"
        className="data-tabs"
        onChange={(activeKey) => setSelectedTab(activeKey)}
      >
        <TabPane tab="Minimum Wage Data" key="1">
          <MinimumWage />
        </TabPane>
        <TabPane tab="Avocado Data" key="2">
          <Avocado />
        </TabPane>
        <TabPane tab="Hurricane Data" key="3">
          <Hurricane />
        </TabPane>
      </Tabs>
    </>
  );
};
