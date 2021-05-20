import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import GroundCard from '../CodeGround/CodeGroundCard';
import { CodeGroundPopulated } from '../../../../src/models/CodeGround';
import { UserDocument } from '../../../../src/models/User';
import { fetchUserFavourites } from '../../services/users';
import { RouteComponentProps } from 'react-router-dom';

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

const GroundsContainerOuter = styled.div`
  width: 92%;
  min-height: 80vh;
  display: flex;
  flex-flow: row wrap;
  align-content: flex-start;
  justify-content: center;
  align-items: center;
  margin: 0em;
  background: #2b2d3b;
  border-radius: 2mm;
  margin-top: 2em;
`;

interface DashboardProps extends RouteComponentProps {
  profileUser: UserDocument;
  user: UserDocument | null;
}

const FavouritesDashboard: React.FC<DashboardProps> = ({
  profileUser,
  user,
  ...rest
}) => {
  const [codeGrounds, setCodeGrounds] = useState([] as CodeGroundPopulated[]);

  useEffect(() => {
    fetchUserFavourites(profileUser._id)
      .then((codeGrounds: CodeGroundPopulated[]) => {
        setCodeGrounds(codeGrounds);
      })
      .catch((err: Error) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderCards = () => {
    return codeGrounds.map((ground) => (
      <GroundCard
        key={ground._id}
        user={user}
        userOwnsGround={user ? ground.user._id === user._id : false}
        codeGround={ground}
        liked={user ? ground.likes.includes(user._id) : false}
        favourited={user ? profileUser.favourites.includes(ground._id) : false}
        {...rest}
      />
    ));
  };

  if (codeGrounds === undefined) return <h1>Loading</h1>;
  if (codeGrounds === null) return <h1>No Favourites yet</h1>;

  return (
    <DashboardContainer>
      <GroundsContainerOuter>{renderCards()}</GroundsContainerOuter>
    </DashboardContainer>
  );
};

export default FavouritesDashboard;
