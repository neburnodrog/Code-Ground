import styled from 'styled-components';

const NavLink = styled.button`
  font-size: inherit;
  border: 0px;
  background: transparent;
  color: inherit;
  padding: 0.3em 1.5em;
  border-radius: 0.2em;
  &:hover {
    background-color: #233dff;
  }
  transition: background-color 1s;
`;

export default NavLink;
