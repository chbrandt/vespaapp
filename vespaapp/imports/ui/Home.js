import { Meteor } from 'meteor/meteor';
import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import { DataIndex } from '../api/collections/data_index.js';

import Header from './Header.js';
import ListTargets from './ListTargets.js';


/*
  The index of data targets is a set of objects representing the list top-level
  targets in the Home page (to which the user has direct (visual/click) access).
  Inside these "targets" objects, the content is that to make them searchable.

  TODO: If the user searches here for "Arabia Terra", what will be filtered and
  shown to him is "Mars" -- the target --, which is the "button" he will click.
  As a concequence, the Mars page will be loaded. But instead of loading everything,
  the data loaded in the Mars page should be filtered for "Arabia Terra". Which
  is to say that the search term ("Arabia Terra") should go to the new page ("Mars").

  The data set to feed this component is being called 'data_index'.
  The Data-Index must provide searchable information for the "targets", such
  information must be related to the data sets that will be available in the
  following data exploration pages.
  Relevant information for the data exploration are:
  * target-name ("Europa", under "Jupiter" or "moons", for example)
  * target-class ("planet")
  * dataproduct ("image", "datacube", "spectra", "footprint")
  * service-name ("crism" or "bdip", for example)
  * dataset-title
*/
function Home({ data_index }) {
  return (
    <div id="app">
      <Header />
      <ListTargets items={data_index}/>
    </div>
  );
}

export default withTracker(() => {
    const handle = Meteor.subscribe('data_index');
    return (
      {
        data_index: DataIndex.find().fetch()
      }
    );
})(Home);
