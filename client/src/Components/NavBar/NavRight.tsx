import React from 'react';
import styled from 'styled-components';
import NavLink from './NavLink';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const NavList = styled.div`
  margin-right: 2em;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-end;
  width: 40vw;
`;

export default function NavRight() {
  return (
    <NavList>
      <Link to="/signup">
        <NavLink>Sign Up</NavLink>
      </Link>

      <Link to="/login">
        <NavLink>
          Log In <FontAwesomeIcon icon={['fas', 'sign-in-alt']} />
        </NavLink>
      </Link>

      <Link to="/logout">
        <NavLink>
          Log Out <FontAwesomeIcon icon={['fas', 'sign-out-alt']} />
        </NavLink>
      </Link>

      <Link to="/profile" style={{ marginLeft: '1em' }}>
        <FontAwesomeIcon
          className="profile-icon"
          icon={['fas', 'user-circle']}
        />
      </Link>
    </NavList>
  );
}
