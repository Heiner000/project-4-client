import { dblClick } from '@testing-library/user-event/dist/click'
import axios from 'axios'
import { useState,useEffect } from 'react'

export default function HomePage(){

    const [stocks, setStocks] = useState()

    // useEffect(() => {
    //     const ticker = 'amzn'
    //     axios.get(`http://localhost:8000/api/scrape/${ticker}/`)
    //       .then(response => {
    //         setStocks(response.data)
    //       })
    //       .catch((err) => {
    //         console.log(err)
    //       })
    //   }, [])

  // def displayStocks = () => {
  //   // pull from the db. the stocks.
  // }


    return(
        <div>
            <h1>Hi, Brian</h1>
            <h2>portfolio</h2>
            {/* {displayStocks} */}
            <p>add stock</p>
            <select name="" id="">
              <option value="aapl">Apple - aapl</option>
              <option value="aapl">Apple - AAPL</option>
              <option value="googl">Google - GOOGL</option>
              <option value="msft">Microsoft - MSFT</option>
              <option value="amzn">Amazon - AMZN</option>
              <option value="fb">Facebook - FB</option>
              <option value="tsla">Tesla - TSLA</option>
              <option value="nflx">Netflix - NFLX</option>
              <option value="dis">Disney - DIS</option>
              <option value="baba">Alibaba - BABA</option>
              <option value="v">Visa - V</option>
              <option value="ma">Mastercard - MA</option>
            </select>
            {/* <button onClick={add this stock}>add +</button> */}
            {/* <p>{stocks}</p> */}
        </div>
    )
}