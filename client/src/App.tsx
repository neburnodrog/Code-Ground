import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';

import NavBar from './UI-Components/NavBar/NavBar';
import Home from './UI-Components/Home/Home';
import Profile from './UI-Components/Profile/Profile';
import CodeGround from './CodeGround/CodeGround';

// ICONS
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);

function App() {
  return (
    <div>
      <NavBar />

      <Route exact path="/" component={Home} />
      <Route exact path="/profile/:id" component={Profile} />
      <Route exact path="/code-ground/:id" component={CodeGround} />
    </div>
  );
}

export default App;
