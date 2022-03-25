import axios from 'axios';
import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import config from '../config';
import draftToHtml from 'draftjs-to-html';
import Card from '@material-tailwind/react/Card';
import CardBody from '@material-tailwind/react/CardBody';
import CardFooter from '@material-tailwind/react/CardFooter';
import H6 from '@material-tailwind/react/Heading6';
import Paragraph from '@material-tailwind/react/Paragraph';
import Button from '@material-tailwind/react/Button';
import { Link } from 'react-router-dom';

function Post() {
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let result = await axios.get(`${config.apiUrlPrefix}/getPost`);
      setPostList(result.data);
    };
    fetchData();
  }, []);
  console.log();
  return postList.map((list) => {
    return (
      //   <div
      //     key={list._id}
      //     className="flex justify-center"
      //     dangerouslySetInnerHTML={{
      //       __html: draftToHtml(
      //         list.content,
      //         {
      //           trigger: '#',
      //           separator: ' ',
      //         },
      //         true,
      //         true
      //       ),
      //     }}
      //   ></div>
      <div key={list.header}>
        <a
          href={'/detail?header=' + `${list.header}`}
          className="flex justify-center items-center hover:cursor-pointer hover:scale-105 shadow-sm transition ease-in-out w-9/12 mx-auto my-10 rounded-lg w-50"
        >
          <Card>
            <CardBody>
              <H6 color="gray">{list.header}</H6>
              <Paragraph color="gray">
                <div
                  dangerouslySetInnerHTML={{
                    __html: draftToHtml(
                      list.content,
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
              <Button color="lightBlue" size="lg" ripple="light">
                Read More
              </Button>
            </CardFooter>
          </Card>
        </a>
      </div>
    );
  });
}

export default Post;
