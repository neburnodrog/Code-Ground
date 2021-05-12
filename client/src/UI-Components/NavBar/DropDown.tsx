import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

const DropDownContent = styled.div`
  background-color: #050a30;
  display: none;
  min-width: 10em;
  z-index: 0;
  position: absolute;
  /* text-align: center; */
  /* margin-top: 1em; */
  /* padding: 1em; */
  &:hover {
    display: flex;
    flex-flow: column;
    align-items: center;
  }
`;

const Menu = styled.div`
  display: inline-block;
  position: relative;
  background-color: inherit;
  &:hover ${DropDownContent} {
    display: flex;
    flex-flow: column;
    align-items: center;
  }
`;

const DropDownLink = styled.button`
  color: inherit;
  font-size: inherit;
  background: transparent;
  border: 1px solid transparent;
  margin: 0.5em 0px;
  padding: 0.5em 2em;
  border-radius: 0.2em;
  &:hover {
    background-color: #233dff;
    transition: 1s;
  }
`;

export default function DropDown() {
  return (
    <Menu>
      <Logo
        src="https://res.cloudinary.com/doh6rpdke/image/upload/v1620812620/Code-Grounds/assets/codeground-logo_lyteyj.png"
        alt="logo"
      />
      <DropDownContent>
        <Link to="/">
          <DropDownLink>Dashboard</DropDownLink>
        </Link>
        <Link to="/code-ground">
          <DropDownLink>
            New <FontAwesomeIcon icon={['fas', 'plus']} />
          </DropDownLink>
        </Link>
      </DropDownContent>
    </Menu>
  );
}
