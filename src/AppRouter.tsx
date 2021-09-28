import { Redirect, Route, Switch } from 'react-router-dom';

import { AppRoutes } from './appRoutes';
import { NotFound } from './pages/NotFound';
import { lazy } from 'react';

const MinimumWage = lazy(() => import('./pages/MinimumWagePage'));
const Avocado = lazy(() => import('./pages/Avocado'));
const Hurricane = lazy(() => import('./pages/Hurricane'));
const CSVInfoPage = lazy(() => import('./pages/CSVInfoPage'));

export const AppRouter: React.FC = () => (
  <Switch>
    <Route exact path={AppRoutes.Home}>
      <Redirect
        to={AppRoutes.MinimumWage.replace(':plotType', 'scatter-plot')}
      />
    </Route>
    <Route exact path={AppRoutes.MinimumWage} component={MinimumWage} />
    <Route exact path={AppRoutes.Avocado} component={Avocado} />
    <Route exact path={AppRoutes.Hurricane} component={Hurricane} />
    <Route exact path={AppRoutes.CSVInfo} component={CSVInfoPage} />
    <Route component={NotFound} />
  </Switch>
);
