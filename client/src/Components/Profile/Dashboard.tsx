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
`;

interface DashboardProps {
  user: UserDocument;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const [codeGrounds, setCodeGrounds] = useState([] as CodeGroundPopulated[]);

  useEffect(() => {
    fetchUserGrounds(user._id)
      .then((codeGrounds: CodeGroundPopulated[]) => setCodeGrounds(codeGrounds))
      .catch((err: Error) => console.log(err));
  }, []);

  const renderCards = () => {
    return codeGrounds.map((ground) => (
      <GroundCard
        userLoggedIn={true}
        userOwnsGround={true}
        codeGround={ground}
        isCreator={ground.user._id === ground.creator._id}
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
