import { useState } from 'react'

export default function SellOrder(props){
    const [quantity, setQuantity] = useState(1)
    // INCOMPLETE: Need to fetch user's shares
    const [userShares, setUserShares] = useState(0)

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }

    const handleIncrement = () => {
        if (quantity < userShares){
            setQuantity(quantity + 1)
        }
    }

    const calculateTotalPrice = () => {
        let price = parseFloat(props.companyData.price)
        let totalPrice = price * quantity
        return totalPrice.toFixed(2)
    }

    return(
        <div>
            <h1>SELL ORDER</h1>
            <h2>{props.companyData.name}</h2>

            <h2>Price per share:</h2>
            <p>{props.companyData.price}</p>

            <p>How many shares?</p>
            <div className="">
                <button onClick={handleDecrement}>-</button>
                <input 
                    type="number" 
                    id="sell-quantity" 
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                />
                <button onClick={handleIncrement}>+</button>
            </div>

            <h3>Sale Total:</h3>
            <p>{calculateTotalPrice()}</p>

            {/* need to pull funds from user model */}
            <h4>Funds After Sale:</h4>
            <p>$$$ + {calculateTotalPrice()}</p>

            <div className="btn-div">
                <button className='btn-modal'>SELL NOW</button>
                <button onClick={() => props.closeModal()}>Cancel</button>
            </div>

        </div>
    )
}