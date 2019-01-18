import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';

// import { Notes } from '../api/notes.js';
import { DataCrism } from '../../api/data_crism.js';

// import './App.css';

import Header from '../Header.js';
import MapCrism from './Map.js';
import ListCrism from './List.js';
import Footer from '../Footer.js';


// http://vespa.obspm.fr/planetary/data/display/?resource_id=ivo://jacobsuni/crism/q/epn_core

function AppCrism({ body, notes, features, currentUser }) {
  return (
    <div id="app">

      <Header />
      <Main body={body} notes={notes} features={features} currentUser={currentUser}/>
      {/*<Footer />*/}

    </div>
  );
}

export default withTracker( ({ body }) => {
  const handle = [
    Meteor.subscribe('crism', { body: 'Mars', bbox: Session.get('bbox') }),
  ];

  return {
    currentUser: Meteor.user(),
    notes: [],
    features: {
      polygons: DataCrism.find({"geometry.type":"Polygon" }).fetch()
    },
  };
})(AppCrism);


function Main({ body, notes, features, currentUser }) {
  return (
    <main id="maincrism" >
      <MapCrism body={body} features={features}/>
      <ListCrism items={features.polygons}
            target={body}
            notes={notes}
      />
    </main>
  );
}
