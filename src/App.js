import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import Login from './pages/Login';
import HomePage from './pages/HomePage';
import Portfolio from './pages/Portfolio';
import Company from './pages/Company';
import Profile from './pages/Profile';
import Header from './pages/Header';
import React from 'react'
import Followers from './pages/Followers'


function App() {


  return (
    <Router>
      <Header />
      <Routes>

        <Route
          path='/homepage'
          element={<HomePage />}
        />
        <Route
          path='/profile'
          element={<Profile />}
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
        <Route
          path='/login'
          element={<Login />}
        />


      </Routes>
    </Router>
  );
}

export default App;
