import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  MouseEvent,
  useState,
  useEffect,
} from 'react';
import styled from 'styled-components';
import { Edit } from '@styled-icons/fa-solid';
import { WrapperButton } from '../StyledComponents/IconsButtons';

const TitleContainer = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.2em 1.5em 0.2em 0em;
`;

const Title = styled.input`
  ${({ readOnly }) =>
    readOnly
      ? 'border: 1px solid rgba(255, 255, 255, 0.4)'
      : 'border: 1px solid green'}
  font-size: inherit;
  color: inherit;
  background: transparent;
  text-align: center;
  outline: none;
`;

const EditButton = styled(WrapperButton)`
  margin-top: 0px;
  margin-left: 0.3em;
`;

interface CodeGroundTitleProps {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
}

export default function CodeGroundTitle(props: CodeGroundTitleProps) {
  const { title, setTitle } = props;
  const [editable, setEditable] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const handleEdit = (e: MouseEvent<HTMLButtonElement>) => {
    setEditable((Prev) => !Prev);
  };

  useEffect(() => {
    console.log(editable);
  }, [editable]);

  return (
    <TitleContainer>
      <Title
        type="text"
        value={title}
        onChange={handleChange}
        readOnly={!editable}
      />
      <EditButton onClick={handleEdit}>
        <Edit size={'1em'} />
      </EditButton>
    </TitleContainer>
  );
}
