import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { Edit } from '@styled-icons/fa-solid';
import { WrapperButton } from '../StyledComponents/IconsButtons';

const StyledTitle = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.2em 1.5em 0.2em 0em;
`;

interface CodeGroundTitleProps {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
}

const EditButton = styled(WrapperButton)`
  margin-top: 0px;
  margin-left: 0.3em;
`;

export default function CodeGroundTitle(props: CodeGroundTitleProps) {
  const handleEdit = () => {};

  return (
    <StyledTitle>
      <p>{props.title} </p>
      <EditButton onClick={handleEdit}>
        <Edit size={'1em'} />
      </EditButton>
    </StyledTitle>
  );
}
