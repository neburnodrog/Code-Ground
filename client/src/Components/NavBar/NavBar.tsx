import React, { Dispatch, SetStateAction } from 'react';
import { UserDocument } from '../../../../src/models/User';
import styled from 'styled-components';
import NavRight from './NavRight';
import NavLeft from './NavLeft';

export const NavLink = styled.button`
  font-size: inherit;
  border: 0px;
  background: transparent;
  color: inherit;
  padding: 0.3em 2.5em;
  border-radius: 0.2em;
  cursor: pointer;
  border: 1px solid transparent;
  &:hover {
    background-color: #233dff;
  }
  transition: background-color 1s;
`;

export const Navbar = styled.nav`
  background: #2b2d3b;
  max-height: 5%;
  color: #f4f6fc;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h2`
  color: #f4f6fc;
`;

export interface NavBarProps {
  user: boolean;
  setUser: Dispatch<SetStateAction<UserDocument | null>>;
}

export default function NavBar(props: NavBarProps) {
  return (
    <Navbar>
      <NavLeft />
      <Title>Code Ground</Title>
      <NavRight {...props} />
    </Navbar>
  );
}
