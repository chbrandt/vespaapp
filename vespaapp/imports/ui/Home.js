import { Meteor } from 'meteor/meteor';
import React from 'react';

import './App.css';

import Header from './Header.js';
import Footer from './Footer.js';
// import ListTargets from './ListTargets.js';

function Home({notes, features, currentUser}) {
  return (
    <div id="app">

      <Header />

      <div className="card">
        <a href="/mars" className="card-body">
          <div className="row">
            <div className="col-12">
              <h3>Mars</h3>
            </div>
          </div>
        </a>
      </div>
      <Footer />

    </div>
  );
}
export default Home;
