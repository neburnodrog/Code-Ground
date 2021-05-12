import React from 'react';
import styled from 'styled-components';
import Button from './Button';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const NavList = styled.div`
  margin-right: 2em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 20vw;
`;

export default function Nav() {
  return (
    <div>
      <NavList>
        <Link to="/signup">
          <Button>Sign Up</Button>
        </Link>
        <Link to="/login">
          <Button>
            Log In <FontAwesomeIcon icon={['fas', 'sign-in-alt']} />
          </Button>
        </Link>

        <Link to="/profile">
          <FontAwesomeIcon
            icon={['fas', 'user-circle']}
            style={{ color: '#f4f6fc' }}
          />
        </Link>
      </NavList>
    </div>
  );
}
