import React, { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

function TextEditor() {
  const [editorState, setEditorState] = useState('');

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    console.log(editorState);
  };

  const uploadImageCallBack = (file) => {
    const imageObject = {
      file: file,
      localSrc: URL.createObjectURL(file),
    }
    console.log(imageObject)
    return new Promise(
      (resolve, reject) => {
        resolve({ data: { link: imageObject.localSrc } });
      }
    );
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
          toolbar={{
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
            image: {
              uploadCallback: uploadImageCallBack,
              alt: { present: false, mandatory: false },
              previewImage: true
            },
          }}
        />
      </div>
      <div className="flex justify-end">
        <button className="bg-gray-200 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
          Post
        </button>
      </div>
    </div>
  );
}

export default TextEditor;
