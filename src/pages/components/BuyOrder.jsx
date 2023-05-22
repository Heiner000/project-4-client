export default function BuyOrder(props) {

    // total_cost = {props.price} * {quantity}

    return (
        <div>
            <h1>BUY ORDER</h1>

            <h2>Price per share:</h2>
            <p>$$$</p>

            <p>How many shares?</p>
            <div className="">
                <button>-</button>
                <input type="integer" id="quantity" />
                <button>+</button>
            </div>

            <h3>Total Cost:</h3>
            <p>$$$</p>

            <h4>Funds Available:</h4>
            <p>$$$</p>

            <div className="">
                <button>BUY NOW</button>
                <button>Cancel</button>
            </div>

        </div>
    )
}