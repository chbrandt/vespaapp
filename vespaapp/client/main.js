import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';

import { renderRoutes } from '../imports/startup/client/routes.js';

import { DataIndex } from '../imports/api/collections/data_index.js';

// import '../imports/startup/accounts-config.js';

Meteor.startup(() => {
  Meteor.subscribe('data_index', () => {
    const targets = DataIndex.find().fetch();
    ReactDOM.render(renderRoutes(targets), document.getElementById("render-target"));
  })
});
