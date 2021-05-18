import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import { fetchOne, saveCodeGround } from '../services/codeground';
import { CodeGroundDocument } from '../../../src/models/CodeGround';
import { UserDocument } from '../../../src/models/User';
import { CodeEditor } from '../Components/CodeGround/CodeEditor';
import CodeGroundTitle from '../Components/CodeGround/CodeGroundTitle';
import CodeGroundBar from '../Components/CodeGround/CodeGroundBar';

const CodeGroundWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 92vh;
  flex-grow: 1;
`;

const EditorsWrapper = styled.div`
  display: flex;
  justify-content: center;
  /* flex-flow: column; */
  width: 100%;
  max-height: 29vh;
  flex: 0 0 0;
`;

const IframeWrapper = styled.div`
  flex: 2 0 0;
  width: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
`;

export interface CodeGroundProps {
  id?: string;
  user: UserDocument | null;
  setNotSavedCodeGround: Dispatch<SetStateAction<boolean>>;
  notSavedCodeGround: boolean;
}

const OuterWrapper = styled.div`
  display: flex;
  height: 94.5vh;
`;

export default function CodeGround(props: CodeGroundProps) {
  const { id, user, setNotSavedCodeGround, notSavedCodeGround } = props;
  const [title, setTitle] = useState('untitled');
  const [html, setHtml] = useState('');
  const [css, setCss] = useState('');
  const [js, setJs] = useState('');
  const [srcDoc, setSrcDoc] = useState('');
  const [creator, setCreator] = useState('');

  const defaultCss = '<style>body{margin:0}</style>';

  useEffect(() => {
    if (notSavedCodeGround) {
      setTitle(window.localStorage.getItem('title')!);
      setHtml(window.localStorage.getItem('html')!);
      setCss(window.localStorage.getItem('css')!);
      setJs(window.localStorage.getItem('js')!);
    } else if (id) {
      fetchOne(id)
        .then((codeGround) => {
          setTitle(codeGround.title);
          setHtml(codeGround.html);
          setCss(codeGround.css);
          setJs(codeGround.js);
          setCreator(codeGround.user);
        })
        .catch((err) => console.log(err));
    } else if (user) {
      setCreator(user._id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
      <html>
        <head>
          ${defaultCss}
          <style>${css}</style>
        </head>
        <body>${html}</body>
        <script>${js}</script>
      </html>
      `);
    }, 500);

    return () => clearTimeout(timeout);
  }, [html, css, js]);

  const handleSave = () => {
    const { user } = props;

    if (!user) {
      window.localStorage.setItem('title', title);
      window.localStorage.setItem('html', html);
      window.localStorage.setItem('css', css);
      window.localStorage.setItem('js', js);

      props.setNotSavedCodeGround(true);
      (() => <Redirect to="login" />)();
    } else {
      saveCodeGround(title, html, css, js, user._id);
    }
  };

  return (
    <OuterWrapper>
      <CodeGroundBar handleSave={handleSave} />
      <CodeGroundWrapper>
        <CodeGroundTitle title={title} setTitle={setTitle} />
        <EditorsWrapper>
          <CodeEditor
            displayName="HTML"
            language="xml"
            value={html}
            onChange={setHtml}
          />
          <CodeEditor
            displayName="CSS"
            language="css"
            value={css}
            onChange={setCss}
          />
          <CodeEditor
            displayName="JS"
            language="javascript"
            value={js}
            onChange={setJs}
          />
        </EditorsWrapper>
        <IframeWrapper>
          <iframe
            srcDoc={srcDoc}
            title="rendered-ground"
            frameBorder="0"
            sandbox="allow-scripts"
            width="100%"
            height="100%"
            style={{ flex: '1 0 0' }}
          ></iframe>
        </IframeWrapper>
      </CodeGroundWrapper>
    </OuterWrapper>
  );
}
