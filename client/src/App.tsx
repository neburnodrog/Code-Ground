import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { UserDocument } from '../../src/models/User';

// COMPONENTS
import NavBar from './Components/NavBar/NavBar';
import Home from './Routes/Home';
import Profile from './Routes/Profile';
import CodeGround from './Routes/CodeGround/CodeGround';
import LoginForm from './Routes/LoginForm';
import SignUpForm from './Routes/SignUpForm';
import NotFound from './Routes/NotFound';
import { ProtectedRoute } from './Routes/ProtectedRoute';

// ICONS
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);

function App(props: { user: UserDocument | null }) {
  const [user, setUser] = useState(props.user);

  return (
    <div>
      <NavBar user={user ? true : false} />

      <Switch>
        <Route exact path="/" component={Home} />
        <ProtectedRoute
          exact={true}
          path="/profile"
          permission={user ? true : false}
          redirectPath="/login"
          component={Profile}
        />
        <Route exact path="/code-ground" component={CodeGround} />
        <ProtectedRoute
          exact={true}
          path="/login"
          permission={user ? false : true}
          redirectPath="/profile"
          component={LoginForm}
        />
        <ProtectedRoute
          exact={true}
          path="/signup"
          permission={user ? false : true}
          redirectPath="/profile"
          component={SignUpForm}
        />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
