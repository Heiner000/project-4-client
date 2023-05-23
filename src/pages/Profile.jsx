import './styles/profile.css'
import { useState, useEffect } from 'react'

export default function Profile(){

    const [zipCode, setZipCode] = useState()


    useEffect()

    return(
        <div className='profile-container'>
            <img className="profile-page-logo" src="../images/profile-logo.png" alt="profile logo" />
            <h1>profile page</h1>
        </div>
    )
}