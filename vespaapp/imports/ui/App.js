import React from 'react';

import Mapp from './Map.js';

import List from './List.js';

import { Session } from 'meteor/session';

import { withTracker } from 'meteor/react-meteor-data';

import { Mars } from '../api/data.js';

import './App.css';

function App({ dataLoading, points }) {
  return (
      <div id="app_layout">
        <header>
          VESPA:app
        </header>
        <main>
          <Mapp />
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
    // onReady: mapCallback()
  });
  return {
    dataLoading: !handle.ready(),
    points: Mars.find({}).fetch(),
  };
})(App);
