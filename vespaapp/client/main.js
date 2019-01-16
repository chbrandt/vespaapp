import { Meteor } from 'meteor/meteor';
// import React from 'react';
import ReactDOM from 'react-dom';
import { renderRoutes } from '../imports/startup/client/routes.js';

// Load Planetary data interface
import '../imports/api/data.js';
// import '../imports/api/datang.js';
// Load User data interface
import '../imports/api/notes.js';

import '../imports/startup/accounts-config.js';

Meteor.startup(() => {
  var bodies = ['mars'];
  // ReactDOM.render(<App body={'mars'} />, document.getElementById("render-target"));
  ReactDOM.render(renderRoutes(bodies), document.getElementById("render-target"));
});
