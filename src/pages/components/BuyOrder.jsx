import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import API from '../../API'
import jwtDecode from 'jwt-decode'

export default function BuyOrder(props) {
    const { ticker } = useParams()
    const [quantity, setQuantity] = useState(1)
    const [userFunds, setUserFunds] = useState(0)
    const [userShares, setUserShares] = useState(0)
    const [enoughFunds, setEnoughFunds] = useState(true)
    const [message, setMessage] = useState({ show: false, text: '', type: '' })

    const token = localStorage.getItem('access')
    const decodedToken = jwtDecode(token)
    const userId = decodedToken.user_id

    useEffect(() => {
        const getUserFunds = async () => {
            try {
                const response = await API.get('user_info/', { params: { user_id: userId } })
                setUserFunds(parseFloat(response.data.funds).toFixed(2))
                console.log(parseFloat(response.data.funds).toFixed(2))
            } catch (err) {
                console.log(err)
            }
        }
        const getUserShares = async () => {
            try {
                const response = await API.get('user_shares', { params: { user_id: userId, ticker: ticker } })
                setUserShares(response.data['total_shares_owned'])
                console.log('users shares: ', userShares)
            } catch (err) {
                console.log(err)
            }
        }
        getUserFunds()
        getUserShares()
    }, [userId, ticker])

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }

    const handleIncrement = () => {
        setQuantity(quantity + 1)
    }

    const calculateTotalPrice = () => {
        let price = parseFloat(props.companyData.price)
        let totalPrice = price * quantity
        return totalPrice.toFixed(2)
    }

    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value);
        if (isNaN(value)) {
            setQuantity(0)
        } else {
            setQuantity(value);
        }
    }

    const createBuyTrade = async () => {
        try {
            const tradeData = {
                user_id: userId,
                asset_type: 'stock',
                ticker: ticker,
                quantity: quantity,
                price: parseFloat(props.companyData.price),
                trade_type: 'BUY'
            }

            const totalPrice = parseFloat(calculateTotalPrice())
            if (totalPrice > userFunds) {
                setMessage({ show: true, text: 'Insufficient funds to complete this purchase.', type: 'error' })
                return
            }

            const response = await API.post('trades/', tradeData)
            if (response.status === 201) {
                console.log("BUY created successfully")
                console.log('users new shares: ', userShares)
                // update userFunds with funds from the response
                setUserFunds(parseFloat(response.data.funds).toFixed(2))
                console.log(parseFloat(response.data.funds).toFixed(2))
                // close the modal
                // props.closeModal()
                setMessage({ show: true, text: 'Purchase successful!', type: 'success' })
            } else {
                console.log("Error creating BUY")
                setMessage({ show: true, text: 'Error making purchase, try again...', type: 'error' })
            }
        } catch (err) {
            console.log(err)
        }
    }

    // checks if user has enough funds to buy
    useEffect(() => {
        if (parseFloat(calculateTotalPrice()) > userFunds) {
            setEnoughFunds(false)
        } else {
            setEnoughFunds(true)
        }
    }, [quantity, userFunds])

    // puts messages on a 2sec timer
    useEffect(() => {
        if (message.show) {
            const timer = setTimeout(() => {
                setMessage({ show: false, text: '', type: '' })
            }, 2000)
            // clear timer when component unmounts
            return () => clearTimeout(timer)
        }
    }, [message])

    return (
        <div>
            <div className="container heading">
                <h1>BUY ORDER</h1>
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
                        id="buy-quantity"
                        value={quantity}
                        onChange={handleQuantityChange}
                    />
                    <button className="increment-btn" onClick={handleIncrement}>+</button>
                </div>
                <div className='share-info'>
                    <p className='key-data-label'>You own:</p>
                    <p>{userShares} <span className='key-data-label'>shares</span></p>
                </div>
            </div>

            <h3 className='key-data-label'>Total Cost:</h3>
            <p>$ {calculateTotalPrice()}</p>

            <h4 className='key-data-label'>Funds Available:</h4>
            <p>$ {parseFloat(userFunds).toLocaleString()}</p>

            {message.show && (
                <div className={`message ${message.type}`}>
                    {message.text}
                </div>
            )}

            <div className="company-btn-div">
                <button
                    className={`btn-modal buy-btn
                    ${enoughFunds ? '' : 'disabled'}`}
                    onClick={enoughFunds ? createBuyTrade : null} >
                    BUY NOW
                </button>
                <button className='btn-modal cancel-btn' onClick={() => props.closeModal()}>Cancel</button>
            </div>

        </div>
    )
}