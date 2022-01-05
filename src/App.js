import React, { useContext } from 'react';
import { LoginPage } from './pages/Login/LoginPage';
import { MainPage } from './pages/Main/MainPage';
import { UserContext } from './context/UserContext';
import './App.css';

function App() {
  const { loggedIn } = useContext(UserContext);
  return <div className='App'>{loggedIn ? <MainPage /> : <LoginPage />}</div>;
}

export default App;
