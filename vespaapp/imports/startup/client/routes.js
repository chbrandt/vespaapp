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
      {/*<Route exact path='/mars' render={props => <AppCrism {...props} body='mars'/>} key={'MarsCrism'}/>
      <Route exact path='/venus' render={props => <AppBdip {...props} body='venus'/>} key={'bdipVenus'}/>
      <Route exact path='/jupiter' render={props => <AppBdip {...props} body='jupiter'/>} key={'bdipJupiter'}/>
      <Route exact path='/mercury' render={props => <AppBdip {...props} body='mercury'/>} key={'bdipMercury'}/>
      <Route exact path='/saturn' render={props => <AppBdip {...props} body='saturn'/>} key={'bdipSaturn'}/>*/}
      <Route component={NotFoundPage}/>
    </Switch>
  </Router>
);

function renderBodyRoutes(targets) {
  return targets.map((target) => {
    const targetName = target.name.toLowerCase();
    const targetPath = "/" + targetName;
    console.log("Target path: " + targetPath);
    console.log("Has Map: " + target.hasMap);
    return (
      <Route exact path={targetPath}
              render={props => <App {...props} target={targetName} isBody={target.hasMap}/>}
              key={targetName}
      />
    );
  });
}
  // routes.push(<Route exact path='/bdip' render={props => <AppBdip {...props} body='venus'/>}
  //        key={'bdipVenus'}/>);
  //  routes.push(<Route exact path='/crism' render={props => <AppCrism {...props} body='mars'/>}
  //         key={'MarsCrism'}/>);
