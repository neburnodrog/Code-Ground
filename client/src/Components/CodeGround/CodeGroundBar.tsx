import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Save, Plus } from '@styled-icons/fa-solid';
import { WrapperButton } from '../../Components/StyledComponents/IconsButtons';

const StyledCodeBar = styled.nav`
  /* background: #000211; */
  background: #050a30;
  height: 100%;
  max-height: 100%;
  color: #f4f6fc;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 2px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-top: 0.5em;
`;

const StyledNew = styled(Plus)`
  padding: 0.2em;
  &:hover {
    background: #233dff;
  }
  transition: background 1s;
`;

const StyledSave = styled(Save)`
  padding: 0.2em;
  &:hover {
    background: #233dff;
  }
  transition: background 1s;
`;

interface CodeGroundBarProps {
  handleSave: () => void;
}

export default function CodeGroundBar(props: CodeGroundBarProps) {
  return (
    <StyledCodeBar>
      <Link to="/code-ground">
        <WrapperButton>
          <StyledNew size={'1em'} />
        </WrapperButton>
      </Link>
      <WrapperButton onClick={props.handleSave}>
        <StyledSave size={'1em'} />
      </WrapperButton>
    </StyledCodeBar>
  );
}
