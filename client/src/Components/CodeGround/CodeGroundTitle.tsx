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
  font-size: inherit;
  color: inherit;
  background: transparent;
  text-align: center;
  outline: none;
  ${(props) =>
    props.readOnly
      ? 'border: 1px solid rgba(255, 255, 255, 0.4);'
      : 'border: 1px solid lime; box-shadow: 0px 0px 1px 1px lime'}
`;

const EditButton = styled(WrapperButton)`
  margin-top: 0px;
  margin-left: 0.3em;
  padding: 0.4em;
  &:hover {
    background: #233dff;
    transition: 0.5s;
  }
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

  const handleEdit = () => {
    setEditable((Prev) => !Prev);
  };

  const handleBlur = () => {
    setEditable(false);
  };

  return (
    <TitleContainer>
      <Title
        type="text"
        value={title}
        onChange={handleChange}
        onClick={handleEdit}
        onBlur={handleBlur}
        readOnly={!editable}
      />
      <EditButton onClick={handleEdit}>
        <Edit size={'1.2em'} />
      </EditButton>
    </TitleContainer>
  );
}
