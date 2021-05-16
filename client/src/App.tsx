import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { UserDocument } from '../../src/models/User';

// COMPONENTS
import NavBar from './Components/NavBar/NavBar';
import Home from './Pages/Home';
import Profile from './Pages/Profile';
import CodeGround from './Pages/CodeGround/CodeGround';
import SignUp from './Pages/SignUp';
import Login from './Pages/Login';
import NotFound from './Pages/NotFound';
import { ProtectedRoute } from './Pages/ProtectedRoute';

// ICONS
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);

function App(props: { user: UserDocument | null }) {
  const [user, setUser] = useState(props.user);

  return (
    <div>
      <NavBar user={user ? true : false} setUser={setUser} />

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
          render={(props) => <Login setUser={setUser} />}
        />
        <ProtectedRoute
          exact={true}
          path="/signup"
          permission={user ? false : true}
          redirectPath="/profile"
          component={SignUp}
        />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
