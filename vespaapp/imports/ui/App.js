import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';

import { Notes } from '../api/notes.js';
import { Mars } from '../api/data.js';

import './App.css';

import Header from './Header.js';
import Map from './Map.js';
import List from './List.js';
import Footer from './Footer.js';

function App({ points }) {
  return (
      <div id="app">

        <Header />

        <main>
          <Map dataPoints={points}/>
          <List dataPoints={points}/>
        </main>

        <Footer />

      </div>
  );
}

export default withTracker( ( {body} ) => {
  const handle = [
    Meteor.subscribe('notes'),
    Meteor.subscribe(body, {
      mapBounds: Session.get('mapBounds')
    })
  ];
  return {
    points: Mars.find({}).fetch(),
  };
})(App);
