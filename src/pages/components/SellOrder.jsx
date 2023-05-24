import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import API from '../../API'
import jwtDecode from 'jwt-decode'

export default function SellOrder(props) {
    const { ticker } = useParams()
    const [quantity, setQuantity] = useState(1)
    const [userShares, setUserShares] = useState(0)
    const [userFunds, setUserFunds] = useState(0)

    const token = localStorage.getItem('access')
    const decodedToken = jwtDecode(token)
    const userId = decodedToken.user_id

    useEffect(() => {
        const getUserFunds = async () => {
            try {
                const response = await API.get('user_info/', {params: {user_id: userId}})
                setUserFunds(response.data.funds)
            } catch (err) {
                console.log(err)
            }
        }
        const getUserShares = async () => {
            try {
                const response = await API.get('user_shares', {params: {user_id: userId, ticker: ticker}})
                if (response.data.length > 0) {
                    setUserShares(response.data[0].total_quantity)
                } else {
                    // if there are no trades for the ticker
                    setUserShares(0)
                }
                console.log(response.data)
            } catch (err) {
                console.log(err)
            }
        }
        getUserFunds()
        getUserShares()
    }, [])

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
            const response = await API.post('trades/', tradeData)
            if (response.status === 201) {
                console.log("Sale made successfully")
            } else {
                console.log("ERRROR creating sale")
            }
        } catch (err) {
            console.log(err)
        }
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