import { useState, useEffect } from 'react'
import API from '../API'
import jwtDecode from 'jwt-decode'
import './styles/followers.css'

export default function Followers() {
    const [users, setUsers] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [filteredUsers, setFilteredUsers] = useState([])
    const [following, setFollowing] = useState([])
    const [showFollowers, setShowFollowers] = useState(true)
    const [followers, setFollowers] = useState([])
    const [actionOccurred, setActionOccurred] = useState(false)

    const token = localStorage.getItem('access')
    const decodedToken = jwtDecode(token)
    const userId = decodedToken.user_id

    useEffect(() => {
        const fetchUsersAndStocks = async () => {
            try {
                const usersResponse = await API.get('users_and_stocks/')
                setUsers(usersResponse.data)
            } catch (err) {
                console.log(err)
            }
        }
        fetchUsersAndStocks()
        console.log('all users : ', users)
    }, [])

    useEffect(() => {
        const fetchFollowers = async () => {
            try {
                const response = await API.get(`followers/${userId}/`)
                const followerIds = response.data.map(follower => follower.id)
                setFollowers(response.data)
                setFollowing(followerIds)
            } catch (err) {
                console.log('Error fetching followers: ', err)
            }
        }
        fetchFollowers()
        console.log('Followers : ', followers)
        console.log('Following : ', following)
    }, [actionOccurred])

    useEffect(() => {
        setFilteredUsers(users.filter(user =>
            user.username.toLowerCase().includes(searchTerm.toLowerCase())
        ))
    }, [searchTerm, users])

    const toggleFollow = async (personToFollowId) => {
        try {
            const isFollowing = following.includes(personToFollowId)

            if (isFollowing) {
                // Unfollow the user
                const response = await API.delete(`follow/${userId}/${personToFollowId}/`)
                console.log(response.data)

                // Update the following state
                setFollowing(following.filter(id => id !== personToFollowId))
            } else {
                // Follow the user
                const response = await API.post(`follow/${userId}/${personToFollowId}/`)
                console.log(response.data)

                // Update the following state
                setFollowing([...following, personToFollowId])
                console.log('following....: ', following)
            }

            // Indicate that a follow/unfollow action has occurred
            setActionOccurred(!actionOccurred)
        } catch (err) {
            // Log any error that occurs during the follow/unfollow operation
            console.error('Error during follow/unfollow:', err)
        }
    }


    return (
        <div>
            <h1>Connect with Traders</h1>

            <button onClick={() => setShowFollowers(!showFollowers)}>
                {showFollowers ? 'Search Users' : 'Show Followers'}
            </button>

            {showFollowers ? (
                <div>
                    <h2>You're Following:</h2>
                    {followers.map((follower, i) => (
                        <div key={`follower-${i}`}>
                            <h3>{follower.username}</h3>
                            <p>Stocks: {follower.stocks && follower.stocks.join(", ")}</p>
                            <button className='follow-button' onClick={() => toggleFollow(follower.id)}>
                                Unfollow
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div>
                    <h2>Who to Follow:</h2>
                    <div className="container">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            placeholder="Search usernames..."
                        />
                    </div>
                    <div>
                        {filteredUsers.map((user, i) => (
                            <div className='other-users' key={`users-${i}`}>
                                <h2 className='user'>{user.username}</h2>
                                <p className='stocks'>Stocks: {user.stocks && user.stocks.join(", ")}</p>
                                <button className='follow-button' onClick={() => toggleFollow(user.id)}>
                                    {following.includes(user.id) ? 'Unfollow' : 'Follow'}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}    