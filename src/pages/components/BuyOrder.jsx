import { useState } from 'react'

export default function BuyOrder(props) {
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
        return props.price * quantity
    }

    return (
        <div>
            <h1>BUY ORDER</h1>

            <h2>Price per share:</h2>
            <p>{props.price}</p>

            <p>How many shares?</p>
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

            <h3>Total Cost:</h3>
            <p>{calculateTotalPrice}</p>

            {/* need to pull funds available from user model */}
            <h4>Funds Available:</h4>
            <p>$$$</p> 

            <div className="">
                <button>BUY NOW</button>
                <button>Cancel</button>
            </div>

        </div>
    )
}