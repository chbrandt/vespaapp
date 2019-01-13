import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';

import { Notes } from '../api/notes.js';
import { Data } from '../api/data.js';

import './App.css';

import Header from './Header.js';
import Map from './Map.js';
import List from './List.js';
import Footer from './Footer.js';

function App({body, notes, features, currentUser}) {
  return (
    <div id="app">

      <Header />
      <Main body={body} notes={notes} features={features} currentUser={currentUser}/>
      <Footer />

    </div>
  );
}

export default withTracker( ( {body} ) => {
  // var body = extra;
  console.log("Body value: '"+body+"'");

  const handle = [
    Meteor.subscribe('notes', {}, function() {
      console.log("Number of notes: " + Notes.find({}).fetch().length)
    }),
    Meteor.subscribe('mdb', { body: body, mapBounds: Session.get('mapBounds') }, function() {
      console.log("Number of items: " + Data.find({}).fetch().length)
    })
  ];
  var notes = Notes.find({}).fetch();

  return {
    notes: notes,
    currentUser: Meteor.user(),
    features: {
      points: Data.find({ "target": body,
                          "geometry.type":"Point" },
                        { sort : { "name" : 1 } }).fetch(),
      polygons: Data.find({ "target": body,
                            "geometry.type":"Polygon" },
                          { sort : { "name" : 1 } }).fetch(),
      lineStrings: Data.find({ "target": body,
                               "geometry.type":"LineString" },
                             { sort : { "name" : 1 } }).fetch(),
    },
  };
})(App);


function Main({body, notes, features, currentUser}) {
  return (
    <main className="container-fluid">
      <Map body={body} features={features}/>
      <List items={features.points.concat(features.lineStrings,
                                          features.polygons)}
            currentUser={currentUser}
            notes={notes}
      />
    </main>
  );
}
