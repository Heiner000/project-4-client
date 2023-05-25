import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react';
import './App.css';
import Login from './pages/Login';
import HomePage from './pages/HomePage';
import Portfolio from './pages/Portfolio';
import Company from './pages/Company';
import Header from './pages/Header';
import React from 'react'
import Followers from './pages/Followers'


function App() {

  const [userFunds, setUserFunds] = useState();

  return (
    <Router>
      <Routes>
        <Route
          path='/login'
          element={<Login />}
        />
        <Route path="/*" element={
          <>
            <Header setUserFunds={setUserFunds} userFunds={userFunds} />
            <Routes>
              <Route
                path='/homepage'
                element={<HomePage 
                  setUserFunds={setUserFunds} userFunds={userFunds} />}
              />
              <Route
                path='/followers'
                element={<Followers />}
              />
              <Route
                path='/company/:ticker'
                element={<Company />}
              />
              <Route
                path='/portfolio'
                element={<Portfolio />}
              />
            </Routes>
          </>
        }/>
      </Routes>
    </Router>
  );
}

export default App;

