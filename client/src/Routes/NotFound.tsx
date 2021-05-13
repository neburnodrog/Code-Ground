import React from 'react';
import styled from 'styled-components';
import SearchBar from '../Components/SearchBar/SearchBar';

const Error = styled.div`
  text-align: center;
`;

export default function NotFound() {
  return (
    <>
      <SearchBar />
      <Error>
        <h1>404 Error</h1>
        <h3>The page you tried to access doesn't exist</h3>
      </Error>
    </>
  );
}