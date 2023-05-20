import { useState, useEffect } from 'react'
import axios from 'axios'
import './styles/login.css'


export default function Login(){

    const [login, setLogin] = useState(false)
    const [signup, setSignup] = useState(false)
    const [username, setUsername] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [error, setError] = useState('')
    const loginButton = document.querySelector('.login-btn')
    const signupButton = document.querySelector('.signup-btn')





    // SIGNUP FUNCTION
    const handleSignup = async (e) => {
        e.preventDefault()
        const payload = {
            username,
            userPassword,
        }
        try {
            // send payload ---> POST in the user model
                // INCOMPLETE
            const response = await axios.post('/api/login/', payload)
        } catch(err){
            console.log(err)
        }
    }




    // LOGIN FUNCTION
    const handleLogin = async (e) => {
        e.preventDefault()
        const data = {
            userEmail,
            userPassword
        }
        try{
                //INCOMPLETE
            const response = await axios.post('api/login/',data)
            if(response.data.status === 'success'){
                // Will receive a token from backend
                    // INCOMPLETE
                localStorage.setItem('jwt',response.data.token)
            } else {
                setError('Invalid username or password.')
            }
        } catch (err) {
            setError('An error occured. Please try again.')
        }
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




    return(
        <div className='main-landing'>
            <div className='title'>
                <h1>SimuStock</h1>
                <img className='logo' src="../../images/logo.png" alt="stock logo" />
            </div>

            <div className='btn-div'>
                <button className='login-btn' onClick={() => loginClick()}>Log In</button>
                <button className='signup-btn' onClick={() => signupClick()}>Sign Up</button>
            </div>

            { signup ? 

                    // SIGNUP FORM
                    <form onSubmit={handleSignup} className='form-container'>

                        <label>Name</label>
                            <input type='text' name='username' 
                            onChange={(e) => setUsername(e.target.value)} placeholder='name'></input>

                        <label>Email</label>
                            <input type='email' name='email'
                            onChange={(e) => setUserEmail(e.target.value)}
                            placeholder='email'></input>

                        <label>Password</label>
                            <input type='password' name='password'
                            onChange={(e) => setUserPassword(e.target.value)}
                            placeholder='pasword'></input>

                        <input className='btn' type="submit" value="Signup" />

                    </form>
                
                :
                    // LOGIN FORM
                    <form onSubmit={handleLogin} className='form-container'>

                        <label>Email</label>
                            <input type='text' value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}
                            placeholder='email'></input>

                        <label>Password</label>
                            <input type='password' value={userPassword}
                            onChange={(e) => setUserPassword(e.target.value)}
                            placeholder='pasword'></input>

                        <input className='btn' type="submit" value='Login' />

                    </form>  
            }
        </div>
    )
}