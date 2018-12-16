import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';

import '../imports/api/data.js';

import App from '../imports/ui/App.js';

Meteor.startup(() => {
  ReactDOM.render(<App />, document.getElementById("render-target"));
});
