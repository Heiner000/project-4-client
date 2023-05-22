import React, {useState, useEffect } from 'react'
import axios from 'axios'

export default function Company({ ticker }){
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
            
            <p>current price: {companyData.price}</p>
        </div>
    )
}