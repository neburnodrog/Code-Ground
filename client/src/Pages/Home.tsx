import React from 'react';
import styled from 'styled-components';
import SearchBar from '../Components/SearchBar/SearchBar';
import ResultField from '../Components/SearchBar/ResultField';
import { CodeGroundPopulated } from '../../../src/models/CodeGround';
import { UserDocument } from '../../../src/models/User';
import { fetchAll } from '../services/codeground';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  flex-grow: 1;
`;

const ResultsContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-around;
  margin: 1em;
`;

const SearchBarContainer = styled(SearchBar)`
  flex-grow: 1;
`;

interface HomeState {
  codeGrounds: CodeGroundPopulated[];
  search: string;
  option: string;
}

interface HomeProps {
  user: UserDocument | null;
}

export default class Home extends React.Component<HomeProps, HomeState> {
  state: HomeState = {
    codeGrounds: [] as CodeGroundPopulated[],
    search: '',
    option: 'title',
  };

  componentDidMount() {
    fetchAll()
      .then((codeGrounds) => this.setState({ codeGrounds: codeGrounds }))
      .catch((err) => console.log(err));
  }

  handleSearch = (value: string) => {
    this.setState({ search: value });
  };

  handleSelect = (value: string) => {
    this.setState({ option: value });
  };

  displayResults = () => {
    const { codeGrounds, search, option } = this.state;
    let filtered;

    if (option === 'title')
      filtered = codeGrounds.filter((codeGround) =>
        codeGround.title.includes(search),
      );
    if (option === 'user')
      filtered = codeGrounds.filter((codeGround) =>
        codeGround.user.username.includes(search),
      );
    if (option === 'html')
      filtered = codeGrounds.filter((codeGround) =>
        codeGround.html.includes(search),
      );
    if (option === 'css')
      filtered = codeGrounds.filter((codeGround) =>
        codeGround.css.includes(search),
      );
    if (option === 'js')
      filtered = codeGrounds.filter((codeGround) =>
        codeGround.title.includes(search),
      );

    return filtered
      ? filtered.map((each) => <ResultField>{each}</ResultField>)
      : null;
  };

  render() {
    return (
      <HomeContainer>
        <SearchBarContainer
          search={this.state.search}
          handleSearch={this.handleSearch}
          handleSelect={this.handleSelect}
        />
        <ResultsContainer>{this.displayResults()}</ResultsContainer>
      </HomeContainer>
    );
  }
}
