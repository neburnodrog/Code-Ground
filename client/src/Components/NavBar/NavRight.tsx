import React from 'react';
import styled from 'styled-components';
import { NavLink } from './NavBar';
import { Link, Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavBarProps } from './NavBar';
import { logout } from '../../services/auth';

const NavList = styled.div`
  margin-right: 2em;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-end;
  width: 30vw;
`;

export default function NavRight(props: NavBarProps) {
  const handleLogout = () => {
    logout()
      .then((resp) => {
        console.log(resp);
        props.setUser(null);
        <Redirect to="/" />;
      })
      .catch((err) => console.log(err));
  };

  const signedInNav = () => {
    return (
      <>
        <Link to="/logout">
          <NavLink onClick={handleLogout}>
            Log Out <FontAwesomeIcon icon={['fas', 'sign-out-alt']} />
          </NavLink>
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
          <NavLink>Join</NavLink>
        </Link>

        <Link to="/login">
          <NavLink>
            Login <FontAwesomeIcon icon={['fas', 'sign-in-alt']} />
          </NavLink>
        </Link>
      </>
    );
  };

  return <NavList>{props.user ? signedInNav() : anonynousNav()}</NavList>;
}
