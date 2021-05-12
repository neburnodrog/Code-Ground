import React from 'react';
import { Switch, Route } from 'react-router-dom';

import NavBar from './UI-Components/NavBar/NavBar';
import Home from './UI-Components/Home/Home';
import Profile from './UI-Components/Profile/Profile';
import CodeGround from './CodeGround/CodeGround';
import NotFound from './UI-Components/NotFound';

// ICONS
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);

function App() {
  return (
    <div>
      <NavBar />

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/code-ground" component={CodeGround} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
