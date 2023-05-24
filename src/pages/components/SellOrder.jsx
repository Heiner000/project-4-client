import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import API from '../../API'
import jwtDecode from 'jwt-decode'

export default function SellOrder(props) {
    // get the stock ticker from URL params
    const { ticker } = useParams()

    const [quantity, setQuantity] = useState(1)
    const [userShares, setUserShares] = useState(0)
    const [userFunds, setUserFunds] = useState(0)

    // get user's token from local storage and decode it to get their id
    const token = localStorage.getItem('access')
    const decodedToken = jwtDecode(token)
    const userId = decodedToken.user_id

    // function to get user's shares
    const getUserShares = useCallback(async () => {
        try {
            // fetch user's shares from API
            const response = await API.get('user_shares', {params: {user_id: userId, ticker: ticker}})
            setUserShares(response.data['total_shares'])
            // if (response.data['total_shares'] > 0) {
            //     // update userShares if the user has shares
            //     setUserShares(response.data['total_shares'])
            // } else {
            //     // set userShares to 0 if user doesn't have any shares of this stock
            //     setUserShares(0)
            // }
            // console.log('getUserShares: ', response.data['total_shares'])
            console.log("users shares: ", userShares)
        } catch (err) {
            console.log(err)
        }
    }, [])

    const getUserFunds = async () => {
        try {
            // fetch the user's funds from the API
            const response = await API.get('user_info/', {params: {user_id: userId}})
            // update the userFunds state with the fetched data
            setUserFunds(response.data.funds)
            console.log('user funds: ', response.data.funds)
        } catch (err) {
            console.log(err)
        }
    }

    // useEffect fetches data when the component mounts
    useEffect(() => {
        // call these functions to update state when component mounts
        getUserFunds()
        getUserShares()
        // console.log("user's funds: ", userFunds)
        // console.log("user's shares: ", userShares)
    }, [getUserShares, userId]) // pass in getUserShares, userId as the dependency array to useEffect

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }

    const handleIncrement = () => {
        if (quantity < userShares) {
            setQuantity(quantity + 1)
        }
    }

    const calculateTotalPrice = () => {
        let price = parseFloat(props.companyData.price)
        let totalPrice = price * quantity
        return totalPrice.toFixed(2)
    }

    const createSellTrade = async () => {
        try {
            const tradeData = {
                user_id: userId,
                asset_type: 'stock',
                ticker: ticker,
                quantity: quantity,
                price: parseFloat(props.companyData.price),
                trade_type: 'SELL'
            }
            // check if user has enough shares to sell
            if (quantity > userShares) {
                console.log("you don't have enough shares to sell")
            } else {
                const response = await API.post('trades/', tradeData)
                if (response.status === 201) {
                    console.log("Sale made successfully")
                    // update userFunds with the funds from the response
                    setUserFunds(response.data.funds)
                    // Close the modal
                    props.closeModal()
                    // get updated number of shares
                    getUserShares()
                } else {
                    console.log("ERRROR creating sale")
                }
            }
        } catch (err) {
            console.log(err)
        }
        console.log(userFunds)
    }

    return (
        <div>
            <div className="container heading">
                <h1>SELL ORDER</h1>
                <h2>{props.companyData.name}</h2>
                <small>{ticker}</small>
            </div>

            <h3 className='key-data-label'>Price per share:</h3>
            <p>{props.companyData.price}</p>

            <p className='key-data-label'>How many shares?</p>
            <div className="shares-input-div">
                <button onClick={handleDecrement}>-</button>
                <input
                    type="number"
                    id="sell-quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                />
                <button onClick={handleIncrement}>+</button>
            </div>

            <h3 className='key-data-label'>Sale Total:</h3>
            <p>{calculateTotalPrice()}</p>

            <h4 className='key-data-label'>Funds After Sale:</h4>
            <p>$ {userFunds}</p>

            <div className="btn-div">
                <button className='btn-modal' onClick={createSellTrade}>SELL NOW</button>
                <button onClick={() => props.closeModal()}>Cancel</button>
            </div>

        </div>
    )
}