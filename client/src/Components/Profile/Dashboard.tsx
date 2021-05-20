import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import GroundCard from '../CodeGround/CodeGroundCard';
import { CodeGroundPopulated } from '../../../../src/models/CodeGround';
import { UserDocument } from '../../../../src/models/User';
import { fetchUserGrounds } from '../../services/codeground';

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

interface DashboardProps {
  profileUser: UserDocument;
  user: UserDocument | null;
}

const Dashboard: React.FC<DashboardProps> = ({ profileUser, user }) => {
  const [codeGrounds, setCodeGrounds] = useState([] as CodeGroundPopulated[]);

  useEffect(() => {
    fetchUserGrounds(profileUser._id)
      .then((codeGrounds: CodeGroundPopulated[]) => setCodeGrounds(codeGrounds))
      .catch((err: Error) => console.log(err));
  }, []);

  const renderCards = () => {
    return codeGrounds.map((ground) => (
      <GroundCard
        key={ground._id}
        user={user}
        userOwnsGround={user ? ground.user._id === user._id : false}
        codeGround={ground}
        liked={user ? ground.likes.includes(user._id) : false}
        favourited={user ? user.favourites.includes(ground._id) : false}
      />
    ));
  };

  return (
    <DashboardContainer>
      <GroundsContainerOuter>{renderCards()}</GroundsContainerOuter>
    </DashboardContainer>
  );
};

export default Dashboard;
