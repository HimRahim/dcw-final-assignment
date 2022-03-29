import axios from 'axios';
import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import config from '../config';
import draftToHtml from 'draftjs-to-html';
import Card from '@material-tailwind/react/Card';
import CardBody from '@material-tailwind/react/CardBody';
import Paragraph from '@material-tailwind/react/Paragraph';

function Post() {
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let result = await axios.get(`${config.apiUrlPrefix}/getPost`);
      setPostList(result.data);
    };
    fetchData();
  }, []);
  return postList.map((list) => {
    return (
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
          </Card>
        </div>
      </div>
    );
  });
}

export default Post;
