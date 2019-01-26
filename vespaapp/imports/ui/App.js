import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import Header from './Header.js';
import Map from './Map.js';
import Lst from './List.js';

import { DataGeo } from '../api/collections/data_geo.js';
import { DataAny } from '../api/collections/data_any.js';


function App({ target, isBody, features, granules }) {
  const items = granules.concat(features.polygons, features.points);
  return (
    <div id="app">

      <Header />
      <main className="container-fluid">
        {isBody ?
          <Map body={target} features={features} />
          : ''
        }
        <Lst target={target} items={items} />
      </main>

    </div>
  );
}

export default withTracker( ({ target, isBody }) => {
  target = target.toLowerCase();

  // Get data from the collection with geolocated data, use Undefined when not apply
  var data_geo;
  if (isBody) {
    const h1 = Meteor.subscribe('data_geo', { target_name: target,
                                              bbox: Session.get('bbox') });
    data_geo = {
        points: DataGeo.find({ "geometry.type":"Point" }).fetch(),
        polygons: DataGeo.find({ "geometry.type":"Polygon" }).fetch(),
    };
  }
  const features = data_geo;

  // Get Data from the other collection, without particular geolocated information
  const h2 = Meteor.subscribe('data_any', { target_name: target });
  const granules = DataAny.find({}).fetch();

  return { features: features, granules: granules};
})(App);
