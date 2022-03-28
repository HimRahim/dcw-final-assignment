import { useState } from 'react';
import Login from './pages/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import jwtDecode from 'jwt-decode';
import AboutMe from './pages/AboutMe';
import PostPage from './pages/PostPage';
import Detail from './pages/Detail';

function App() {
  const [token, setToken] = useState(localStorage.getItem('access_token'));

  if (!token || jwtDecode(token).exp < Date.now() / 1000) {
    return <Login setToken={setToken} />;
  }

  return (
    <div className="App bg-gray-100 h-full">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/detail" element={<Detail />}></Route>
          <Route path="/post" element={<PostPage />}></Route>
          <Route path="aboutme" element={<AboutMe />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
