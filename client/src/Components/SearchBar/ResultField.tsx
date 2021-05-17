import React from 'react';
import styled from 'styled-components';
import { CodeGroundPopulated } from '../../../../src/models/CodeGround';

const ResultFieldContainer = styled.div`
  display: flex;
  width: 20vw;
  height: 10vh;
`;

interface ResultFieldProps {
  children: CodeGroundPopulated;
}

export default function ResultField(props: ResultFieldProps) {
  const codeGround = props.children;
  return <ResultFieldContainer>{codeGround.title}</ResultFieldContainer>;
}
