import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Nav from './Nav';
import DropDown from './DropDown';

const Navbar = styled.nav`
  background: #050a30;
  color: #f4f6fc;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h2`
  color: #f4f6fc;
  margin-left: 15vw;
`;

export default function NavBar() {
  return (
    <Navbar>
      <Link to="/">
        <DropDown />
      </Link>
      <Title>Code Grounds</Title>
      <Nav />
    </Navbar>
  );
}
