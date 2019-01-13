import React from 'react';

import AccountsUIWrapper from './AccountsUIWrapper.js';

export default function Header() {
  return (
    <header className="container-fluid">
      <h1>
        VESPA.<i>app</i>
      </h1>
      <AccountsUIWrapper />
    </header>
  );
}