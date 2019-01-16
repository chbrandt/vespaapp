import React from 'react';
import { Router, Route, Switch } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

// route components
import Home from '../../ui/Home.js';
import App from '../../ui/App.js';
import AppImages from '../../ui/AppImages.js';
// import NotFoundPage from '../../ui/pages/NotFoundPage.js';

const browserHistory = createBrowserHistory();

export const renderRoutes = (bodies) => (
  <Router history={browserHistory}>
    <Switch>
      <Route exact path="/" component={Home}/>
      {renderBodyRoutes(bodies)}
    </Switch>
  </Router>
);
      // <Route component={NotFoundPage}/>

function renderBodyRoutes(bodies) {
  var routes = bodies.map((body) => {
    var bodyPath = "/" + body;
    return (
      <Route exact path={bodyPath} render={props => <App {...props} body={body}/>}
             key={body}
      />
    );
  });
  routes.push(<Route exact path='/images' render={props => <AppImages {...props} body='jupiter'/>}
         key={'jupiter'}/>);
  return routes;
}
