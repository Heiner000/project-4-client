import { useState, useEffect } from 'react'
import axios from 'axios'
import './styles/login.css'
import API from '../API'


export default function Login() {

    const [login, setLogin] = useState(false)
    const [signup, setSignup] = useState(false)
    const [username, setUsername] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [zipCode, setZipCode] = useState('')
    const [error, setError] = useState('')
    const loginButton = document.querySelector('.login-btn')
    const signupButton = document.querySelector('.signup-btn')


    // SIGNUP FUNCTION
    const handleSignup = async (e) => {
        e.preventDefault()
        const user = {
            username: username,
            password: userPassword,
            zip_code: zipCode,
        }
            const response = await API.post('register/', user)
            console.log(response.data.access)
            localStorage.clear()
            localStorage.setItem('access', response.data.access)
            localStorage.setItem('refresh', response.data.refresh)
            console.log(localStorage)
            window.location.href = '/homepage'
            
    }


    // LOGIN FUNCTION
    const handleLogin = async (e) => {
        e.preventDefault()
        const user = {
            username: username,
            password: userPassword
        }
        const {data} = await API.post('token/', user,
        {
            headers: {'Content-Type': 'application/json'}
        })
        console.log(data)
        localStorage.clear()
        localStorage.setItem('access', data.access)
        localStorage.setItem('refresh', data.refresh)
        axios.defaults.headers.common['Authorization'] = `Bearer ${data['access']}`
        window.location.href = '/homepage'
        
    }


    // RENDERS LOGIN/SIGNUP FORMS
    const loginClick = () => {
        setLogin(true)
        setSignup(false)
    }
    const signupClick = () => {
        setSignup(true)
        setLogin(false)
    }

    // LOGOUT FUNCTION
    const handleLogout = () => {
        // Remove the tokens from local storage
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')
      
        // Update state 
        setLogin(false)
      }
      


    return (
        <div className='main-landing'>
            <div className='title'>
                <h1>SimuStock</h1>
                <img className='logo' src="../../images/logo.png" alt="stock logo" />
            </div>

            <div className='btn-div'>
                <button className='login-btn' onClick={() => loginClick()}>Log In</button>
                <button className='signup-btn' onClick={() => signupClick()}>Sign Up</button>
            </div>

            {signup ?

                // SIGNUP FORM
                <form onSubmit={handleSignup} className='form-container'>

                    <label>Username</label>
                    <input type='text' name='username'
                        onChange={(e) => setUsername(e.target.value)} placeholder='Username'></input>

                    <label>Password</label>
                    <input type='password' name='password'
                        onChange={(e) => setUserPassword(e.target.value)}
                        placeholder='Password'></input>

                    <label>Zip Code</label>
                    <input type='text' name='zipCode'
                        onChange={(e) => setZipCode(e.target.value)} placeholder='Zip Code'></input>

                    <input className='btn' type="submit" value="Signup" />

                </form>

                :
                // LOGIN FORM
                <form onSubmit={handleLogin} className='form-container'>

                    <label>Username</label>
                    <input type='text' value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder='username'></input>

                    <label>Password</label>
                    <input type='password' value={userPassword}
                        onChange={(e) => setUserPassword(e.target.value)}
                        placeholder='password'></input>

                    <input className='btn' type="submit" value='Login' />

                </form>
            }
        </div>
    )
}