import React from 'react';

import Map from './Map.js';
// 'mapCallback' is not being use right now, it's just a placeholder for my memory
import { mapCallback } from './Map.js';

import List from './List.js';

import { Session } from 'meteor/session';

import { withTracker } from 'meteor/react-meteor-data';

import { Mars } from '../api/data.js';

import './App.css';

function App({ dataLoading, points }) {
  return (
      <div id="app_layout">
        <header>
          <h1>
            VESPA.<i>app</i>
          </h1>
        </header>
        <main>
          <Map dataPoints={points}/>
          <List dataPoints={points}/>
        </main>
        <footer>
          <i>footnotes</i>
        </footer>
      </div>
  );
}
// export default App;

export default withTracker(() => {
  const handle = Meteor.subscribe('mars', {
    mapBounds: Session.get('mapBounds'),
    onReady: mapCallback()
  });
  return {
    dataLoading: !handle.ready(),
    points: Mars.find({}).fetch(),
  };
})(App);
