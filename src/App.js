import React, { useContext, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { LoginPage } from './pages/Login/LoginPage';
import { MainPage } from './pages/Main/MainPage';
import { UserContext } from './context/UserContext';
import './App.css';

function App() {
  const { loggedIn } = useContext(UserContext);

  useEffect(() => {
    console.log('location =>', window.location.pathname);
  }, []);
  return (
    <div className='App'>
      <Routes>
        <Route path='/:id' element={loggedIn ? <MainPage /> : <LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
