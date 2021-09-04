import './index.css';

import { QueryClient, QueryClientProvider } from 'react-query';

import { Avocado } from './pages/Avocado';
import { Hurricane } from './pages/Hurricane';
import { MinimumWage } from './pages/MinimumWage';
import React from 'react';
import ReactDOM from 'react-dom';
import { Tabs } from 'antd';
import reportWebVitals from './reportWebVitals';

const { TabPane } = Tabs;

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Tabs defaultActiveKey="1" className="data-tabs">
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
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
