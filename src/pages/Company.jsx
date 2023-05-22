import React, {useState, useEffect } from 'react'
import axios from 'axios'

export default function Company({ ticker= 'aapl' }){
    const [companyData, setCompanyData] = useState({ name: '', price: ''})

    useEffect(() => {
        const fetchCompanyData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/assets/search/${ticker}/`)
                setCompanyData({ name: response.data[0], price: response.data[1] })
                console.log(response.data)
            } catch (err) {
                console.log('Error fetching company data: ', err)
            }
        }
        fetchCompanyData()
    }, [ticker])

    return(
        <div>
            <h1>{companyData.name}</h1>
            
            <h2>current price: ${companyData.price}</h2>

            <div className='chart-div'>Chart plugin goes here</div>
            
            <div className="btn-div">
                <button>BUY</button>
                <button>SELL</button>
            </div>

            <p className='key-data'>52 Week Range</p>
            <p>companyData.yearRange</p>

            <p className='key-data'>Day Range</p>
            <p>companyData.dayRange</p>

            <p className="key-data">Average Volume</p>
            <p>companyData.avgVolume</p>
        </div>
    )
}