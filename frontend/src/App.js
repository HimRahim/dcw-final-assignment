import { useEffect, useState } from 'react';
import Login from './pages/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import jwtDecode from 'jwt-decode';

function App() {
  const [token, setToken] = useState(sessionStorage.getItem('access_token'));

  if (!token || jwtDecode(token).exp < Date.now() / 1000) {
    return <Login setToken={setToken} />;
  }
  // if (jwtDecode(token).exp < Date.now() / 1000)
  //   return <Login setToken={setToken} />;

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
      {/* <Login/> */}
    </div>
  );
}

export default App;
