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

function App({notes, features, currentUser}) {
  return (
      <div id="app">

        <Header />

        <main>
          <Map features={features}/>
          <List items={features.points.concat(features.lineStrings,
                                              features.polygons)}
                currentUser={currentUser}
          />
        </main>

        <Footer />

      </div>
  );
}

export default withTracker( ( {body} ) => {
  const handle = [
    Meteor.subscribe('notes'),
    Meteor.subscribe(body, { mapBounds: Session.get('mapBounds') })
  ];
  return {
    notes: Notes.find({}).fetch(),
    features: {
      points: Mars.find({"geometry.type":"Point"}, { sort : { "name" : 1 }}).fetch(),
      lineStrings: Mars.find({"geometry.type":"LineString"}, { sort : { "name" : 1 }}).fetch(),
      polygons: Mars.find({"geometry.type":"Polygon"}, { sort : { "name" : 1 }}).fetch()
    },
    currentUser: Meteor.user()
  };
})(App);
