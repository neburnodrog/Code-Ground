import React, { useState } from 'react';
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

import { ExpandAlt, CompressAlt } from '@styled-icons/fa-solid';
import { WrapperButton } from '../StyledComponents/IconsButtons';

const EditorContainer = styled.div<{ collapsed: boolean }>`
  margin: 0;
  display: flex;
  /* max-width: 33.3vw; */
  flex-direction: column;
  ${(props) => (props.collapsed ? 'flex: 0 0 0' : 'flex: 5 0 0;')}
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

const IconWrapper = styled(WrapperButton)`
  padding: 0.4em;
  &:hover {
    background: #233dff;
  }
  transition: background 1s;
`;

export interface EditorProps {
  language: string;
  displayName: string;
  value: string;
  onChange: (value: string) => void;
}

export function CodeEditor(props: EditorProps) {
  const { language, displayName, value, onChange } = props;
  const [collapsed, toggleCollapsed] = useState(false);

  const handleChange = (editor: Editor, data: EditorChange, value: string) => {
    onChange(value);
  };

  const handleToggleCollapsed = () => {
    toggleCollapsed((prevState) => !prevState);
  };

  return (
    <EditorContainer collapsed={collapsed}>
      <EditorTitle>
        {displayName}
        <IconWrapper onClick={handleToggleCollapsed}>
          {collapsed ? (
            <CompressAlt size={'1.2em'} />
          ) : (
            <ExpandAlt size={'1.2em'} />
          )}
        </IconWrapper>
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
