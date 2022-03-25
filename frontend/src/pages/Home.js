import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import PostList from '../components/PostList';

function Home() {
  const [postButton, setPostButton] = useState(false);
  return (
    <div>
      <NavBar />
      <h1 className="text-center">Home</h1>
      <PostList />
      <div className="w-20 absolute bottom-10 right-10">
        <Link to="/post">
          <button
            type="button"
            className="text-white bg-gray-700 border border-gray-300 focus:outline-none hover:bg-gray-600 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            Post
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
