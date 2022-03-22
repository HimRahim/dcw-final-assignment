import { useState } from 'react';
import Login from './pages/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import jwtDecode from 'jwt-decode';
import AboutMe from './pages/AboutMe';
import Post from './pages/Post';

function App() {
  const [token, setToken] = useState(localStorage.getItem('access_token'));

  // if (!token || jwtDecode(token).exp < Date.now() / 1000) {
  //   return <Login setToken={setToken} />;
  // }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/aboutme" element={<AboutMe />}></Route>
          <Route path="/post" element={<Post />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
