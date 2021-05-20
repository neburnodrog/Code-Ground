import React from 'react';
import styled from 'styled-components';
import SearchBar from '../Components/SearchBar/SearchBar';
import GroundCard from '../Components/CodeGround/CodeGroundCard';
import { CodeGroundPopulated } from '../../../src/models/CodeGround';
import { UserDocument } from '../../../src/models/User';
import { fetchAll } from '../services/codeground';
import { RouteComponentProps } from 'react-router-dom';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const ResultsContainerOuter = styled.div`
  width: 92%;
  min-height: 80vh;
  display: flex;
  flex-flow: row wrap;
  align-content: flex-start;
  justify-content: center;
  align-items: center;
  margin: 0em;
  background: #2b2d3b;
  border-radius: 2mm;
`;

const SearchBarContainer = styled(SearchBar)`
  flex-grow: 1;
`;

const Loading = styled.h1`
  text-align: center;
  font-size: 5em;
  color: tomato;
`;

interface HomeState {
  codeGrounds: CodeGroundPopulated[];
  search: string;
  option: string;
}

interface HomeProps extends RouteComponentProps {
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
      .then((codeGrounds) => {
        this.setState({ codeGrounds: codeGrounds });
      })
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
    const { user, ...rest } = this.props;

    let filtered;

    if (option === 'title')
      filtered = codeGrounds.filter((codeGround) =>
        codeGround.title.toLowerCase().includes(search.toLowerCase()),
      );
    if (option === 'user')
      filtered = codeGrounds.filter((codeGround) =>
        codeGround.user.username.toLowerCase().includes(search.toLowerCase()),
      );
    if (option === 'html')
      filtered = codeGrounds.filter((codeGround) =>
        codeGround.html.toLowerCase().includes(search.toLowerCase()),
      );
    if (option === 'css')
      filtered = codeGrounds.filter((codeGround) =>
        codeGround.css.toLowerCase().includes(search.toLowerCase()),
      );
    if (option === 'js')
      filtered = codeGrounds.filter((codeGround) =>
        codeGround.title.toLowerCase().includes(search.toLowerCase()),
      );

    return filtered
      ? filtered.map((ground) => (
          <GroundCard
            key={ground._id}
            user={user}
            userOwnsGround={user ? ground.user._id === user._id : false}
            codeGround={ground}
            liked={user ? ground.likes.includes(user._id) : false}
            favourited={user ? user.favourites.includes(ground._id) : false}
            {...rest}
          />
        ))
      : null;
  };

  render() {
    const { search, codeGrounds } = this.state;

    if (codeGrounds.length === 0) {
      return <Loading>Loading</Loading>;
    }

    return (
      <HomeContainer>
        <SearchBarContainer
          search={search}
          handleSearch={this.handleSearch}
          handleSelect={this.handleSelect}
        />
        <ResultsContainerOuter>{this.displayResults()}</ResultsContainerOuter>
      </HomeContainer>
    );
  }
}
