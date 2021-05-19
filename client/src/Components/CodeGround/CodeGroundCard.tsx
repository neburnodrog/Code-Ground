import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { CodeGroundPopulated } from '../../../../src/models/CodeGround';
// import { UserDocument } from '../../../../src/models/User';
import {
  CodeBranch,
  Bookmark,
  ThumbsUp,
  Comments,
} from '@styled-icons/fa-solid';
import { Bookmark as EmptyBookmark } from '@styled-icons/fa-regular';
import { WrapperButton } from '../StyledComponents/IconsButtons';

const ResultFieldContainer = styled.article`
  display: flex;
  flex-direction: column;
  width: 25vw;
  background: #2b2d3b;
  margin: 1em;
  padding: 0.3em;
  border: 2px solid #f4f6fc;
  border-radius: 0.4em;
  box-shadow: 0.7em 0.7em 0.5em 0em #131522;
`;

const ThumbnailWrapper = styled.div`
  overflow: hidden;
`;

const DetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  flex: 1 0 auto;
  background: #131522;
  border-top-left-radius: 0.3em;
  border-top-right-radius: 0.3em;
  padding: 0.5em 0em;
`;

const OptionsWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.2em;
  justify-content: center;
`;

const StyledIframe = styled.iframe`
  width: 100%;
  height: 100%;
  /* overflow: hidden; */

  &:after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
`;

const IconWrapper = styled(WrapperButton)`
  margin-top: 0em;
  background: #131522;
  border-radius: 0.2em;
  padding: 0.5em;
  margin: 0em 0.2em;
`;

const Span = styled.span`
  margin-left: 0.5em;
`;

export interface GroundCardProps {
  codeGround: CodeGroundPopulated;
  userLoggedIn: boolean;
  userOwnsGround: boolean;
  isCreator: boolean;
}

const GroundCard: React.FC<GroundCardProps> = (props) => {
  const { codeGround, userLoggedIn, userOwnsGround, isCreator } = props;

  const srcDoc = `
  <html>
    <head>
      <style>${codeGround.css}</style>
    </head>
    <body>${codeGround.html}</body>
    <script>${codeGround.js}</script>
  </html>
  `;

  const renderInteractionButtons = () => {
    return (
      <>
        <IconWrapper>
          <ThumbsUp size={'1.2em'} />
          <Span> {codeGround.likes.length}</Span>
        </IconWrapper>

        <IconWrapper>
          <Bookmark size={'1.2em'} />
        </IconWrapper>

        <IconWrapper>
          <CodeBranch size={'1.2em'} />
        </IconWrapper>
      </>
    );
  };

  const renderEditOptions = () => {
    return (
      <>
        <small>creator options...</small>
      </>
    );
  };

  return (
    <ResultFieldContainer>
      <Link to={`/code-ground/${codeGround._id}`}>
        <DetailsWrapper>
          <h4>{codeGround.title}</h4>
          <small>forked by: {codeGround.user.username}</small>
          <small>created by: {codeGround.creator.username}</small>
        </DetailsWrapper>
      </Link>

      <ThumbnailWrapper>
        <StyledIframe
          title={codeGround.title}
          srcDoc={srcDoc}
          sandbox="allow-scripts"
          frameBorder="0"
        ></StyledIframe>
      </ThumbnailWrapper>

      <OptionsWrapper>
        {userLoggedIn && !userOwnsGround ? renderInteractionButtons() : null}
        {userOwnsGround ? renderEditOptions() : null}

        <IconWrapper>
          <Comments size={'1.2em'} />
          <Span> {codeGround.comments.length}</Span>
        </IconWrapper>
      </OptionsWrapper>
    </ResultFieldContainer>
  );
};

export default GroundCard;
