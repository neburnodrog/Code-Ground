import React, { FC } from 'react';
import styled from 'styled-components';
import { NavLink } from './NavBar';
import { Link } from 'react-router-dom';
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

const NavRight: FC<NavBarProps> = ({ setUser, user, history }) => {
  const handleLogout = () => {
    logout()
      .then((resp) => {
        console.log(resp);
        setUser(null);
        // history.push('/home');
      })
      .catch((err) => console.log(err));
  };

  const signedInNav = () => {
    return (
      <>
        <NavLink onClick={handleLogout}>
          Log Out <SignOutAlt size={'1em'} />
        </NavLink>

        <Link to={`/profile/${user!._id}`} style={{ marginLeft: '1em' }}>
          <ProfileIcon src={user?.avatar.path} />
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

  return <NavList>{user ? signedInNav() : anonynousNav()}</NavList>;
};

export default NavRight;
