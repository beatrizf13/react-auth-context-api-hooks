import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { useAuth } from '../contexts/auth';

import Dashboard from '../pages/Dashboard';

const AppRoutes: React.FC = () => {
  const { signed } = useAuth();

  return (
    <Switch>
      <Route path="/dashboard" component={Dashboard} />
      <Route
        path="*"
        component={
          signed
            ? () => <Redirect to="/dashboard" />
            : () => <Redirect to="/" />
        }
      />
    </Switch>
  );
};

export default AppRoutes;
