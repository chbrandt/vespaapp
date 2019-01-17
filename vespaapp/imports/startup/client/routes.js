import React from 'react';
import { Router, Route, Switch } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

// route components
import Home from '../../ui/Home.js';
import App from '../../ui/App.js';
import AppBdip from '../../ui/bdip/App.js';
import AppCrism from '../../ui/crism/App.js';
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
  routes.push(<Route exact path='/bdip' render={props => <AppBdip {...props} body='venus'/>}
         key={'bdipVenus'}/>);
   routes.push(<Route exact path='/crism' render={props => <AppCrism {...props} body='mars'/>}
          key={'MarsCrism'}/>);
  return routes;
}
