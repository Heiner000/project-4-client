import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import Login from './pages/Login';
import HomePage from './pages/HomePage';
import Portfolio from './pages/Portfolio';
import Company from './pages/Company';
import Profile from './pages/Profile';
import Header from './pages/Header';
import React from 'react'



function App() {
  

  return (
    <Router>
      <Header/>
      <Routes>

        <Route 
          path='/profile'
          element={<Profile/>}
        />
        <Route 
          path='/company/:ticker'
          element={<Company/>}
        />
        <Route 
          path='/portfolio'
          element={<Portfolio/>}
        />
        <Route 
          path='/login'
          element={<Login/>}
        />
        <Route 
          path='/homepage'
          element={<HomePage/>}
        />
        
      </Routes>
    </Router>
  );
}

export default App;
