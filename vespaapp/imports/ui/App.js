import React from 'react';
import Map from './Map.js';
import List from './List.js';

import './App.css';

function App() {
  return (
      <div id="app_layout">
        <header>
          VESPA:app
        </header>
        <main>
          <Map />
          <List />
        </main>
        <footer>
          <i>footnotes</i>
        </footer>
      </div>
  );
}
export default App;
