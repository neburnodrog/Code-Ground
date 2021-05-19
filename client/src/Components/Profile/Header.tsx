import React, { FC } from 'react';
import styled from 'styled-components';
import { UserDocument } from '../../../../src/models/User';

interface HeaderProps {
  user: UserDocument;
}

const HeaderContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3em;
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
      <H1>Hello {user.username}</H1>
      <ProfilePic src={user.avatar.path} alt="" />
    </HeaderContainer>
  );
};

export default Header;
