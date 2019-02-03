import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import './App.css';
import Header from './Header.js';
import Map from './Map.js';
import ListGranules from './ListGranules.js';

import { DataGeo } from '../api/collections/data_geo.js';
import { DataAny } from '../api/collections/data_any.js';
// import { Registry } from '../api/collections/registry.js';


function App({ target, isBody, features, granules }) {
  var items = granules;
  if (features) {
    items = items.concat(features.polygons, features.points);
  }

  var compHeight = 85;
  if (isBody) {
    compHeight = compHeight/2;
  }
  const style = {height: String(compHeight)+"vh"};

  return (
    <div id="app">

      <Header style={{height:'10vh'}}/>
      <main className="container-fluid">
        {isBody ?
          <Map body={target} features={features} style={style}/>
          : ''
        }
        <ListGranules target={target} items={items} style={style}/>
      </main>

    </div>
  );
}

export default withTracker( ({ data_selector, isBody }) => {
  data_selector = data_selector || {};
  console.log(data_selector);

  // Get data from the collection with geolocated data, use Undefined when not apply
  var data_geo;
  if (isBody) {
    const query = Object.assign({}, data_selector, { bbox: Session.get('bbox') });
    const h1 = Meteor.subscribe('data_geo', query,
                                onReady = function() {
                                  console.log("data_geo items: "+DataGeo.find().count())
                                }
                              );
    data_geo = {
        points: DataGeo.find({ "s_region.type":"Point" }).fetch(),
        polygons: DataGeo.find({ "s_region.type":"Polygon" }).fetch(),
    };
  }
  const features = data_geo;

  // Get Data from the other collection, without particular geolocated information
  const h2 = Meteor.subscribe('data_any', data_selector);
  const granules = DataAny.find({}).fetch();

  // const h3 = Meteor.subscribe('registry');
  // const services = Registry.find({ _id: "services" }).fetch();

  return { features: features, granules: granules};//, services: services};
})(App);
