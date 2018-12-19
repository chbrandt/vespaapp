import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

// Load Planetary data interface
import '../imports/api/data.js';
// Load User data interface
import '../imports/api/notes.js';

import '../imports/startup/accounts-config.js';

import App from '../imports/ui/App.js';

Meteor.startup(() => {
  ReactDOM.render(<App body={'mars'} />, document.getElementById("render-target"));
});
