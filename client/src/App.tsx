import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { Switch, Route, RouteComponentProps, Redirect } from 'react-router-dom';
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
import ProfileEdit from './Components/Profile/ProfileEdit';
import Favourites from './Pages/Favourites';

const AppContainer = styled.main`
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
`;

interface AppProps extends RouteComponentProps {
  user: UserDocument | null;
}

const App: FC<AppProps> = ({ user: UserProp, ...rest }) => {
  const [user, setUser] = useState(UserProp);
  const [notSavedCodeGround, setNotSavedCodeGround] = useState(false);
  return (
    <AppContainer>
      <NavBar user={user} setUser={setUser} {...rest} />

      <Switch>
        <Route
          exact
          path="/home"
          render={(props) => <Home {...props} user={user} />}
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
          exact
          path="/login"
          permission={user ? false : true}
          redirectPath="/profile"
          render={(props: RouteComponentProps) => (
            <Login
              {...props}
              setUser={setUser}
              notSavedCodeGround={notSavedCodeGround}
            />
          )}
        />
        <ProtectedRoute
          exact
          path="/signup"
          permission={user ? false : true}
          redirectPath="/profile"
          component={SignUp}
        />

        <Route
          exact
          path="/profile/:userId"
          render={(props) => <Profile {...props} user={user} />}
        />

        <ProtectedRoute
          exact={true}
          path="/profile/:userId/edit"
          permission={user ? true : false}
          redirectPath="/login"
          render={(props) => (
            <ProfileEdit {...props} user={user!} setUser={setUser} />
          )}
        />

        <Route
          exact
          path="/profile/:userId/favourites"
          render={(props) => <Favourites {...props} user={user} />}
        />

        <Redirect from="/" to="/home" />

        <Route component={NotFound} />
      </Switch>
    </AppContainer>
  );
};

export default App;
