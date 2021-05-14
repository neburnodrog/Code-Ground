import React from 'react';
import styled from 'styled-components';
import './NavBar.css';
import NavRight from './NavRight';
import NavLeft from './NavLeft';

const Navbar = styled.nav`
  /* background: #000211; */
  background: #050a30;
  max-height: 5%;
  color: #f4f6fc;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h2`
  color: #f4f6fc;
`;

interface NavBarProps {
  user: boolean;
}

export default function NavBar(props: NavBarProps) {
  return (
    <Navbar>
      <NavLeft />
      <Title>Code Ground</Title>
      <NavRight user={props.user} />
    </Navbar>
  );
}
