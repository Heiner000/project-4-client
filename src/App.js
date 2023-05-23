import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import Login from './pages/Login';
import HomePage from './pages/HomePage';
import Portfolio from './pages/Portfolio';
import Company from './pages/Company';
import Profile from './pages/Profile';
import React from 'react'
import jwtDecode from 'jwt-decode'
// import { UserContext } from './UserContext'
import { useState, useEffect, createContext } from 'react'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null)
  
  useEffect(() => {
    const token = localStorage.getItem('access')
    if (token) {
      const decodedToken = jwtDecode(token)
      setUserId(decodedToken.user_id)
    }
  }, [])

  return (
    <UserContext.Provider value={userId}>
      {children}
    </UserContext.Provider>
  )

}
  

function App() {



  return (
    <UserProvider>
    <Router>
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
    </UserProvider>
  );
}

export default App;
