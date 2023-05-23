import { useState } from 'react'
import { useParams } from 'react-router-dom'
import API from '../../API'

export default function BuyOrder(props) {
    const { ticker } = useParams()
    const [quantity, setQuantity] = useState(0)

    const handleDecrement = () => {
        if (quantity > 0) {
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

    const createBuyTrade = async () => {
        try {
            const tradeData = {
                user_id: 2,// res.locals?
                asset_type: 'stock',
                ticker: ticker,
                quantity: quantity,
                price: parseFloat(props.companyData.price),
                trade_type: 'BUY'
            }
            const response = await API.post('/trades/', tradeData)
            if (response.status === 201) {
                console.log("BUY created successfully")
            } else {
                console.log("Error creating BUY")
            }

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <div className="container heading">
                <h1>BUY ORDER</h1>
                <h2>{props.companyData.name}</h2>
                <small>{ ticker }</small>
            </div>

            <h3 className='key-data-label'>Price per share:</h3>
            <p>{props.companyData.price}</p>

            <p className='key-data-label'>How many shares?</p>
            <div className="">
                <button onClick={handleDecrement}>-</button>
                <input
                    type="number"
                    id="buy-quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                />
                <button onClick={handleIncrement}>+</button>
            </div>

            <h3 className='key-data-label'>Total Cost:</h3>
            <p>{calculateTotalPrice()}</p>

            {/* need to pull funds available from user model */}
            <h4 className='key-data-label'>Funds Available:</h4>
            <p>$ 10,000</p>

            <div className="company-btn-div">
                <button className='btn-modal' onClick={createBuyTrade}>BUY NOW</button>
                <button className='btn-modal' onClick={() => props.closeModal()}>Cancel</button>
            </div>

        </div>
    )
}