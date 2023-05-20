import { useState,useEffect } from 'react'
import './styles/login.css'

export default function Login(){

    const [login, setLogin] = useState(false)
    const [signup, setSignup] = useState(false)

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
            <h1>SimuStock</h1>

            <div className='btn-div'>
                <button onClick={() => loginClick()}>Log In</button>
                <button onClick={() => signupClick()}>Sign Up</button>
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