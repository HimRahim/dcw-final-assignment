import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import config from '../config';
import draftToHtml from 'draftjs-to-html';
import Card from '@material-tailwind/react/Card';
import CardBody from '@material-tailwind/react/CardBody';
import CardFooter from '@material-tailwind/react/CardFooter';
import Paragraph from '@material-tailwind/react/Paragraph';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {
  convertFromRaw,
  convertToRaw,
  EditorState,
} from 'draft-js';

function AboutMe() {
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
  const [info, setInfo] = useState({
    name: '',
    email: '',
    picture: '',
  });
  const [edit, setEdit] = useState(false);
  const [postList, setPostList] = useState([]);
  useEffect(() => {
    const fecthData = async () => {
      let result = await axios.get(`${config.apiUrlPrefix}/info`);
      console.log(result.data);
      setInfo({
        name: result.data.name,
        email: result.data.email,
        picture: result.data.picture,
      });
      let result2 = await axios.post(`${config.apiUrlPrefix}/getUserPost`, {
        user: result.data.name,
      });
      setPostList(result2.data);
    };
    fecthData();
  });

  
  const [oldHeader, setOldHeader] = useState('');
  const [newHeader, setNewHeader] = useState('');
  const [oldContent, setOldContent] = useState({});
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const onEditorStateChange = (State) => {
    setEditorState(State);
  };
  const handleEditSubmit = async () => {
    let data = {
      email: info.email,
      postBy: info.name,
      oldHeader,
      newHeader,
      oldContent,
      newContent: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
    };
    console.log(data);
    let result = await axios.put(`${config.apiUrlPrefix}/updatePost`, data);
    console.log(result.data);
    setEditorState(() => EditorState.createEmpty());
    setNewHeader('');
    setEdit(false)
  };
  const handleDeleteSubmit = async (list) => {
    
    let result = await axios.delete(`${config.apiUrlPrefix}/deletePost`, {data: list});
    console.log(result.data)
  }
  return (
    <div className="min-h-screen">
      <NavBar />
      <div className="flex justify-center items-center flex-col">
        <img src={info.picture} alt="" className="my-5" />
        <h1 className="my-5">{info.name}</h1>
        <h1 className="my-5">{info.email}</h1>
      </div>
      {edit && (
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
              onChange={(e) => setNewHeader(e.target.value)}
              value={newHeader}
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
                // image: {
                //   // uploadCallback: uploadImageCallBack,
                //   alt: { present: false, mandatory: false },
                //   previewImage: true,
                // },
              }}
            />
          </div>
          <div className="flex justify-end">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mx-2"
              onClick={handleEditSubmit}
            >
              Edit
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mx-2"
              onClick={() => setEdit(false)}
            >
              Cancle
            </button>
          </div>
        </div>
      )}
      {!edit &&
        postList.map((list) => (
          <div
            key={list.header}
            className="w-9/12 flex justify-center items-center mx-auto"
          >
            <div className="shadow-sm  w-9/12 my-5 rounded-lg w-50">
              <Card>
                <CardBody>
                  <img
                    className="w-10 h-10 rounded-full inline"
                    src={list.picture}
                    alt="avatar"
                  />
                  <h1 className="inline text-2xl relative left-3 top-1">
                    {list.postBy}
                  </h1>
                  <h2 className="text-3xl">{list.header}</h2>
                  <Paragraph color="gray">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: draftToHtml(
                          JSON.parse(list.content),
                          {
                            trigger: '#',
                            separator: ' ',
                          },
                          true,
                          true
                        ),
                      }}
                    ></div>
                  </Paragraph>
                </CardBody>

                <CardFooter>
                  <div className="flex justify-end">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-3"
                      onClick={() => {
                        setOldHeader(list.header);
                        setNewHeader(list.header);
                        setOldContent(list.content);
                        setEditorState(() =>
                          EditorState.createWithContent(
                            convertFromRaw(JSON.parse(list.content))
                          )
                        );
                        setEdit(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mx-3"
                      onClick={() => handleDeleteSubmit(list)}
                    >
                      Delete
                    </button>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        ))}
    </div>
  );
}

export default AboutMe;
