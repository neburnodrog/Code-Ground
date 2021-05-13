import React from 'react';
import { Switch, Route } from 'react-router-dom';

import NavBar from './Components/NavBar/NavBar';
import Home from './Routes/Home';
import Profile from './Routes/Profile';
import CodeGround from './Routes/CodeGround/CodeGround';
import NotFound from './Routes/NotFound';

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
