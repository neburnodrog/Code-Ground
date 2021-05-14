import React from 'react';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material-ocean.css';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import 'codemirror/addon/lint/lint';
import 'codemirror/addon/lint/javascript-lint';
import 'codemirror/addon/lint/css-lint';
import 'codemirror/addon/search/searchcursor';
import { Controlled } from 'react-codemirror2';
import styled from 'styled-components';
import { Editor, EditorChange } from 'codemirror';
import './CodeEditor.css';

const EditorContainer = styled.div`
  margin: 0;
  flex: 1 0 0;
  display: flex;
  flex-direction: column;
`;

const EditorTitle = styled.div`
  display: flex;
  justify-content: space-between;
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
        <button>O/C</button>
      </EditorTitle>
      <Controlled
        onBeforeChange={handleChange}
        value={value}
        className="code-mirror-wrapper"
        options={{
          lineWrapping: true,
          lint: true,
          mode: language,
          lineNumbers: true,
          gutters: ['codeMirror-lint-markers'],
          theme: 'material-ocean',
          tabSize: 2,
          scrollbarStyle: 'null',
        }}
      />
    </EditorContainer>
  );
}
