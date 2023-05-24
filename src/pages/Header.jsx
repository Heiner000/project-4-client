import { Link } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import API from '../API'
import jwtDecode from 'jwt-decode'
import axios from 'axios'
import './styles/headers.css'

export default function Header() {



    const [location, setLocation] = useState()
    const [username, setUsername] = useState()

    const token = localStorage.getItem('access')
    const decodedToken = jwtDecode(token)
    const userId = decodedToken.user_id


    useEffect(() => {
        const userData = async () => {
            try{
                const response = await API.get('user_info', {params: {user_id: userId}})
                setUsername(response.data.username)
                const locationResponse = await axios.get(`https://api.zippopotam.us/us/${response.data.zip_code}`)
                const data = locationResponse.data.places[0]
                console.log(data)
                const placename = data['place name']
                const state = data['state abbreviation']
                setLocation(`${placename}, ${state}`)
            } catch(err){
                console.log(err)
            }
            
        }
        userData()
    },[])



    const [click, setClick] = useState(false)
    const handleClick = () => setClick(!click)
    const closeMenu = () => setClick(false)
    


    return(
        <div>
            <div className={click ? 'nav-menu active' : 'nav-menu'}>
                <div className='profile-options-container'>
                    <img className="profile-page-logo" src="../images/profile-logo.png" alt="profile logo" />
                    <h1 className='user'>{username}</h1>
                    <p className='location'>{location}</p>
                </div>

                <div className='click-options'>
                    <div onClick={() => window.location.href = '/homepage'} className='option-container'>
                        <p>Watchlist</p>
                    </div>
                    <div className='option-container'>
                        <p>Portfolio</p>
                    </div>
                    <div className='option-container'>
                        <p>Followers</p>
                    </div>
                    <div className='option-container'>
                        <p>Funds</p>
                    </div>
                    <div onClick={() => window.location.href = '/login'} className='option-container'>
                        <p>Logout</p>
                    </div>
                </div>

            </div>
            <div className='hamburger' onClick={handleClick}>
                {click ? (
                    <FaTimes size={20} style={{color: '#0066cc'}}/>
                ) : (
                    <FaBars size={20} style={{color: '#0066cc'}}/>

                )}
            </div>
        </div>
    )
}