import React, { useState } from 'react';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import { UserDocument } from '../../src/models/User';

// COMPONENTS
import NavBar from './Components/NavBar/NavBar';
import Home from './Pages/Home';
import Profile from './Pages/Profile';
import CodeGround from './Pages/CodeGround';
import SignUp from './Pages/SignUp';
import Login from './Pages/Login';
import NotFound from './Pages/NotFound';
import { ProtectedRoute } from './Pages/ProtectedRoute';

const AppContainer = styled.main`
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
`;

function App(props: { user: UserDocument | null }) {
  const [user, setUser] = useState(props.user);
  const [notSavedCodeGround, setNotSavedCodeGround] = useState(false);

  console.log(user);

  return (
    <AppContainer>
      <NavBar user={user} setUser={setUser} />

      <Switch>
        <Route
          exact
          path="/"
          render={(props) => <Home {...props} user={user} />}
        />
        <ProtectedRoute
          exact={true}
          path="/profile"
          permission={user ? true : false}
          redirectPath="/login"
          component={Profile}
        />
        <Route
          exact
          path="/code-ground"
          render={(props) => (
            <CodeGround
              {...props}
              user={user}
              setNotSavedCodeGround={setNotSavedCodeGround}
              notSavedCodeGround={notSavedCodeGround}
            />
          )}
        />
        <Route
          exact
          path="/code-ground/:id"
          render={(props) => (
            <CodeGround
              {...props}
              id={props.match.params.id}
              user={user}
              setNotSavedCodeGround={setNotSavedCodeGround}
              notSavedCodeGround={notSavedCodeGround}
            />
          )}
        />
        <ProtectedRoute
          exact={true}
          path="/login"
          permission={user ? false : true}
          redirectPath="/profile"
          render={(props) => (
            <Login
              {...props}
              setUser={setUser}
              notSavedCodeGround={notSavedCodeGround}
            />
          )}
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
    </AppContainer>
  );
}

export default App;
