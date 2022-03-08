import { useEffect, useState } from 'react';
import Login from './pages/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'

function App() {

  const [token, setToken] = useState(sessionStorage.getItem('access_token'));

  if(!token) {
    return <Login setToken={setToken} />
  }
  return (
    
    <div className="App">
      <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}>
      </Route>
    </Routes>
  </BrowserRouter>
    </div>
  );
}

export default App;
