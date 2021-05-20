import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Dashboard from '../Components/Profile/Dashboard';
import Header from '../Components/Profile/Header';
import { UserDocument } from '../../../src/models/User';
import { ResultsContainerOuter as DashboardContainer } from './Home';
import {
  Link,
  RouteComponentProps,
  useParams,
  useRouteMatch,
} from 'react-router-dom';
import { getUser } from '../services/users';

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 0em 1em;
  border-top-left-radius: 0.4em;
  border-top-right-radius: 0.4em;
  width: 60%;
`;

const TabContainer = styled.div`
  margin: 0em 1em;
  padding: 0.3em 0.8em;
  background: #2b2d3b;
  border-top-left-radius: 0.4em;
  border-top-right-radius: 0.4em;
  min-width: 13em;
`;

const H2 = styled.h3`
  margin: 0.3em 1em;
  text-align: center;
`;

interface ProfileProps extends RouteComponentProps {
  user: UserDocument | null;
}

const Profile: React.FC<ProfileProps> = ({ user, ...rest }) => {
  const { userId } = useParams<{ userId: string }>();
  const { url } = useRouteMatch();
  const [profileUser, setProfileUser] = useState<UserDocument | null>();

  useEffect(() => {
    getUser(userId)
      .then((profileUser) => {
        if (!profileUser) {
          setProfileUser(null);
          return;
        }
        setProfileUser(profileUser);
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const userIsProfileOwner = () => {
    if (!user) return false;
    if (!profileUser) return false;

    return profileUser._id === user._id;
  };

  if (profileUser === null) return <h1>User not found</h1>;
  if (profileUser === undefined) return <h1>Loading</h1>;
  return (
    <ProfileContainer>
      <Header user={profileUser} />

      <TabsContainer>
        <Link to={`${url}/favourites`}>
          <TabContainer>
            <H2>Favourites</H2>
          </TabContainer>
        </Link>

        <Link to={`${url}`}>
          <TabContainer>
            <H2>
              {userIsProfileOwner() ? 'My' : `${profileUser.username}`}{' '}
              Codegrounds
            </H2>
          </TabContainer>
        </Link>

        {userIsProfileOwner() && (
          <Link to={`${url}/edit`}>
            <TabContainer>
              <H2>New Profile Pic</H2>
            </TabContainer>
          </Link>
        )}
      </TabsContainer>

      <DashboardContainer>
        <Dashboard profileUser={profileUser} user={user} {...rest} />
      </DashboardContainer>
    </ProfileContainer>
  );
};

export default Profile;
