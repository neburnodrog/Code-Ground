import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Button } from '../StyledComponents/FormComponents';

const Logo = styled.img`
  width: 3em;
  margin-left: 2em;
  border-radius: 50%;
  border: 2px solid transparent;
  &:hover {
    border: 2px solid #f4f6fc;
    transition: 1s;
  }
`;

const NavList = styled.div`
  margin-right: 2em;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-start;
  width: 40vw;
`;

export default function NavLeft() {
  return (
    <NavList>
      <Logo
        src="https://res.cloudinary.com/doh6rpdke/image/upload/v1620936255/code-ground/assets/Untitled_design_qhrefh.png"
        alt="logo"
      />
      <Link to="/">
        <Button border={false}>Dashboard</Button>
      </Link>
      <Link to="/code-ground">
        <Button border={false}>
          New <FontAwesomeIcon icon={['fas', 'plus']} />
        </Button>
      </Link>
    </NavList>
  );
}
