import React, { Component, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

function TextEditor() {
  const [editorState, setEditorState] = useState('');

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    console.log(editorState);
  };

  return (
    <div className="w-9/12 mx-auto shadow-md p-5">
      <div>
        <Editor
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={onEditorStateChange}
        />
      </div>
      <div className='flex justify-end'>
      <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
        Post
      </button>
      </div>
    </div>
  );
}

export default TextEditor;
