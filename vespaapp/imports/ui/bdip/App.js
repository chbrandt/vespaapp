
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';

// import { Notes } from '../api/notes.js';
import { DataNG } from '../../api/data_bdip.js';

import './App.css';

import Header from '../Header.js';
import ListBdip from './List.js';


function AppBdip({ body, items }) {
  return (
    <div id="app">

      <Header />
      <ListBdip items={items} />

    </div>
  );
}

export default withTracker( ({ body }) => {

  const handle = [
    Meteor.subscribe('bdip', { body: body }),
  ];
  console.log("Number of 'non-geometric' "+body+" records: " + DataNG.find().count());
  return {
    // items: DataNG.find({ "target": "/^"+body+"$/i" },
    //                    { sort : { "name" : 1 } }).fetch(),
    items: DataNG.find({}).fetch(),
  };
})(AppBdip);
