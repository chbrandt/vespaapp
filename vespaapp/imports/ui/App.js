import React from 'react';
import Map from './Map.js';
import List from './List.js';

import './App.css';

function App() {
  return (
      <div id="app_layout">
        <header>
          Vespa::App
        </header>
        <Map />
        <List />
        <footer>
          Vespa::App
        </footer>
      </div>
  );
}
export default App;
