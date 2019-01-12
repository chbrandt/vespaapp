import React from 'react';
import { Router, Route, Switch } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

// route components
import Home from '../../ui/Home.js';
import App from '../../ui/App.js';
// import AppContainer from '../../ui/containers/AppContainer.js';
// import ListPageContainer from '../../ui/containers/ListPageContainer.js';
// import AuthPageSignIn from '../../ui/pages/AuthPageSignIn.js';
// import AuthPageJoin from '../../ui/pages/AuthPageJoin.js';
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
      // <Route exact path="/lists/:id" component={ListPageContainer}/>
      // <Route exact path="/signin" component={AuthPageSignIn}/>
      // <Route exact path="/join" component={AuthPageJoin}/>
      // <Route component={NotFoundPage}/>

function renderBodyRoutes(bodies) {
  return bodies.map((body) => {
    return (
      <Route exact path={body} component={App} key={body}/>
    );
  })
}
