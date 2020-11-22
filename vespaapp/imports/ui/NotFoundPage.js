import { Meteor } from 'meteor/meteor';
import React from 'react';

import Header from './Header.js';

export default function NotFoundPage() {
  return (
    <div id="app">
      <Header />
      <div className="container">
        <h2>Page not found</h2>
      </div>
    </div>
  );
}
