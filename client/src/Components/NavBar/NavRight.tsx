import React from 'react';
import styled from 'styled-components';
import { Button } from '../StyledComponents/FormComponents';
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

export default function NavRight({ user }: { user: boolean }) {
  const signedInNav = () => {
    return (
      <>
        <Link to="/logout">
          <Button border={false}>
            Log Out <FontAwesomeIcon icon={['fas', 'sign-out-alt']} />
          </Button>
        </Link>

        <Link to="/profile" style={{ marginLeft: '1em' }}>
          <FontAwesomeIcon
            className="profile-icon"
            icon={['fas', 'user-circle']}
          />
        </Link>
      </>
    );
  };
  const anonynousNav = () => {
    return (
      <>
        <Link to="/signup">
          <Button border={false}>Sign Up</Button>
        </Link>

        <Link to="/login">
          <Button border={false}>
            Log In <FontAwesomeIcon icon={['fas', 'sign-in-alt']} />
          </Button>
        </Link>
      </>
    );
  };

  return <NavList>{user ? signedInNav() : anonynousNav()}</NavList>;
}
