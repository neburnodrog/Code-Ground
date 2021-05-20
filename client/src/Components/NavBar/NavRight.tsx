import React from 'react';
import styled from 'styled-components';
import { NavLink } from './NavBar';
import { Link, Redirect } from 'react-router-dom';
import { SignOutAlt, SignInAlt } from '@styled-icons/fa-solid';
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

const ProfileIcon = styled.img`
  position: relative;
  border-radius: 50%;
  width: 1.8em;
  &:hover {
    transition: 1s;
    color: #f4f6fc;
    box-shadow: 0px 0px 0.3em 0.3em #233dff;
  }
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
        <NavLink onClick={handleLogout}>
          Log Out <SignOutAlt size={'1em'} />
        </NavLink>

        <Link to={`/profile/${props.user!._id}`} style={{ marginLeft: '1em' }}>
          <ProfileIcon src={props.user?.avatar.path} />
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
            Login <SignInAlt size={'1em'} />
          </NavLink>
        </Link>
      </>
    );
  };

  return <NavList>{props.user ? signedInNav() : anonynousNav()}</NavList>;
}
