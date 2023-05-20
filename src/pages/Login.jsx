import { useState,useEffect } from 'react'
import './styles/login.css'

export default function Login(){

    const [login, setLogin] = useState(false)
    const [signup, setSignup] = useState(false)
    const loginButton = document.querySelector('.login-btn')
    const signupButton = document.querySelector('.signup-btn')


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
                <img className='logo' src="../../images/graph copy.png" alt="stock logo" />
            </div>

            <div className='btn-div'>
                <button className='login-btn' onClick={() => loginClick()}>Log In</button>
                <button className='signup-btn' onClick={() => signupClick()}>Sign Up</button>
            </div>

            { signup ? 
                
                    <form className='form-container'>
                        <label>Name</label>
                        <input placeholder='name'></input>
                        <label>Email</label>
                        <input placeholder='email'></input>
                        <label>Password</label>
                        <input placeholder='pasword'></input>
                    </form>
                
                :
                
                    <form className='form-container'>
                        <label>Email</label>
                        <input placeholder='email'></input>
                        <label>Password</label>
                        <input placeholder='pasword'></input>
                    </form>
                
            }
            
        </div>
    )
}