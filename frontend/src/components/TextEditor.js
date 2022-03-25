import axios from 'axios';
import { convertToRaw, EditorState } from 'draft-js';
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

  const [markup, setMarkup] = useState('');

  const [header, setHeader] = useState('');

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const handlePostSubmit = () => {
    callPostApi();
    setEditorState(() => EditorState.createEmpty());
    setHeader('');
  };

  const callPostApi = async () => {
    let content = convertToRaw(editorState.getCurrentContent());
    setMarkup(
      draftToHtml(
        content,
        {
          trigger: '#',
          separator: ' ',
        },
        true,
        true
      )
    );
    if (content.blocks[0].text.length === 0) {
      console.log("cant't post");
      return;
    }

    let token = localStorage.getItem('access_token');
    let decodeToken = jwtDecode(token);
    let userInfo = {
      name: decodeToken.username,
      email: decodeToken.email,
    };

    let result = await axios.post(`${config.apiUrlPrefix}/post`, {
      postBy: userInfo.name,
      email: userInfo.email,
      header,
      content,
    });
  };

  const uploadImageCallBack = (file) => {
    //
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'https://api.imageshack.com/v2/images');
      // xhr.setRequestHeader('Authorization', 'Client-ID b8affd4811a4f79');
      const data = new FormData();
      data.append('key', 'KRQZ04X6eb8c3526cfdb6d40114684bc99f90ba3')
      data.append('fileupload', file);
      xhr.send(data);
      xhr.addEventListener('load', () => {
        const response = JSON.parse(xhr.responseText);
        console.log(response);
        resolve(response);
      });
      xhr.addEventListener('error', () => {
        const error = JSON.parse(xhr.responseText);
        console.log(error);
        reject(error);
      });
    });
    // console.log(file);
    // return new Promise((resolve, reject) => {
    //   if (file) {
    //     axios({
    //       method: 'POST',
    //       url: 'https://api.imageshack.com/v2/images',
    //       data: {
    //         'key': 'KRQZ04X6eb8c3526cfdb6d40114684bc99f90ba3',
    //         'fileupload': file
    //       },
    //       headers: {
    //         'Content-Type': 'multipart/form-data'
    //       }
    //     }).then(res => console.log(res))
    //   }
    // });
    // return new Promise((resolve, reject) => {
    //   const imageObject = {
    //     file: file,
    //     localSrc: URL.createObjectURL(file),
    //   }
    //   const data = new FormData();
    //   data.append('fileupload', file);
    //   console.log(data);
    //   axios.post('http://localhost:8001/api/upload', imageObject).then((responseImage) => {
    //     resolve({ data: { link: responseImage.data.link } });
    //   });
    // });
  };
  console.log(header);
  const createMarkup = () => {
    return { __html: `${markup}` };
  };
  return (
    <div className="w-9/12 mx-auto shadow-lg p-5 my-20">
      <div className="mb-6">
        <label
          htmlFor="base-input"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Header
        </label>
        <input
          type="text"
          id="base-input"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={(e) => setHeader(e.target.value)}
          value={header}
        />
      </div>
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
