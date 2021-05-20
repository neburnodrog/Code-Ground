import React, { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import styled from 'styled-components';
import { Edit } from '@styled-icons/fa-solid';
import { WrapperButton } from '../StyledComponents/IconsButtons';

const TitleContainer = styled.nav`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0.2em 1.5em 0.2em 0em;
  background: #2b2d3b;
`;

const Title = styled.input`
  font-size: inherit;
  color: inherit;
  background: transparent;
  text-align: center;
  outline: none;
  ${(props) =>
    props.readOnly
      ? 'border: 1px solid gray;'
      : 'border: 1px solid lime; box-shadow: 0px 0px 1px 1px lime'}
  border-top: 1px solid transparent;
`;

const Button = styled(WrapperButton)`
  margin-top: 0px;
  margin-left: 0.3em;
  padding: 0.4em;
  &:hover {
    background: #233dff;
    transition: 0.5s;
  }
`;

const Svg = styled.svg`
  margin: 0.2em;
`;

const SvgLeft = styled(Svg)`
  transform: rotate(-90deg);
`;

interface CodeGroundTitleProps {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  setVertical: Dispatch<SetStateAction<boolean>>;
}

export default function CodeGroundTitle(props: CodeGroundTitleProps) {
  const { title, setTitle, setVertical } = props;
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
      <Button onClick={() => setVertical(false)}>
        <Svg viewBox="0 0 20 20" width="15" height="15" fill="#f4f6fc">
          <path d="M0 9.002C0 8.45.455 8 .992 8h18.016c.548 0 .992.456.992 1.002v9.996c0 .553-.455 1.002-.992 1.002H.992C.444 20 0 19.544 0 18.998V9.002zm0-8C0 .45.451 0 .99 0h4.02A.99.99 0 016 1.003v4.994C6 6.551 5.549 7 5.01 7H.99A.99.99 0 010 5.997V1.003zm7 0C7 .45 7.451 0 7.99 0h4.02A.99.99 0 0113 1.003v4.994C13 6.551 12.549 7 12.01 7H7.99A.99.99 0 017 5.997V1.003zm7 0C14 .45 14.451 0 14.99 0h4.02A.99.99 0 0120 1.003v4.994C20 6.551 19.549 7 19.01 7h-4.02A.99.99 0 0114 5.997V1.003z"></path>
        </Svg>
      </Button>

      <Button onClick={() => setVertical(true)}>
        <SvgLeft viewBox="0 0 20 20" width="15" height="15" fill="#f4f6fc">
          <path d="M0 9.002C0 8.45.455 8 .992 8h18.016c.548 0 .992.456.992 1.002v9.996c0 .553-.455 1.002-.992 1.002H.992C.444 20 0 19.544 0 18.998V9.002zm0-8C0 .45.451 0 .99 0h4.02A.99.99 0 016 1.003v4.994C6 6.551 5.549 7 5.01 7H.99A.99.99 0 010 5.997V1.003zm7 0C7 .45 7.451 0 7.99 0h4.02A.99.99 0 0113 1.003v4.994C13 6.551 12.549 7 12.01 7H7.99A.99.99 0 017 5.997V1.003zm7 0C14 .45 14.451 0 14.99 0h4.02A.99.99 0 0120 1.003v4.994C20 6.551 19.549 7 19.01 7h-4.02A.99.99 0 0114 5.997V1.003z"></path>
        </SvgLeft>
      </Button>

      <Title
        type="text"
        value={title}
        onChange={handleChange}
        onClick={handleEdit}
        onBlur={handleBlur}
        readOnly={!editable}
      />

      <Button onClick={handleEdit}>
        <Edit size={'1.2em'} />
      </Button>
    </TitleContainer>
  );
}
