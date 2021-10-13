import { Redirect, Route, Switch } from 'react-router-dom';

import { AppRoutes } from './appRoutes';
import { NotFound } from './pages/NotFound';
import { lazy } from 'react';

// minimum wage pages
const MinimumWageScatterPlot = lazy(
  () => import('./pages/MinimumWage/ScatterPlotPage')
);
const MinimumWageGeospatialChart = lazy(
  () => import('./pages/MinimumWage/GeospatialChartPage')
);
const MinimumWageGeospatialChartIterated = lazy(
  () => import('./pages/MinimumWage/GeospatialChartIteratedPage')
);
const MinimumWageLineChart = lazy(
  () => import('./pages/MinimumWage/LineChartPage')
);
const MinimumWageLineChartLookUp = lazy(
  () => import('./pages/MinimumWage/LineChartLookUpPage')
);
const MinimumWageInfo = lazy(() => import('./pages/MinimumWage/CSVInfoPage'));

// avocado pages
const AvocadoScatterPlot = lazy(
  () => import('./pages/Avocado/ScatterPlotPage')
);
const AvocadoInfo = lazy(() => import('./pages/Avocado/CSVInfoPage'));

// hurricane pages
const HurricaneScatterPlot = lazy(
  () => import('./pages/Hurricane/ScatterPlotPage')
);
const HurricaneGeospatialChart = lazy(
  () => import('./pages/Hurricane/GeospatialChartPage')
);
const HurricaneInfo = lazy(() => import('./pages/Hurricane/CSVInfoPage'));

export const AppRouter: React.FC = () => (
  <Switch>
    <Route exact path={AppRoutes.Home}>
      <Redirect to={AppRoutes.MinimumWageScatterPlot} />
    </Route>
    <Route
      exact
      path={AppRoutes.MinimumWageScatterPlot}
      component={MinimumWageScatterPlot}
    />
    <Route
      exact
      path={AppRoutes.MinimumWageGeospatialChartIterated}
      component={MinimumWageGeospatialChartIterated}
    />
    <Route
      exact
      path={AppRoutes.MinimumWageGeospatialChart}
      component={MinimumWageGeospatialChart}
    />
    <Route
      exact
      path={AppRoutes.MinimumWageLineChartLookUp}
      component={MinimumWageLineChartLookUp}
    />
    <Route
      exact
      path={AppRoutes.MinimumWageLineChart}
      component={MinimumWageLineChart}
    />
    <Route
      exact
      path={AppRoutes.MinimumWageDatasetInfo}
      component={MinimumWageInfo}
    />
    <Route
      exact
      path={AppRoutes.AvocadoScatterPlot}
      component={AvocadoScatterPlot}
    />
    <Route exact path={AppRoutes.AvocadoDatasetInfo} component={AvocadoInfo} />
    <Route
      exact
      path={AppRoutes.HurricaneScatterPlot}
      component={HurricaneScatterPlot}
    />
    <Route
      exact
      path={AppRoutes.HurricaneGeospatialChart}
      component={HurricaneGeospatialChart}
    />
    <Route
      exact
      path={AppRoutes.HurricaneDatasetInfo}
      component={HurricaneInfo}
    />
    <Route component={NotFound} />
  </Switch>
);
