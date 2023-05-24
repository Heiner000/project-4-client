import { Link } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa'
import { useState, useEffect, useRef } from 'react'
import API from '../API'
import jwtDecode from 'jwt-decode'
import axios from 'axios'
import './styles/headers.css'

export default function Header() {


    const [location, setLocation] = useState()
    const [username, setUsername] = useState()
    const [userFunds, setUserFunds] = useState()
    const [click, setClick] = useState(false)
    const [clickFunds, setClickFunds] = useState(true)
    const handleClick = () => setClick(!click)
    const handleClickFunds = () => setClickFunds(!clickFunds)
    const token = localStorage.getItem('access')
    const decodedToken = jwtDecode(token)
    const userId = decodedToken.user_id
    const inputRef = useRef()


    // GETS THE LOCATION, USERNAME AND FUNDS TO STATE
    useEffect(() => {
        const userData = async () => {
            try {
                const response = await API.get('user_info', { params: { user_id: userId } })
                setUserFunds(response.data.funds)
                setUsername(response.data.username)
                const locationResponse = await axios.get(`https://api.zippopotam.us/us/${response.data.zip_code}`)
                const data = locationResponse.data.places[0]
                const placename = data['place name']
                const state = data['state abbreviation']
                setLocation(`${placename}, ${state}`)
            } catch (err) {
                console.log(err)
            }

        }
        userData()
    }, [clickFunds])


    const updateFunds = async () => {
        const data = {
            userId,
            funds: inputRef.current.value
        }
        try {
            console.log(data)
            const response = await API.put('update_funds/', data)
            console.log(response)
        }catch(err){
            console.log(err)
        }
    }


    


    



    return (
        <div>
            <div className={click ? 'nav-menu active' : 'nav-menu'}>
                <div className='profile-options-container'>
                    <img className="profile-page-logo" src="../images/profile-logo.png" alt="profile logo" />
                    <h1 className='user'>{username}</h1>
                    <p className='location'>{location}</p>
                </div>

                <div className='click-options'>
                    <div onClick={() => window.location.href = '/homepage'} className='option-container'>
                        <p>Homepage</p>
                    </div>
                    <div className='option-container'>
                        <p>History</p>
                    </div>
                    <div className='option-container'>
                        <p>Followers</p>
                    </div>
                    <div className='option-container'>
                        { clickFunds ? (
                            <p onClick={handleClickFunds}>Funds - <span className='fund-span'>${userFunds}</span></p>
                        ) : (
                            <div className='edit-funds'>
                                <p onClick={handleClickFunds}>Edit Funds:</p>
                                <input ref={inputRef} placeholder='$' type="text" />
                                <button onClick={updateFunds}>Ok</button>
                            </div>
                        )
                        }

                    </div>
                    <div onClick={() => window.location.href = '/login'} className='option-container'>
                        <p>Logout</p>
                    </div>
                </div>

            </div>
            <div className='hamburger' onClick={handleClick}>
                {click ? (
                    <FaTimes size={20} style={{ color: '#0066cc' }} />
                ) : (
                    <FaBars size={20} style={{ color: '#0066cc' }} />

                )}
            </div>
        </div>
    )
}