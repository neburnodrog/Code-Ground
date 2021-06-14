import React, { ChangeEvent } from 'react';
import styled from 'styled-components';

const StyledSearchBar = styled.div`
  color: inherit;
  border: 0px;
  padding: 0.4em 0.6em;
  text-align: center;
  background: #2b2d3b;
  width: 90%;
  margin: 1em;
  display: flex;
  align-items: center;
  border-radius: 0.2em;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    font-size: 2em;
  }
`;

const Input = styled.input`
  color: inherit;
  border: 1px solid white;
  padding: 0.4em 0.6em;
  text-align: center;
  background: #131522;
  flex-grow: 5;
  border-radius: 0.2em;
  margin-right: 1em;
  font-size: 1rem;

  @media (max-width: 768px) {
    font-size: 1em;
    margin: 0.2em 0em 0.6em 0em;
  }
`;

const Select = styled.select`
  font-size: 0.8em;
  color: inherit;
  margin-left: 0.5em;
  padding: 0.3em 0.5em;
  overflow: hidden;
  border-radius: 0.2em;
  background: #131522;
  border: 0px;

  @media (max-width: 768px) {
    font-size: 1em;
    margin: 0.2em 0em 0.2em 0em;
  }
`;

const Label = styled.label`
  font-size: 0.8em;
  margin: 0em 0em 0em 1em;

  @media (max-width: 768px) {
    font-size: 1em;
    margin: 0.2em 0em 0.2em 0em;
  }
`;

interface SearchBarProps {
  handleSearch: (value: string) => void;
  handleSelect: (value: string) => void;
  search: string;
}

export default function SearchBar(props: SearchBarProps) {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) =>
    props.handleSearch(e.currentTarget.value);

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    props.handleSelect(e.currentTarget.value);
  };

  return (
    <StyledSearchBar>
      <Input
        type="text"
        name="search"
        id="search"
        placeholder="Search here"
        value={props.search}
        onChange={handleInputChange}
      />
      <Label htmlFor="filter">Order by:</Label>
      <Select
        name="filter"
        id="filter"
        onChange={handleSelectChange}
        defaultValue="last added"
        //style={{ marginRight: '1em' }}
      >
        <option value="last added">Most recent</option>
        <option value="user">Username</option>
        <option value="html">HTML</option>
        <option value="css">CSS</option>
        <option value="js">JS</option>
      </Select>
      <Label htmlFor="category">Search by:</Label>
      <Select
        name="category"
        id="category"
        onChange={handleSelectChange}
        defaultValue="title"
      >
        <option value="title">Title</option>
        <option value="user">Username</option>
        <option value="html">HTML</option>
        <option value="css">CSS</option>
        <option value="js">JS</option>
      </Select>
    </StyledSearchBar>
  );
}
