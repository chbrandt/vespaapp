import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import { Notes } from '../api/notes.js';
import { Data, data_collection_name } from '../api/data.js';

import './App.css';

import Header from './Header.js';
import Map from './Map.js';
import List from './List.js';
import Footer from './Footer.js';


function App({ body, notes, features, currentUser }) {
  return (
    <div id="app">

      <Header />
      <Main body={body} notes={notes} features={features} currentUser={currentUser}/>
      <Footer />

    </div>
  );
}

export default withTracker( ({ body }) => {

  const handle = [
    Meteor.subscribe(data_collection_name, { body: body,
                                             bbox: Session.get('bbox') }),
    Meteor.subscribe('notes', {}, function() {
      console.log("Number of notes: " + Notes.find({}).fetch().length)
    }),
  ];

  return {
    currentUser: Meteor.user(),
    notes: Notes.find({ "target": body,
                        owner: Meteor.userId() }).fetch(),
    features: {
      // points: Data.find({ "target": body,
      //                     "geometry.type":"Point" },
      //                   { sort : { "name" : 1 } }).fetch(),
      // polygons: Data.find({ "target_name": 'Mars',
      //                       "s_region.type":"Polygon" },
      //                     { sort : { "obs_id" : 1 } }).fetch(),
      polygons: Data.find({ "target": 'mars',
                            "geometry.type":"Polygon" },
                          { sort : { "id" : 1 } }).fetch(),
      // lineStrings: Data.find({ "target": body,
      //                          "geometry.type":"LineString" },
      //                        { sort : { "name" : 1 } }).fetch(),
    },
  };
})(App);


function Main({ body, notes, features, currentUser }) {
  return (
    <main className="container-fluid">
      <Map body={body} features={features}/>
      {/*
      <List items={features.polygons}
            target={body}
            notes={notes}
      />*/}
    </main>
  );
}
