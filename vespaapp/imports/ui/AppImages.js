
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';

// import { Notes } from '../api/notes.js';
import { DataNG } from '../api/datang.js';

import './App.css';

import Header from './Header.js';
import ListImages from './ListImages.js';
import Footer from './Footer.js';


function App({ body, items }) {
  return (
    <div id="app">

      <Header />
      <ListImages items={items} />
      <Footer />

    </div>
  );
}

export default withTracker( ({ body }) => {

  const handle = [
    Meteor.subscribe('no_geometry', { body: body }),
  ];
  console.log("Number of 'non-geometric' "+body+" records: " + DataNG.find().count());
  return {
    // items: DataNG.find({ "target": "/^"+body+"$/i" },
    //                    { sort : { "name" : 1 } }).fetch(),
    items: DataNG.find({}).fetch(),
  };
})(App);
