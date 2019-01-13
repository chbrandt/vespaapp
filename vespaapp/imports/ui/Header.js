import React from 'react';

import AccountsUIWrapper from './AccountsUIWrapper.js';

export default function Header() {
  return (
    <header className="container-fluid">
      <h1>
        <a href="/">
          VESPA.<i>app</i>
        </a>
      </h1>
      <AccountsUIWrapper />
    </header>
  );
}
