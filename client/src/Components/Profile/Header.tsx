import React, { FC } from 'react';
import styled from 'styled-components';
import { UserDocument } from '../../../../src/models/User';
import { Edit } from '@styled-icons/fa-solid';

interface HeaderProps {
  user: UserDocument;
}

const HeaderContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3em;
  position: relative;
`;

const H1 = styled.h1`
  font-size: 3em;
`;

const ProfilePic = styled.img`
  border-radius: 50%;
  margin: 1em;
  width: 10em;
`;

const Header: FC<HeaderProps> = ({ user }) => {
  return (
    <HeaderContainer>
      <H1>
        {user.username}
        {/* <Edit size="1em" /> */}
      </H1>
      <ProfilePic src={user.avatar.path} alt="" />
    </HeaderContainer>
  );
};

export default Header;
