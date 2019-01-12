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
      <Main notes={notes} features={features} currentUser={currentUser}/>
      <Footer />

    </div>
  );
}

export default withTracker( ( {body} ) => {
  const handle = [
    Meteor.subscribe('notes', {}, function() {
      console.log("Number of notes: " + Notes.find({}).fetch().length)
    }),
    Meteor.subscribe(body, { mapBounds: Session.get('mapBounds') }, function() {
      console.log("Number of items: " + Mars.find({}).fetch().length)
    })
  ];
  var notes = Notes.find({}).fetch();

  return {
    notes: notes,
    features: {
      points: Mars.find({"geometry.type":"Point"}, { sort : { "name" : 1 }}).fetch(),
      lineStrings: Mars.find({"geometry.type":"LineString"}, { sort : { "name" : 1 }}).fetch(),
      polygons: Mars.find({"geometry.type":"Polygon"}, { sort : { "name" : 1 }}).fetch()
    },
    currentUser: Meteor.user()
  };
})(App);


function Main({notes, features, currentUser}) {
  return (
    <main className="container-fluid">
      <Map features={features}/>
      <List items={features.points.concat(features.lineStrings,
                                          features.polygons)}
            currentUser={currentUser}
            notes={notes}
      />
    </main>
  );
}
