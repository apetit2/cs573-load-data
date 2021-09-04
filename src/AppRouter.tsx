import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import { AppRoutes } from './appRoutes';
import { Avocado } from './pages/Avocado';
import { Hurricane } from './pages/Hurricane';
import { MinimumWage } from './pages/MinimumWage';
import { NotFound } from './pages/NotFound';

export const AppRouter: React.FC = () => (
  <Router basename={process.env.PUBLIC_URL}>
    <Switch>
      <Route exact path={AppRoutes.Home} component={MinimumWage} />
      <Route exact path={AppRoutes.MinimumWage} component={MinimumWage} />
      <Route exact path={AppRoutes.Avocado} component={Avocado} />
      <Route exact path={AppRoutes.Hurricane} component={Hurricane} />
      <Route component={NotFound} />
    </Switch>
  </Router>
);
