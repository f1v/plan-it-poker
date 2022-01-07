import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainPage } from './pages/Main/MainPage';
import './App.css';
import { LandingPage } from './pages/Landing/LandingPage';

function App() {
  useEffect(() => {
    console.log('location =>', window.location.pathname);
  }, []);
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/:id' element={<MainPage />} />
      </Routes>
    </div>
  );
}

export default App;
