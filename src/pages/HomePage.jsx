import axios from 'axios'
import { useState,useEffect } from 'react'

export default function HomePage(){

    const [stocks, setStocks] = useState()

    useEffect(() => {
        const ticker = 'amzn'
        axios.get(`http://localhost:8000/api/scrape/${ticker}/`)
          .then(response => {
            setStocks(response.data)
          })
          .catch((err) => {
            console.log(err)
          })
      }, [])

    return(
        <div>
            <h1>Hi, Brian</h1>
            <p>{stocks}</p>
        </div>
    )
}