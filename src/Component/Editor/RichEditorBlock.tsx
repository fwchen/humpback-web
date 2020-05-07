import React, { useEffect, useRef, useState } from 'react';
import { ContentState, DraftHandleValue, Editor, EditorState } from 'draft-js';
import { IconButton } from '../Button/IconButton';
import { faEllipsisV, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Flex } from '../Flex';

import './RichEditorBlock.css';

export function RichEditorBlock(props: {
  handleReturn: (content: string) => void;
  isNew: boolean;
  initContent: string;
  onBlur: () => void;
  onChange: (content: string) => void;
}) {
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(ContentState.createFromText(props.initContent))
  );
  const onChange = (editorState) => {
    setEditorState(editorState);
    props.onChange(editorState.getCurrentContent().getPlainText());
  };

  const onBlur = (editorState) => {
    props.onBlur();
  };

  const editorRef = useRef(null);

  const handleReturn = (e: React.KeyboardEvent<{}>, editorState: EditorState): DraftHandleValue => {
    editorRef.current.blur();
    e.preventDefault();
    props.handleReturn(editorState.getCurrentContent().getPlainText());
    return 'handled';
  };

  useEffect(() => {
    if (props.isNew) {
      editorRef.current.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editorRef]);

  return (
    <Flex alignCenter className="RichEditorBlock-root">
      <div className="RichEditorBlock-operation">
        <IconButton icon={faPlus} />
        <IconButton icon={faEllipsisV} />
      </div>
      <Editor
        ref={editorRef}
        placeholder="Typing here."
        editorState={editorState}
        onChange={onChange}
        onBlur={onBlur}
        handleReturn={handleReturn}
      />
    </Flex>
  );
}
