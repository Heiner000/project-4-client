import { useState, useEffect } from 'react'
import API from '../API'
import jwtDecode from 'jwt-decode'

export default function Followers() {
    const [users, setUsers] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [filteredUsers, setFilteredUsers] = useState([])
    const [following, setFollowing] = useState([])

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
        console.log(users)
    }, [])

    useEffect(() => {
        setFilteredUsers(users.filter(user =>
            user.username.toLowerCase().includes(searchTerm.toLowerCase())
        ))
    }, [searchTerm, users])

    const toggleFollow = async (personToFollowId) => {
        try {
            // Check if the current user is already following the person in context
        if (following.includes(personToFollowId)) {
            // If following, send a DELETE request to unfollow the user
            const response = await API.delete('unfollow/', { data: {follower_id: userId, followed_id: personToFollowId}})
            
            // If the server response indicates a successful unfollow operation, remove this user from our local 'following' state
            if(response.status === 200){
                setFollowing(following.filter(id => id !== personToFollowId))
            } else {
                console.error('Unfollow failed:', response)
            }
        } else {
            // If not already following, send a POST request to follow the user
            const response = await API.post('follow/', { follower_id: userId, followed_id: personToFollowId})

            // If the server response indicates a successful follow operation, add this user to our local 'following' state
            if(response.status === 200){
                setFollowing([...following, personToFollowId])
            } else {
                console.error('Follow operation failed:', response)
            }
        }
    } catch (err) {
        // Log any error that occurs during the follow/unfollow operation
        console.error('Error during follow/unfollow:', err)
    }
}

    return (
        <div>
            <h1>Connect with Traders</h1>

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
                    <div className='' key={`users-${i}`}>
                        <h2>{user.username}</h2>
                        <h3>{user.email}</h3>
                        <p>Stocks: {user.stocks && user.stocks.join(", ")}</p>
                        <button onClick={() => toggleFollow(user.id)}>
                            { following.includes(user.id) ? 'Unfollow' : 'Follow' }
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}