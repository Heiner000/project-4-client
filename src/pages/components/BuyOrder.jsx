export default function BuyOrder(props){
    return(
        <div>
            <h1>BUY ORDER</h1>

            <h2>Price per share:</h2>
            <p>{companyData.price}</p>

            <p>How many shares?</p>
            <div className="">
                <button>-</button>
                <input type="integer" id="quantity" />
                <button>+</button>
            </div>
        </div>
    )
}