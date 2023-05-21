import { useState, useEffect } from 'react'
import axios from 'axios'
import './styles/login.css'


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
        const payload = {
            username,
            password: userPassword,
            zip_code: zipCode,
        }
        try {
            // send payload ---> POST in the user model
            const response = await axios.post('http://localhost:8000/register/', payload)
            if (response.status === 201) {
                localStorage.setItem('access', response.data.access)
                localStorage.setItem('refresh', response.data.refresh)
                setSignup(false)
                setLogin(true)
            } else {
                console.warn('Undable to register')
            }
        } catch (err) {
            console.log("Sign Up error occurred: ", err)
        }
        console.log(payload)
    }


    // LOGIN FUNCTION
    const handleLogin = async (e) => {
        e.preventDefault()
        const data = {
            username,
            password: userPassword
        }
        try {
            const response = await axios.post('http://localhost:8000/login/', data)
            if (response.status === 200) {
                localStorage.setItem('access', response.data.access)
                localStorage.setItem('refresh', response.data.refresh)
                setLogin(true)
            } else {
                setError('Invalid username or password.')
            }
        } catch (err) {
            setError('An error occured. Please try again.')
        }
        console.log(data)
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