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
    const [enoughShares, setEnoughShares] = useState(true)

    // get user's token from local storage and decode it to get their id
    const token = localStorage.getItem('access')
    const decodedToken = jwtDecode(token)
    const userId = decodedToken.user_id

    // function to get user's shares
    const getUserShares = useCallback(async () => {
        try {
            // fetch user's shares from API
            const response = await API.get('user_shares', { params: { user_id: userId, ticker: ticker } })
            setUserShares(response.data['total_shares_owned'])
            console.log("users shares: ", userShares)
        } catch (err) {
            console.log(err)
        }
    }, [])

    const getUserFunds = async () => {
        try {
            // fetch the user's funds from the API
            const response = await API.get('user_info/', { params: { user_id: userId } })
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
    }, [getUserShares, userId])

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
                setEnoughShares(false)
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
                    setEnoughShares(true)
                } else {
                    console.log("Error creating SALE")
                }
            }
        } catch (err) {
            console.log(err)
        }
        console.log(userFunds)
    }

    // checks if user has enough shares to sell
    useEffect(() => {
        if (quantity > userShares) {
            setEnoughShares(false)
        } else {
            setEnoughShares(true)
        }
    }, [quantity, userShares])
    

    return (
        <div>
            <div className="container heading">
                <h1>SELL ORDER</h1>
                <h2>{props.companyData.name}</h2>
                <small>{ticker.toUpperCase()}</small>
            </div>

            <h3 className='key-data-label'>Price per share:</h3>
            <p>$ {props.companyData.price}</p>

            <div className="input-container">
                <p className='key-data-label'>How many shares?</p>
                <div className="quantity-container">
                    <button className="decrement-btn" onClick={handleDecrement}>-</button>
                    <input
                        type="number"
                        id="sell-quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                        className="input-field"
                    />
                    <button className="increment-btn" onClick={handleIncrement}>+</button>
                </div>
                <div className='share-info'>
                    <p className='key-data-label'>You own:</p>
                    <p>{userShares} <span className='key-data-label'>shares</span></p>
                </div>
            </div>



            <h3 className='key-data-label'>Sale Total:</h3>
            <p>$ {calculateTotalPrice()}</p>

            <h4 className='key-data-label'>Funds After Sale:</h4>
            <p>$ {userFunds}</p>

            <div className="company-btn-div">
                <button
                    className={`btn-modal sell-btn ${enoughShares ? '' : 'disabled'}`}
                    onClick={enoughShares ? createSellTrade : null}>
                    SELL NOW
                </button>
                <button className='btn-modal cancel-btn' onClick={() => props.closeModal()}>Cancel</button>
            </div>

        </div>
    )
}