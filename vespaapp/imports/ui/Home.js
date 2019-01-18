import { Meteor } from 'meteor/meteor';
import React from 'react';

// import './App.css';

import Header from './Header.js';
import Footer from './Footer.js';
import ListTargets from './ListTargets.js';

function Home() {
  const targets = [
    { name: 'Mars', thumbnail: "https://space-facts.com/wp-content/uploads/mars-transparent.png"},
    // { name: 'Saturn'},
    { name: 'Mercury', thumbnail: "https://space-facts.com/wp-content/uploads/mercury-transparent.png"},
    { name: 'Venus', thumbnail: "https://space-facts.com/wp-content/uploads/venus-transparent.png"},
    { name: 'Jupiter', thumbnail: "https://space-facts.com/wp-content/uploads/jupiter-transparent.png"},
    { name: 'Saturn', thumbnail: "https://space-facts.com/wp-content/uploads/saturn-transparent.png"},
    // { name: 'Sun#Earth'},
    // { name: 'C/1991 Y1'},
    // { name: 'Mercury'},
    // { name: 'sun'},
    // { name: 'Crism'},
    // { name: 'Bdip'},
  ]

  return (
    <div id="app">

      <Header />
      <ListTargets items={targets}/>

    </div>
  );
}
export default Home;
