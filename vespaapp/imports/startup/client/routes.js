import React from 'react';
import { Router, Route, Switch } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

// route components
import Home from '../../ui/Home.js';
import App from '../../ui/App.js';
import NotFoundPage from '../../ui/NotFoundPage.js';

const browserHistory = createBrowserHistory();

export const renderRoutes = (targets) => (
  <Router history={browserHistory}>
    <Switch>
      <Route exact path="/" component={Home}/>
      {renderBodyRoutes(targets)}
      <Route component={NotFoundPage}/>
    </Switch>
  </Router>
);

function renderBodyRoutes(targets) {
  return targets.map((target) => {
    const targetName = target.name.toLowerCase();
    const targetPath = "/" + targetName;
    return (
      <Route exact path={targetPath}
        render={props => <App {...props} target={targetName} data_selector={target.filter} isBody={target.hasMap}/>}
        key={targetName}
      />
    );
  });
}
