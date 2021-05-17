import React from 'react';
import styled from 'styled-components';
import { Button } from '../Components/StyledComponents/FormComponents';
import { Link } from 'react-router-dom';

const Error = styled.div`
  text-align: center;
`;

export default function NotFound() {
  return (
    <>
      <Error>
        <h1>404 Error</h1>
        <h3>The page you tried to access doesn't exist</h3>
        <Link to="/">
          <Button>Take me back to the Dashboard</Button>
        </Link>
      </Error>
    </>
  );
}
