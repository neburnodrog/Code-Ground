import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { CodeEditor } from './CodeEditor';

const CodeGroundWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 95vh;
`;

const EditorsWrapper = styled.div`
  display: flex;
  /* flex-flow: column; */
  width: 100%;
  flex: 1 0 0;
`;

const IframeWrapper = styled.div`
  flex: 2 0 0;
  width: 100%;
  background-color: white;
`;

export default function CodeGround() {
  const [html, setHtml] = useState('');
  const [css, setCss] = useState('');
  const [js, setJs] = useState('');
  const [srcDoc, setSrcDoc] = useState('');

  const defaultCss = '<style>body{margin:0}</style>';

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

  return (
    <CodeGroundWrapper>
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
        ></iframe>
      </IframeWrapper>
    </CodeGroundWrapper>
  );
}
