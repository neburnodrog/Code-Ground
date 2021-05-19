import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Save, Plus } from '@styled-icons/fa-solid';
import { WrapperButton } from '../../Components/StyledComponents/IconsButtons';
import { UserDocument } from '../../../../src/models/User';

const StyledCodeBar = styled.nav`
  background: #2b2d3b;
  padding: 0.2em;
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
  padding: 0.4em;
  margin-top: 1.9em;
  &:hover {
    background: #233dff;
  }
  transition: background 1s;
`;

const StyledSave = styled(Save)`
  padding: 0.4em;
  margin-top: 0.5em;
  &:hover {
    background: #233dff;
  }
  transition: background 1s;
`;

interface CodeGroundBarProps {
  handleSave: () => void;
  user: UserDocument | null;
}

export default function CodeGroundBar(props: CodeGroundBarProps) {
  const renderSaveButton = () => {
    return (
      <WrapperButton onClick={props.handleSave}>
        <StyledSave size={'1.2em'} />
      </WrapperButton>
    );
  };

  return (
    <StyledCodeBar>
      <Link to="/code-ground">
        <WrapperButton>
          <StyledNew size={'1.2em'} />
        </WrapperButton>
      </Link>
      {props.user && renderSaveButton()}
    </StyledCodeBar>
  );
}
