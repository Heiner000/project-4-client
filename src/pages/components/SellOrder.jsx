import { useState } from 'react'

export default function SellOrder(props){
    const [quantity, setQuantity] = useState(0)
    // INCOMPLETE: Need to fetch user's shares
    const [userShares, setUserShares] = useState(0)

    const handleDecrement = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1)
        }
    }

    const handleIncrement = () => {
        if (quantity < userShares){
            setQuantity(quantity + 1)
        }
    }

    const calculateTotalPrice = () => {
        return props.price * quantity
    }

    return(
        <div>
            <h1>SELL ORDER</h1>

            <h2>Price per share:</h2>
            <p>{props.price}</p>

            <p>How many shares?</p>
            <div className="">
                <button onClick={handleDecrement}>-</button>
                <input type="integer" id="sell-quantity" />
                <button onClick={handleIncrement}>+</button>
            </div>

            <h3>Sale Total:</h3>
            <p>{calculateTotalPrice}</p>

            {/* need to pull funds from user model */}
            <h4>Funds After Sale:</h4>
            <p>$$$</p>

            <div className="">
                <button>SELL NOW</button>
                <button>Cancel</button>
            </div>

        </div>
    )
}