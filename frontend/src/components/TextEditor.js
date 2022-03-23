import axios from 'axios';
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import React, { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import config from '../config';
import draftToHtml from 'draftjs-to-html';
import jwtDecode from 'jwt-decode';

function TextEditor() {
  axios.interceptors.request.use(
    function (packet) {
      const token = localStorage.getItem('access_token');
      if (token) packet.headers['Authorization'] = `Bearer ${token}`;
      return packet;
    },
    function (err) {
      return Promise.reject(err);
    }
  );

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const handlePostSubmit = () => {
    callPostApi();
    setEditorState(() => EditorState.createEmpty());
  };

  const callPostApi = async () => {
    let token = localStorage.getItem('access_token');
    let decodeToken = jwtDecode(token)
    let userInfo = {
      name: decodeToken.username,
      email: decodeToken.email
    }
    let result = await axios.post(`${config.apiUrlPrefix}/post`, {
      postBy: userInfo.name,
      email: userInfo.email,
      content: convertToRaw(editorState.getCurrentContent()),
    });
    setRawContentState(result.data)
  };

  const [rawContentState, setRawContentState] = useState({});

  const markup = draftToHtml(
    rawContentState,
    {
      trigger: '#',
      separator: ' ',
    },
    true,
    true
  );

  const uploadImageCallBack = (file) => {
    const imageObject = {
      file: file,
      localSrc: URL.createObjectURL(file),
    };
    console.log(imageObject);
    return new Promise((resolve, reject) => {
      resolve({ data: { link: imageObject.localSrc } });
    });
  };
  console.log(markup);
  const createMarkup = () => {
    return { __html: `${markup}` };
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
              previewImage: true,
            },
          }}
        />
      </div>
      <div className="flex justify-end">
        <button
          className="bg-gray-200 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          onClick={handlePostSubmit}
        >
          Post
        </button>
      </div>
      <div dangerouslySetInnerHTML={createMarkup()}></div>
    </div>
  );
}

export default TextEditor;
