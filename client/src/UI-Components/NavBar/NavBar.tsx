import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function NavBar() {
  return (
    <nav>
      <div className="logo-container">
        <FontAwesomeIcon icon={['fas', 'coffee']} />
      </div>
      <div className="navbar-nav"></div>
    </nav>
  );
}
