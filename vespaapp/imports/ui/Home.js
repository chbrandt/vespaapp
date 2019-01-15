import { Meteor } from 'meteor/meteor';
import React from 'react';

import './App.css';

import Header from './Header.js';
import Footer from './Footer.js';
import ListTargets from './ListTargets.js';

function Home() {
  const targets = [
    { name: 'Mars'},
    { name: 'Saturn'},
    { name: 'Venus'},
    { name: 'Sun#Earth'},
    { name: 'C/1991 Y1'},
    { name: 'Mercury'},
    { name: 'sun'},
  ]

  return (
    <div id="app">

      <Header />
      <ListTargets items={targets}/>
      <Footer />

    </div>
  );
}
export default Home;
