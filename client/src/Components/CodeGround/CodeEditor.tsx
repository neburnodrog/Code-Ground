import React from 'react';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material-ocean.css';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import 'codemirror/addon/search/searchcursor';
import { Controlled } from 'react-codemirror2';
import styled from 'styled-components';
import { Editor, EditorChange } from 'codemirror';
import './CodeEditor.css';

import { Expand } from '@styled-icons/fa-solid';

const EditorContainer = styled.div`
  margin: 0;
  flex: 1 0 0;
  display: flex;
  max-width: 33.3vw;
  flex-direction: column;
`;

const EditorTitle = styled.div`
  font-weight: 800;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.2em 1em;
  background: #0a0c11;
  color: #cbd1e1;
  margin: 0.1em 0.1em 0.1em;
`;

export interface EditorProps {
  language: string;
  displayName: string;
  value: string;
  onChange: (value: string) => void;
}

export function CodeEditor(props: EditorProps) {
  const { language, displayName, value, onChange } = props;

  const handleChange = (editor: Editor, data: EditorChange, value: string) => {
    onChange(value);
  };

  return (
    <EditorContainer>
      <EditorTitle>
        {displayName}
        <Expand size={'1em'} />
      </EditorTitle>
      <Controlled
        onBeforeChange={handleChange}
        value={value}
        className="code-mirror-wrapper"
        options={{
          lineWrapping: true,
          mode: language,
          gutters: ['CodeMirror-lint-markers'],
          lineNumbers: true,
          theme: 'material-ocean',
          tabSize: 2,
          scrollbarStyle: 'native',
        }}
      />
    </EditorContainer>
  );
}
