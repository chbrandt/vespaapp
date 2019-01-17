import { Meteor } from 'meteor/meteor';
import React from 'react';

import './App.css';

import Header from './Header.js';
import Footer from './Footer.js';
import ListTargets from './ListTargets.js';

function Home() {
  const targets = [
    { name: 'Mars', thumbnail: "https://space-facts.com/wp-content/uploads/mars-transparent.png"},
    // { name: 'Saturn'},
    { name: 'Venus', thumbnail: "https://space-facts.com/wp-content/uploads/venus-transparent.png"},
    // { name: 'Sun#Earth'},
    // { name: 'C/1991 Y1'},
    // { name: 'Mercury'},
    // { name: 'sun'},
    { name: 'images'},
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
